import { getDB } from "@/lib/db";

export const expedienteController = {
  create: async (data: { userId: string; titulo: string; notas?: string; imagenUrl?: string }) => {
    return await getDB().expediente.create({
      data: {
        userId: data.userId,
        titulo: data.titulo,
        notas: data.notas,
        imagenUrl: data.imagenUrl,
      },
    });
  },

  getByUserId: async (userId: string) => {
    return await getDB().expediente.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },
};
