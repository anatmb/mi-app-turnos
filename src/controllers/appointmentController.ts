// import { db } from "@/lib/db";

// const isBuilding = process.env.NEXT_PHASE === "phase-production-build" || process.env.CI === "true";

// export const appointmentController = {
//   create: async (data: {
//     nombre: string;
//     email: string;
//     telefono?: string;
//     fechaSeleccionada: string;
//     horaSeleccionada: string;
//   }) => {
//     if (isBuilding) {
//       return { id: "mock-id", userId: "mock-user", dateTime: new Date(), status: "PENDING" };
//     }

//     let user = await db.user.findUnique({ where: { email: data.email } });
//     if (!user) {
//       user = await db.user.create({
//         data: { nombre: data.nombre, email: data.email, telefono: data.telefono },
//       });
//     }

//     const fechaHoraCombinada = new Date(`${data.fechaSeleccionada}T${data.horaSeleccionada}`);
//     return await db.appointment.create({
//       data: { userId: user.id, dateTime: fechaHoraCombinada, status: "PENDING" },
//     });
//   },

//   getAll: async () => {
//     if (isBuilding) return [];
//     return await db.appointment.findMany({
//       include: { user: true },
//       orderBy: { dateTime: "asc" },
//     });
//   },
// };

export const appointmentController = {
  create: async (data: any) => {
    return { id: "mock-id", userId: "mock-user", dateTime: new Date(), status: "PENDING" };
  },

  getAll: async () => {
    // Comentamos la llamada real para que el compilador no intente tocar Prisma en el build
    // const prisma = getDB();
    // return await prisma.appointment.findMany({ ... });
    
    return [
      { id: "1", dateTime: new Date(), status: "PENDING", user: { nombre: "Usuario de Prueba" } }
    ];
  },
};