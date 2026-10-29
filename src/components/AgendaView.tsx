"use client";

import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

type Appointment = {
  id: string;
  dateTime: string;
  status: string;
  user: {
    id: string;
    nombre: string;
    dni: string;
    telefono?: string | null;
  };
};

type AgendaViewProps = {
  appointments: Appointment[];
  loading: boolean;
};

const TIME_ZONE = "America/Argentina/Buenos_Aires";
const weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function getDayKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function getLocalDayKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTime(dateTime: string) {
  return new Intl.DateTimeFormat("es-AR", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(new Date(dateTime));
}

export default function AgendaView({ appointments, loading }: AgendaViewProps) {
  const [month, setMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDay, setSelectedDay] = useState(() => getLocalDayKey(new Date()));

  const appointmentsByDay = useMemo(() => {
    return appointments.reduce<Record<string, Appointment[]>>((days, appointment) => {
      const key = getDayKey(new Date(appointment.dateTime));
      (days[key] ??= []).push(appointment);
      return days;
    }, {});
  }, [appointments]);

  const selectedAppointments = (appointmentsByDay[selectedDay] ?? []).sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const leadingDays = new Date(year, monthIndex, 1).getDay();
  const selectedDateLabel = new Date(`${selectedDay}T12:00:00`).toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const changeMonth = (offset: number) => {
    const nextMonth = new Date(year, monthIndex + offset, 1);
    setMonth(nextMonth);
    setSelectedDay(getLocalDayKey(nextMonth));
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
      <section className="xl:col-span-8 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-orange-500" />
              Agenda mensual
            </h2>
            <p className="text-xs text-slate-400 mt-1">Seleccioná un día para ver sus turnos.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="Mes anterior"
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Mes siguiente"
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        <h3 className="text-center font-bold text-slate-700 capitalize mb-4">
          {month.toLocaleDateString("es-AR", { month: "long", year: "numeric" })}
        </h3>

        <div className="grid grid-cols-7 gap-1.5 mb-1.5">
          {weekdays.map((day) => (
            <span key={day} className="text-center text-[10px] sm:text-xs font-bold text-slate-400 uppercase py-2">
              {day}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: leadingDays }).map((_, index) => (
            <div key={`empty-${index}`} className="min-h-20 sm:min-h-24 rounded-xl bg-slate-50/50" />
          ))}
          {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => {
            const date = new Date(year, monthIndex, day);
            const dayKey = getLocalDayKey(date);
            const dayAppointments = appointmentsByDay[dayKey] ?? [];
            const activeAppointments = dayAppointments.filter((appointment) => appointment.status !== "CANCELLED");
            const isSelected = selectedDay === dayKey;

            return (
              <button
                type="button"
                key={dayKey}
                onClick={() => setSelectedDay(dayKey)}
                className={`min-h-20 sm:min-h-24 p-1.5 sm:p-2 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "border-orange-500 ring-2 ring-orange-500/20 bg-orange-50"
                    : activeAppointments.length > 0
                      ? "border-orange-200 bg-white hover:border-orange-400 hover:bg-orange-50/50"
                      : "border-slate-100 bg-white hover:bg-slate-50"
                }`}
              >
                <span className={`text-xs font-bold ${isSelected ? "text-orange-600" : "text-slate-600"}`}>{day}</span>
                <div className="mt-1 space-y-1 overflow-hidden">
                  {activeAppointments.slice(0, 2).map((appointment) => (
                    <span
                      key={appointment.id}
                      className="block truncate rounded bg-orange-100 px-1 py-0.5 text-[9px] sm:text-[10px] font-semibold text-orange-800"
                      title={`${formatTime(appointment.dateTime)} — ${appointment.user.nombre}`}
                    >
                      {formatTime(appointment.dateTime)} {appointment.user.nombre}
                    </span>
                  ))}
                  {activeAppointments.length > 2 && (
                    <span className="block text-[9px] sm:text-[10px] font-semibold text-orange-600">
                      +{activeAppointments.length - 2} más
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <aside className="xl:col-span-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 capitalize">{selectedDateLabel}</h2>
        <p className="text-xs text-slate-400 mt-1 mb-5">
          {selectedAppointments.filter((appointment) => appointment.status !== "CANCELLED").length} turnos activos
        </p>

        {loading ? (
          <p className="text-sm text-slate-400 py-8 text-center">Cargando agenda...</p>
        ) : selectedAppointments.length === 0 ? (
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-5 text-center">
            <p className="text-sm font-semibold text-emerald-700">Día disponible</p>
            <p className="text-xs text-emerald-600 mt-1">No hay turnos registrados.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedAppointments.map((appointment) => {
              const cancelled = appointment.status === "CANCELLED";
              return (
                <div key={appointment.id} className={`rounded-xl border p-3 flex gap-3 ${cancelled ? "bg-slate-50 border-slate-200 opacity-60" : "bg-white border-orange-100"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cancelled ? "bg-slate-200 text-slate-500" : "bg-orange-100 text-orange-600"}`}>
                    <FontAwesomeIcon icon={faClock} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800">{formatTime(appointment.dateTime)} · {appointment.user.nombre}</p>
                    <p className="text-xs text-slate-500 mt-0.5">DNI: {appointment.user.dni}</p>
                    {appointment.user.telefono && <p className="text-xs text-slate-400 mt-0.5">{appointment.user.telefono}</p>}
                    <span className={`inline-flex items-center gap-1 mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${cancelled ? "bg-slate-200 text-slate-600" : "bg-emerald-100 text-emerald-700"}`}>
                      <FontAwesomeIcon icon={faUser} /> {cancelled ? "Cancelado" : "Confirmado"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </aside>
    </div>
  );
}
