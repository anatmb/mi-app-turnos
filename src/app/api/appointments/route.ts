export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { appointmentController } from "@/controllers/appointmentController";

// 🛡️ Escudo para saltarnos el análisis de Turbopack en el build
const isBuilding = process.env.NEXT_PHASE === "phase-production-build" || process.env.CI === "true";

export async function GET() {
  if (isBuilding) return NextResponse.json([]);

  try {
    const appointments = await appointmentController.getAll();
    return NextResponse.json(appointments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al obtener las citas" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (isBuilding) return NextResponse.json({ success: true });

  try {
    const body = await request.json();
    const newAppointment = await appointmentController.create(body);
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear la cita" },
      { status: 500 }
    );
  }
}