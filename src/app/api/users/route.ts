import { NextResponse } from "next/server";
import { userController } from "@/controllers/userController";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nuevoUsuario = await userController.create(body);
    return NextResponse.json({ success: true, user: nuevoUsuario }, { status: 201 });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const usuarios = await userController.getAll();
    return NextResponse.json({ success: true, usuarios });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
  }
}