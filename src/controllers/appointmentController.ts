// import { getDB } from "@/lib/db";

// const isBuilding =
//   process.env.NEXT_PHASE === "phase-production-build" ||
//   process.env.CI === "true";

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

//     const db = getDB();

//     let user = await db.user.findUnique({ where: { email: data.email } });
//     if (!user) {
//       user = await db.user.create({
//         data: {
//           nombre: data.nombre,
//           email: data.email,
//           telefono: data.telefono || null,
//         },
//       });
//     }

//     const fechaHoraCombinada = new Date(`${data.fechaSeleccionada}T${data.horaSeleccionada}`);
//     return await db.appointment.create({
//       data: { userId: user.id, dateTime: fechaHoraCombinada, status: "PENDING" },
//     });
//   },

//   getAll: async () => {
//     if (isBuilding) return [];

//     const db = getDB();
//     return await db.appointment.findMany({
//       include: { user: true },
//       orderBy: { dateTime: "asc" },
//     });
//   },
// };

import { getDB } from "@/lib/db";

const HORARIOS_DISPONIBLES = new Set([
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00",
]);

const isBuilding =
  process.env.NEXT_PHASE === "phase-production-build" ||
  process.env.CI === "true";

export const appointmentController = {
  create: async (data: {
    dni: string;               // <-- 1. DNI obligatorio
    nombre: string;
    email?: string;            // <-- 2. Email ahora opcional
    telefono?: string;
    tieneObraSocial?: boolean;
    obraSocial?: string;
    fechaSeleccionada: string;
    horaSeleccionada: string;
  }) => {
    if (isBuilding) {
      return { id: "mock-id", userId: "mock-user", dateTime: new Date(), status: "PENDING" };
    }

    const db = getDB();
    const cleanDni = data.dni.trim();
    const cleanName = data.nombre.trim();

    if (!cleanDni || !cleanName) {
      throw new AppointmentValidationError("El DNI y el nombre son obligatorios.");
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.fechaSeleccionada) || !HORARIOS_DISPONIBLES.has(data.horaSeleccionada)) {
      throw new AppointmentValidationError("La fecha o el horario seleccionado no son válidos.");
    }

    // La aplicación opera en Argentina. Al incluir la zona horaria, el turno
    // conserva la hora elegida aunque el servidor esté en otra región.
    const fechaHoraCombinada = new Date(
      `${data.fechaSeleccionada}T${data.horaSeleccionada}:00-03:00`
    );

    if (Number.isNaN(fechaHoraCombinada.getTime())) {
      throw new AppointmentValidationError("La fecha seleccionada no es válida.");
    }

    if (fechaHoraCombinada <= new Date()) {
      throw new AppointmentValidationError("El horario seleccionado ya pasó. Elegí uno posterior.");
    }

    // El turno y el paciente se guardan juntos: si el horario ya fue tomado,
    // la transacción se revierte y no cambia ningún dato del paciente.
    return db.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: { dni: cleanDni },
        update: {
          nombre: cleanName,
          email: data.email?.trim() || null,
          telefono: data.telefono?.trim() || null,
          tieneObraSocial: data.tieneObraSocial ?? false,
          obraSocial: data.tieneObraSocial ? data.obraSocial?.trim() || null : null,
        },
        create: {
          dni: cleanDni,
          nombre: cleanName,
          email: data.email?.trim() || null,
          telefono: data.telefono?.trim() || null,
          tieneObraSocial: data.tieneObraSocial ?? false,
          obraSocial: data.tieneObraSocial ? data.obraSocial?.trim() || null : null,
        },
      });

      return tx.appointment.create({
        data: {
          userId: user.id,
          dateTime: fechaHoraCombinada,
          status: "PENDING",
        },
      });
    });
  },

  getAll: async () => {
    if (isBuilding) return [];

    const db = getDB();
    return await db.appointment.findMany({
      include: { user: true },
      orderBy: { dateTime: "asc" },
    });
  },
};

export class AppointmentValidationError extends Error {}
