import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const fechaHoraArgentina = new Intl.DateTimeFormat("es-AR", {
  timeZone: "America/Argentina/Buenos_Aires",
  dateStyle: "full",
  timeStyle: "short",
});

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character] ?? character);
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    return NextResponse.json({ error: "El envío de correos no está configurado." }, { status: 503 });
  }

  try {
    const now = new Date();
    const start = new Date(now.getTime() + 118 * 60 * 1000);
    const end = new Date(now.getTime() + 122 * 60 * 1000);
    const prisma = getDB();
    const appointments = await prisma.appointment.findMany({
      where: {
        dateTime: { gte: start, lt: end },
        reminderSentAt: null,
        status: { not: "CANCELLED" },
        user: { email: { not: null } },
      },
      include: { user: true },
    });

    let sent = 0;
    for (const appointment of appointments) {
      if (!appointment.user.email) continue;
      const delivered = await sendEmail({
        to: appointment.user.email,
        subject: "Recordatorio: tenés un turno médico en 2 horas",
        html: `<p>Hola ${escapeHtml(appointment.user.nombre)},</p><p>Te recordamos que hoy tenés una cita médica el ${fechaHoraArgentina.format(appointment.dateTime)}.</p><p>Si necesitás modificarla, comunicate con el consultorio.</p>`,
      });
      if (delivered) {
        await prisma.appointment.update({ where: { id: appointment.id }, data: { reminderSentAt: new Date() } });
        sent += 1;
      }
    }

    return NextResponse.json({ sent, checked: appointments.length });
  } catch (error) {
    console.error("Error al enviar recordatorios de turnos:", error);
    return NextResponse.json({ error: "No se pudieron procesar los recordatorios." }, { status: 500 });
  }
}
