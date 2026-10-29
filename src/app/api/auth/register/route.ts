// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { nombre, apellido, email, telefono, especialidad, password } = body;

//     if (!email || !password || !nombre) {
//       return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
//     }

//     // Verificar si ya existe
//     const doctorExiste = await prisma.doctor.findUnique({ where: { email } });
//     if (doctorExiste) {
//       return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 });
//     }

//     // Encriptar contraseña
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Crear en Neon
//     const doctor = await prisma.doctor.create({
//       data: {
//         nombre,
//         apellido,
//         email,
//         telefono,
//         especialidad,
//         password: hashedPassword,
//       },
//     });

//     return NextResponse.json({ success: true, message: "Doctor creado correctamente" });
//   } catch (error) {
//     return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
//   }
// }
// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { nombre, apellido, email, telefono, especialidad, password } = body;

//     if (!email || !password || !nombre) {
//       return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
//     }

//     // Verificar si ya existe
//     const doctorExiste = await prisma.doctor.findUnique({ where: { email } });
//     if (doctorExiste) {
//       return NextResponse.json({ error: "El email ya está registrado" }, { status: 400 });
//     }

//     // Encriptar contraseña
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Crear en Neon sin guardar en constante innecesaria
//     await prisma.doctor.create({
//       data: {
//         nombre,
//         apellido,
//         email,
//         telefono,
//         especialidad,
//         password: hashedPassword,
//       },
//     });

//     return NextResponse.json({ success: true, message: "Doctor creado correctamente" });
//   }catch (error) {
//   console.error(error); // Usa la variable para depurar
//   return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { getDB } from "../../../../lib/db"; // O la ruta relativa si no usas @
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const prisma = getDB(); // Instanciamos la conexión mediante tu helper
    const body = await req.json();
    console.log("📥 Body recibido:", body);
    const { nombre, apellido, email, telefono, especialidad, password } = body;

    if (!nombre || !apellido || !email || !password) {
      return NextResponse.json(
        { error: "Nombre, apellido, email y contraseña son obligatorios" },
        { status: 400 }
      );
    }

    const doctorExiste = await prisma.doctor.findUnique({ where: { email } });
    if (doctorExiste) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.doctor.create({
      data: {
        nombre,
        apellido,
        email,
        telefono: telefono || null,
        especialidad: especialidad || null,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Doctor creado correctamente",
    });
  } catch (error) {
    console.error("Error en /api/auth/register:", error);
    return NextResponse.json(
      { error: "Error en el servidor al registrar usuario" },
      { status: 500 }
    );
  }
}