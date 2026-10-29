"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PatientsView from "@/components/PatientsView";
import AgendaView from "@/components/AgendaView";
import { 
  faChartPie, 
  faCalendarAlt, 
  faUserFriends, 
  faSearch,
  faBell,
  faCalendarCheck,
  faUsers,
  faExclamationTriangle,
  faEdit,
  faTimes,
  faFolderOpen,
  faFileMedical,
  faPlus,
  faClock,
  faSignOutAlt,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

interface DoctorData {
  nombre?: string;
  especialidad?: string;
}

interface User {
  id: string;
  dni: string;
  nombre: string;
  email?: string | null;
  telefono?: string | null;
}

interface Appointment {
  id: string;
  dateTime: string;
  status: string;
  user: User;
}

export default function Dashboard() {
  const [seccionActiva, setSeccionActiva] = useState("dashboard");
  const [doctor] = useState<DoctorData | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      const sessionData = localStorage.getItem("doctor_session");
      return sessionData ? JSON.parse(sessionData) : null;
    } catch {
      return null;
    }
  });
  
  // Estados para datos de la API
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar turnos desde el Backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointments");
        if (res.ok) {
          const data = await res.json();
          setAppointments(data);
        }
      } catch (error) {
        console.error("Error al obtener turnos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("doctor_session");
    window.location.reload();
  };

  const getInitials = (name?: string) => {
    if (!name) return "DR";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // --- FILTROS Y MÉTRICAS DINÁMICAS ---
  const todayStr = new Date().toISOString().split("T")[0];

  const todayAppointments = appointments.filter((app) => {
    const appDate = new Date(app.dateTime).toISOString().split("T")[0];
    return appDate === todayStr;
  });

  const appointmentsTodayCount = todayAppointments.length;
  const cancellationsTodayCount = todayAppointments.filter(app => app.status === "CANCELLED").length;
  const uniquePatientsCount = new Set(appointments.map(app => app.user.id)).size;

  // Filtrado por buscador
  const filteredTodayAppointments = todayAppointments.filter((app) => {
    const term = searchTerm.toLowerCase();
    return (
      app.user.nombre.toLowerCase().includes(term) ||
      app.user.dni.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* SIDEBAR LATERAL IZQUIERDO */}
      <aside className="w-64 bg-[#121624] text-slate-300 flex flex-col justify-between shrink-0 min-h-screen">
        <div className="p-6 space-y-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
            <span className="text-2xl font-black text-white tracking-tight">ConsultorioMedico</span>
          </div>

          <nav className="space-y-6">
            <div className="space-y-2">
              <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase px-3">
                Principal
              </p>
              
              <button
                onClick={() => setSeccionActiva("dashboard")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-bold text-sm transition-all ${
                  seccionActiva === "dashboard"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                    : "hover:bg-slate-800/60 text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faChartPie} className="w-4 h-4" />
                  <span>Dashboard</span>
                </div>
              </button>

              <button
                onClick={() => setSeccionActiva("agenda")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${
                  seccionActiva === "agenda"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                    : "hover:bg-slate-800/60 text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4" />
                  <span>Agenda</span>
                </div>
                <span className="bg-orange-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {appointmentsTodayCount}
                </span>
              </button>

              <button
                onClick={() => setSeccionActiva("pacientes")}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all ${
                  seccionActiva === "pacientes"
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                    : "hover:bg-slate-800/60 text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faUserFriends} className="w-4 h-4" />
                  
                  <span>Pacientes</span>
                </div>
              </button>
            </div>
          </nav>
        </div>

        {/* PERFIL */}
        <div className="p-4 border-t border-slate-800/80 bg-[#0d101b] flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black flex items-center justify-center text-xs shrink-0 shadow-md">
              {getInitials(doctor?.nombre)}
            </div>
            <div className="overflow-hidden">
              <h4 className="font-bold text-white text-sm truncate leading-tight">
                {doctor?.nombre || "Médico"}
              </h4>
              <p className="text-xs text-slate-400 truncate">
                {doctor?.especialidad || "Especialista"}
              </p>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            title="Cerrar sesión"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
          </button>
        </div>
      </aside>

 {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-8 py-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              {/* 1. TÍTULO DINÁMICO SEGÚN LA SECCIÓN */}
              <h1 className="text-2xl font-extrabold text-slate-800">
                {seccionActiva === "dashboard" && "Dashboard"}
                {seccionActiva === "agenda" && "Agenda"}
                {seccionActiva === "pacientes" && "Gestión de Pacientes"}
              </h1>
              <p className="text-xs font-medium text-slate-400 mt-0.5">
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-72">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" 
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre o DNI..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-100/80 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-slate-700 placeholder-slate-400"
                />
              </div>
              <button className="w-9 h-9 rounded-xl bg-amber-50/80 border border-amber-200/60 flex items-center justify-center text-amber-600 relative hover:bg-amber-100 transition-colors cursor-pointer">
                <FontAwesomeIcon icon={faBell} className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 overflow-y-auto">
          
          {/* 2. SI LA SECCIÓN ES "dashboard", MUESTRA TUS TARJETAS Y AGENDA */}
          {seccionActiva === "dashboard" && (
            <>
              {/* TARJETAS DE MÉTRICAS (DINÁMICAS) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={faCalendarCheck} className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-black text-slate-800">{appointmentsTodayCount}</span>
                  <p className="text-xs font-semibold text-slate-500 mt-1">Pacientes hoy</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-black text-slate-800">{uniquePatientsCount}</span>
                  <p className="text-xs font-semibold text-slate-500 mt-1">Total pacientes registrados</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="w-5 h-5" />
                  </div>
                  <span className="text-3xl font-black text-slate-800">{cancellationsTodayCount}</span>
                  <p className="text-xs font-semibold text-slate-500 mt-1">Cancelaciones hoy</p>
                </div>
              </div>

              {/* AGENDA DE HOY */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-800">Agenda de hoy</h2>
                      <p className="text-xs text-slate-400">{appointmentsTodayCount} turnos agendados para hoy</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {loading ? (
                      <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" /> Cargando agenda...
                      </div>
                    ) : filteredTodayAppointments.length === 0 ? (
                      <div className="p-8 text-center text-slate-400 bg-white rounded-2xl border border-slate-200 text-sm">
                        No hay turnos programados para hoy.
                      </div>
                    ) : (
                      filteredTodayAppointments.map((app) => {
                        const dateObj = new Date(app.dateTime);
                        const timeStr = dateObj.toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });

                        return (
                          <div key={app.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="text-center pr-3 border-r-2 border-orange-500">
                                <span className="block text-base font-black text-slate-800 leading-tight">{timeStr}</span>
                              </div>
                              <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                                {getInitials(app.user.nombre)}
                              </div>
                              <div>
                                <h3 className="font-bold text-slate-800 text-sm">{app.user.nombre}</h3>
                                <p className="text-xs text-slate-400">DNI: {app.user.dni} {app.user.telefono ? `· Tel: ${app.user.telefono}` : ""}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <span className="bg-emerald-100/80 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-md">
                                    {app.status}
                                  </span>
                                  <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors cursor-pointer">
                                    <FontAwesomeIcon icon={faFolderOpen} className="w-3 h-3 text-orange-500" />
                                    Expediente
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                              <button className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 font-semibold text-xs px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer">
                                <FontAwesomeIcon icon={faEdit} className="w-3 h-3" />
                                Editar
                              </button>
                              <button className="bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold text-xs px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer">
                                <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                                Cancelar
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* RECORDATORIOS Y EXPEDIENTES */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-orange-500" />
                        <h3 className="font-bold text-slate-800 text-sm">Recordatorios</h3>
                      </div>
                      <button className="text-orange-500 hover:text-orange-600 text-xs font-bold flex items-center gap-1 cursor-pointer">
                        <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                        Nuevo
                      </button>
                    </div>
                    <p className="text-xs text-slate-400">Sin recordatorios pendientes.</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faFileMedical} className="w-4 h-4 text-orange-500" />
                        <h3 className="font-bold text-slate-800 text-sm">Expedientes Recientes</h3>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">Sin expedientes cargados.</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 3. SI LA SECCIÓN ES "pacientes", MUESTRA EL COMPONENTE NUEVO */}
          {seccionActiva === "pacientes" && (
            <PatientsView />
          )}

          {seccionActiva === "agenda" && (
            <AgendaView appointments={appointments} loading={loading} />
          )}

        </div>
      </main>
    </div>
  );
}
