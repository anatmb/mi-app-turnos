import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

type RouteContext = { params: Promise<{ dni: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const { dni } = await params;
    const cleanDni = dni.trim();

    if (!cleanDni) {
      return NextResponse.json({ error: "DNI inválido." }, { status: 400 });
    }

    const patient = await getDB().user.findFirst({
      where: { dni: cleanDni, activo: true },
      select: { nombre: true, email: true, telefono: true, tieneObraSocial: true, obraSocial: true },
    });

    if (!patient) {
      return NextResponse.json({ error: "Paciente no encontrado." }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch {
    return NextResponse.json({ error: "No se pudo buscar el paciente." }, { status: 500 });
  }
}
