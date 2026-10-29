-- La baja lógica conserva el historial clínico y los turnos del paciente.
ALTER TABLE "User" ADD COLUMN "activo" BOOLEAN NOT NULL DEFAULT true;
