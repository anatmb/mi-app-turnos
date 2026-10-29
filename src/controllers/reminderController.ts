import { getDB } from "@/lib/db";

export const reminderController = {
  create: async (data: { userId: string; titulo: string; descripcion?: string; fechaHora: string }) => {
    return await getDB().recordatorio.create({
      data: {
        userId: data.userId,
        titulo: data.titulo,
        descripcion: data.descripcion,
        fechaHora: new Date(data.fechaHora),
      },
    });
  },

  getPendingByUserId: async (userId: string) => {
    return await getDB().recordatorio.findMany({
      where: { userId, completado: false },
      orderBy: { fechaHora: "asc" },
    });
  },
};
