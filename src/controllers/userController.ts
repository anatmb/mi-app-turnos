import { getDB } from "@/lib/db";

export const userController = {
  create: async (data: { dni: string; nombre: string; email?: string; telefono?: string }) => {
    const db = getDB();
    return db.user.create({
      data: {
        dni: data.dni,
        nombre: data.nombre,
        email: data.email || null,
        telefono: data.telefono,
      },
    });
  },

  getAll: async () => {
    const db = getDB();
    return db.user.findMany({
      where: { activo: true },
      include: {
        appointments: { orderBy: { dateTime: "desc" } },
      },
      orderBy: { nombre: "asc" },
    });
  },
};
