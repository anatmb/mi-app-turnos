export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { appointmentController } from "@/controllers/appointmentController"; //  ¡Ruta real! // Ajusta la ruta a donde guardes tu controlador

export async function GET() {
  try {
    // USAMOS EL CONTROLADOR PROTEGIDO EN LUGAR DE LA DB DIRECTA
    const appointments = await appointmentController.getAll(); 
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error en GET /api/appointments:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // LEEMOS EL REQUEST PARA QUE NO QUEDE SIN USAR Y FALLE EL COMPILADOR
    const body = await request.json();
    const newAppointment = await appointmentController.create(body);
    
    return NextResponse.json({ success: true, data: newAppointment });
  } catch (error) {
    console.error("Error en POST /api/appointments:", error);
    return NextResponse.json({ error: "Error al crear turno" }, { status: 500 });
  }
}