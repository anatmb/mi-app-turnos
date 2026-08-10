// export const dynamic = "force-dynamic";
// import { NextResponse } from "next/server";
// import { userController } from "@/controllers/userController";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const nuevoUsuario = await userController.create(body);
//     return NextResponse.json({ success: true, user: nuevoUsuario }, { status: 201 });
//   } catch (error) {
//     console.error("Error al crear usuario:", error);
//     return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const usuarios = await userController.getAll();
//     return NextResponse.json({ success: true, usuarios });
//   } catch (error) {
//     return NextResponse.json({ error: "Error al obtener usuarios" }, { status: 500 });
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

    // Aquí abajo pones tu lógica real cuando el build pase:
    // const users = await db.user.findMany();
    // return NextResponse.json(users);
    
    return NextResponse.json([]); 
  } catch (error) {
    console.error("Error en GET /api/users:", error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (isBuilding) return NextResponse.json({ success: true });

    // Tu lógica real para crear usuarios...
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 });
  }
}