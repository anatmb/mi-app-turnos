// export const dynamic = "force-dynamic";
// import { NextResponse } from "next/server";
// import { expedienteController } from "@/controllers/expedienteController";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const nuevoExpediente = await expedienteController.create(body);
//     return NextResponse.json({ success: true, expediente: nuevoExpediente }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Error al crear el expediente" }, { status: 500 });
//   }
// }
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

import { NextResponse } from "next/server";

const isBuilding = process.env.NEXT_PHASE === "phase-production-build" || process.env.CI === "true";

export async function GET() {
  try {
    if (isBuilding) return NextResponse.json([]);

    // Aquí abajo pones tu importación y lógica real de Prisma/Base de datos
    // const expedientes = await db.expediente.findMany();
    // return NextResponse.json(expedientes);
    return NextResponse.json([]); 
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}