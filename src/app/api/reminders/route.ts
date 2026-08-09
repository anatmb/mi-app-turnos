export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { reminderController } from "@/controllers/reminderController";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nuevoRecordatorio = await reminderController.create(body);
    return NextResponse.json({ success: true, recordatorio: nuevoRecordatorio }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al crear el recordatorio" }, { status: 500 });
  }
}