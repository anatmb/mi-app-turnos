import { NextResponse } from "next/server";
import { expedienteController } from "@/controllers/expedienteController";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nuevoExpediente = await expedienteController.create(body);
    return NextResponse.json({ success: true, expediente: nuevoExpediente }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al crear el expediente" }, { status: 500 });
  }
}