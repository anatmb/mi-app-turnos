// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const { email, password } = await req.json();

//     const doctor = await prisma.doctor.findUnique({ where: { email } });
//     if (!doctor) {
//       return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
//     }

//     const passwordValida = await bcrypt.compare(password, doctor.password);
//     if (!passwordValida) {
//       return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
//     }

//     // Retornamos los datos básicos del doctor para la sesión
//     return NextResponse.json({
//       success: true,
//       doctor: {
//         id: doctor.id,
//         nombre: doctor.nombre,
//         apellido: doctor.apellido,
//         email: doctor.email,
//         especialidad: doctor.especialidad,
//       },
//     });
//   } catch (error) {
//     return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const prisma = getDB(); // Instanciamos la conexión
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña requeridos" },
        { status: 400 }
      );
    }

    const doctor = await prisma.doctor.findUnique({ where: { email } });
    if (!doctor) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const passwordValida = await bcrypt.compare(password, doctor.password);
    if (!passwordValida) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      doctor: {
        id: doctor.id,
        nombre: doctor.nombre,
        apellido: doctor.apellido,
        email: doctor.email,
        especialidad: doctor.especialidad,
      },
    });
  } catch (error) {
    console.error("Error en /api/auth/login:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}