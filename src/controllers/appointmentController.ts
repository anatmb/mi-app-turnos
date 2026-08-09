// import { db } from "@/lib/db";

// export const appointmentController = {
//   create: async (data: {
//     nombre: string;
//     email: string;
//     telefono?: string;
//     fechaSeleccionada: string;
//     horaSeleccionada: string;
//   }) => {
//     return await db.appointment.create({
//       data: {
//         nombre: data.nombre,
//         email: data.email,
//         telefono: data.telefono,
//         fecha: new Date(data.fechaSeleccionada),
//         hora: data.horaSeleccionada,
//       },
//     });
//   },

//   getAll: async () => {
//     return await db.appointment.findMany({
//       orderBy: { fecha: "asc" },
//     });
//   },
// };

// import { db } from "@/lib/db";

// export const appointmentController = {
//   create: async (data: {
//     nombre: string;
//     email: string;
//     telefono?: string;
//     fechaSeleccionada: string; // Ej: "2026-08-15"
//     horaSeleccionada: string;  // Ej: "14:30"
//   }) => {
//     // 1. Buscar si el usuario ya existe por su email o crearlo si es nuevo
//     let user = await db.user.findUnique({
//       where: { email: data.email },
//     });

//     if (!user) {
//       user = await db.user.create({
//         data: {
//           nombre: data.nombre,
//           email: data.email,
//           telefono: data.telefono,
//         },
//       });
//     }

//     // 2. Combinar la fecha y la hora en un solo objeto Date para el campo 'dateTime'
//     // Combinamos "2026-08-15" y "14:30" en "2026-08-15T14:30:00"
//     const fechaHoraCombinada = new Date(`${data.fechaSeleccionada}T${data.horaSeleccionada}`);

//     // 3. Crear la cita vinculada al ID del usuario
//     return await db.appointment.create({
//       data: {
//         userId: user.id, // Vinculamos la cita con el usuario
//         dateTime: fechaHoraCombinada,
//         status: "PENDING",
//       },
//     });
//   },

//   getAll: async () => {
//     return await db.appointment.findMany({
//       include: {
//         user: true, // Esto te permite traer también el nombre y teléfono del cliente al listar las citas
//       },
//       orderBy: { dateTime: "asc" },
//     });
//   },
// };

import { PrismaClient, Prisma } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const databaseUrl = process.env.DATABASE_URL;

// Definimos explícitamente las opciones con el tipo estricto de Prisma
const prismaOptions: Prisma.PrismaClientOptions = {
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
};

// Si hay URL real o simulada, la inyectamos respetando el tipado exacto
if (databaseUrl) {
  prismaOptions.datasources = {
    db: { url: databaseUrl },
  };
} else {
  prismaOptions.datasources = {
    db: { url: "postgresql://mock:mock@localhost:5432/mock" },
  };
}

export const db = globalForPrisma.prisma ?? new PrismaClient(prismaOptions);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;