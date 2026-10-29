ALTER TABLE "User"
ADD COLUMN "tieneObraSocial" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "obraSocial" TEXT;

ALTER TABLE "Appointment"
ADD COLUMN "reminderSentAt" TIMESTAMP(3);

CREATE TABLE "PasswordResetToken" (
  "id" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");
CREATE INDEX "PasswordResetToken_doctorId_idx" ON "PasswordResetToken"("doctorId");
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_doctorId_fkey"
FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
