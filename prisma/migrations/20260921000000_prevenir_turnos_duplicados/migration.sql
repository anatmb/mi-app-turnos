-- Solo puede haber un turno activo por horario. Los cancelados se conservan
-- como historial y no bloquean que ese horario se vuelva a reservar.
CREATE UNIQUE INDEX "Appointment_active_dateTime_key"
ON "Appointment"("dateTime")
WHERE "status" <> 'CANCELLED';
