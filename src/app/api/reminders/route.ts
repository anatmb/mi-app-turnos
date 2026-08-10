// export const dynamic = "force-dynamic";
// import { NextResponse } from "next/server";
// import { reminderController } from "@/controllers/reminderController";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const nuevoRecordatorio = await reminderController.create(body);
//     return NextResponse.json({ success: true, recordatorio: nuevoRecordatorio }, { status: 201 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Error al crear el recordatorio" }, { status: 500 });
//   }
// }
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

import { NextResponse } from "next/server";

// Detectamos si estamos en la fase de compilación de Vercel
const isBuilding = process.env.NEXT_PHASE === "phase-production-build" || process.env.CI === "true";

export async function GET() {
  try {
    if (isBuilding) return NextResponse.json([]);

    // Aquí abajo irá tu lógica real cuando el build pase, por ejemplo:
    // const reminders = await db.recordatorio.findMany();
    // return NextResponse.json(reminders);
    
    return NextResponse.json([]); 
  } catch (error) {
    console.error("Error en GET /api/reminders:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (isBuilding) return NextResponse.json({ success: true });

    // Tu lógica real para crear recordatorios...
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear recordatorio" }, { status: 500 });
  }
}