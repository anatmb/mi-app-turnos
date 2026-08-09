import { NextResponse } from "next/server";
import { appointmentController } from "@/controllers/appointmentController";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nuevaCita = await appointmentController.create(body);
    return NextResponse.json({ success: true, cita: nuevaCita }, { status: 201 });
  } catch (error) {
    console.error("Error al crear cita:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const citas = await appointmentController.getAll();
    return NextResponse.json({ success: true, citas });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener citas" }, { status: 500 });
  }
}