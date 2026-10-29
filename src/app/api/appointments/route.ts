export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0; // 👈 Le dice a Next que no guarde en caché

import { NextResponse } from "next/server";
import { AppointmentValidationError, appointmentController } from "@/controllers/appointmentController";

const availabilityFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Argentina/Buenos_Aires",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "America/Argentina/Buenos_Aires",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function formatAvailabilityDate(date: Date) {
  const parts = availabilityFormatter.formatToParts(date);
  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

export async function GET() {
  try {
    const appointments = await appointmentController.getAll();
    return NextResponse.json(
      appointments.map((appointment) => ({
        ...appointment,
        fecha: formatAvailabilityDate(appointment.dateTime),
        hora: timeFormatter.format(appointment.dateTime),
      }))
    );
  } catch (error) {
    console.error("Error en GET /api/appointments:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.dni || !body.nombre || !body.email || !body.fechaSeleccionada || !body.horaSeleccionada) {
      return NextResponse.json(
        { error: "Completá DNI, nombre, correo electrónico, fecha y horario." },
        { status: 400 }
      );
    }

    const newAppointment = await appointmentController.create({
      dni: body.dni, // <-- DNI agregado aquí
      nombre: body.nombre,
      email: body.email,
      telefono: body.telefono,
      tieneObraSocial: body.tieneObraSocial === true,
      obraSocial: body.obraSocial,
      fechaSeleccionada: body.fechaSeleccionada,
      horaSeleccionada: body.horaSeleccionada,
    });
    
    return NextResponse.json({ success: true, data: newAppointment }, { status: 201 });
  } catch (error) {
    if (error instanceof AppointmentValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Prisma usa P2002 para restricciones únicas. Es la protección final
    // frente a reservas simultáneas del mismo horario.
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return NextResponse.json(
        { error: "Ese horario acaba de ser reservado. Elegí otro, por favor." },
        { status: 409 }
      );
    }

    console.error("Error en POST /api/appointments:", error);
    return NextResponse.json({ error: "Error al crear turno" }, { status: 500 });
  }
}
