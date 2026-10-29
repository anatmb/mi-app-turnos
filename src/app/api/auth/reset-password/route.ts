import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDB } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();
    if (typeof token !== "string" || typeof password !== "string" || password.length < 8) {
      return NextResponse.json({ error: "El enlace o la contraseña no son válidos. Usá al menos 8 caracteres." }, { status: 400 });
    }

    const tokenHash = createHash("sha256").update(token).digest("hex");
    const prisma = getDB();
    const reset = await prisma.passwordResetToken.findUnique({ where: { tokenHash } });
    if (!reset || reset.expiresAt <= new Date()) {
      if (reset) await prisma.passwordResetToken.delete({ where: { id: reset.id } });
      return NextResponse.json({ error: "El enlace venció o ya fue usado. Solicitá uno nuevo." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.$transaction([
      prisma.doctor.update({ where: { id: reset.doctorId }, data: { password: hashedPassword } }),
      prisma.passwordResetToken.deleteMany({ where: { doctorId: reset.doctorId } }),
    ]);
    return NextResponse.json({ message: "Contraseña actualizada. Ya podés iniciar sesión." });
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    return NextResponse.json({ error: "No pudimos cambiar la contraseña." }, { status: 500 });
  }
}
