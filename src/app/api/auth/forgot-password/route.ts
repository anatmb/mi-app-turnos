import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (typeof email !== "string" || !email.trim()) {
      return NextResponse.json({ error: "Ingresá un correo válido." }, { status: 400 });
    }

    const prisma = getDB();
    const doctor = await prisma.doctor.findUnique({ where: { email: email.trim().toLowerCase() } });
    if (doctor) {
      const token = randomBytes(32).toString("hex");
      const tokenHash = createHash("sha256").update(token).digest("hex");
      await prisma.passwordResetToken.deleteMany({ where: { doctorId: doctor.id } });
      await prisma.passwordResetToken.create({
        data: { doctorId: doctor.id, tokenHash, expiresAt: new Date(Date.now() + 60 * 60 * 1000) },
      });

      const baseUrl = process.env.APP_URL || new URL(request.url).origin;
      const link = `${baseUrl}/restablecer-contrasena?token=${token}`;
      const sent = await sendEmail({
        to: doctor.email,
        subject: "Restablecé tu contraseña de TurnoYa",
        html: `<p>Recibimos una solicitud para cambiar la contraseña de tu cuenta.</p><p><a href="${link}">Elegir una contraseña nueva</a></p><p>El enlace vence en una hora. Si no solicitaste este cambio, podés ignorar este mensaje.</p>`,
      });
      if (!sent) {
        await prisma.passwordResetToken.deleteMany({ where: { doctorId: doctor.id } });
        return NextResponse.json({ error: "El envío de correos todavía no está configurado. Contactá al administrador." }, { status: 503 });
      }
    }

    return NextResponse.json({ message: "Si el correo está registrado, recibirás un enlace para restablecer la contraseña." });
  } catch (error) {
    console.error("Error en recuperación de contraseña:", error);
    return NextResponse.json({ error: "No pudimos procesar la solicitud." }, { status: 500 });
  }
}
