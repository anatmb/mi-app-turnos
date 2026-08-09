import { db } from "@/lib/db";

export const userController = {
  create: async (data: { nombre: string; email: string; telefono?: string }) => {
    return await db.user.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono,
      },
    });
  },

  getAll: async () => {
    return await db.user.findMany();
  },
};