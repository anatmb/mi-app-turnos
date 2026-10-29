import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const body = await request.json();
    const dni = typeof body.dni === "string" ? body.dni.trim() : "";
    const nombre = typeof body.nombre === "string" ? body.nombre.trim() : "";

    if (!dni || !nombre) {
      return NextResponse.json({ error: "El DNI y el nombre son obligatorios." }, { status: 400 });
    }

    const patient = await getDB().user.update({
      where: { id, activo: true },
      data: {
        dni,
        nombre,
        email: typeof body.email === "string" && body.email.trim() ? body.email.trim() : null,
        telefono: typeof body.telefono === "string" && body.telefono.trim() ? body.telefono.trim() : null,
        tieneObraSocial: body.tieneObraSocial === true,
        obraSocial: body.tieneObraSocial === true && typeof body.obraSocial === "string" && body.obraSocial.trim() ? body.obraSocial.trim() : null,
      },
      include: { appointments: { orderBy: { dateTime: "desc" } } },
    });

    return NextResponse.json(patient);
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      return NextResponse.json({ error: "Ese DNI ya está registrado." }, { status: 409 });
    }
    return NextResponse.json({ error: "No se pudo modificar el paciente." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    await getDB().user.update({
      where: { id, activo: true },
      data: { activo: false },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "No se pudo dar de baja al paciente." }, { status: 500 });
  }
}
