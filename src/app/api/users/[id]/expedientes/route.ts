import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const expedientes = await getDB().expediente.findMany({
      where: { userId: id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(expedientes);
  } catch {
    return NextResponse.json({ error: "No se pudo obtener el expediente." }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();
    const titulo = typeof body.titulo === "string" ? body.titulo.trim() : "";

    if (!titulo) {
      return NextResponse.json({ error: "El título es obligatorio." }, { status: 400 });
    }

    const expediente = await getDB().expediente.create({
      data: {
        userId: id,
        titulo,
        notas: typeof body.notas === "string" && body.notas.trim() ? body.notas.trim() : null,
      },
    });
    return NextResponse.json(expediente, { status: 201 });
  } catch {
    return NextResponse.json({ error: "No se pudo guardar la nota en el expediente." }, { status: 500 });
  }
}
