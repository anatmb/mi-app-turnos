
// "use client";

// import React, { useState, useEffect } from "react";
// import { Calendar } from "@/components/ui/calendar";
// import { Button } from "@/components/ui/button";
// import { es } from "date-fns/locale";

// const HORARIOS_DISPONIBLES = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

// // Tipo básico para manejar las citas recibidas del backend
// type CitaOcupada = {
//   fecha: string; // Formato "YYYY-MM-DD"
//   hora: string;  // Formato "HH:MM"
// };

// export default function AppointmentForm() {
//   const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | undefined>(new Date());
//   const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
//   const [pasoFormulario, setPasoFormulario] = useState<boolean>(false);

//   // Estado para guardar las citas reservadas en la base de datos
//   const [citasOcupadas, setCitasOcupadas] = useState<CitaOcupada[]>([]);
//   const [cargandoHorarios, setCargandoHorarios] = useState<boolean>(true);

//   // Datos del cliente
//   const [dni, setDni] = useState("");
//   const [nombre, setNombre] = useState("");
//   const [email, setEmail] = useState("");
//   const [telefono, setTelefono] = useState("");

//   // Helper para formatear Date a "YYYY-MM-DD" en zona local
//   const formatearFecha = (date: Date): string => {
//     const anio = date.getFullYear();
//     const mes = String(date.getMonth() + 1).padStart(2, "0");
//     const dia = String(date.getDate()).padStart(2, "0");
//     return `${anio}-${mes}-${dia}`;
//   };

//   // 1. CARGAR CITAS OCUPADAS DESDE EL BACKEND
//   useEffect(() => {
//     const obtenerCitas = async () => {
//       try {
//         setCargandoHorarios(true);
//         const res = await fetch("/api/appointments");
//         if (res.ok) {
//           const data = await res.json();
//           // Se asume que la API retorna un array con { fecha: "YYYY-MM-DD", hora: "10:00" }
//           setCitasOcupadas(data);
//         }
//       } catch (error) {
//         console.error("Error cargando disponibilidad:", error);
//       } finally {
//         setCargandoHorarios(false);
//       }
//     };

//     obtenerCitas();
//   }, []);

//   // 2. LOGICA: DÍAS COMPLETAMENTE LLENOS
//   const esDiaLleno = (date: Date): boolean => {
//     const fechaStr = formatearFecha(date);
    
//     // Contamos cuántas horas ocupadas hay para este día
//     const horasOcupadasEseDia = citasOcupadas.filter((c) => c.fecha === fechaStr).length;
    
//     // Si la cantidad de citas reservadas iguala o supera los horarios totales, el día está lleno
//     return horasOcupadasEseDia >= HORARIOS_DISPONIBLES.length;
//   };

//   // 3. LOGICA: HORAS OCUPADAS PARA LA FECHA SELECCIONADA
//   const horasOcupadasFechaSeleccionada = React.useMemo(() => {
//     if (!fechaSeleccionada) return [];
//     const fechaStr = formatearFecha(fechaSeleccionada);
    
//     return citasOcupadas
//       .filter((c) => c.fecha === fechaStr)
//       .map((c) => c.hora);
//   }, [fechaSeleccionada, citasOcupadas]);

//   const handleFinalizarReserva = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!fechaSeleccionada || !horaSeleccionada || !dni || !nombre) return;

//     try {
//       const fechaFormatoString = formatearFecha(fechaSeleccionada);

//       const response = await fetch("/api/appointments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           dni,
//           nombre,
//           email,
//           telefono,
//           fechaSeleccionada: fechaFormatoString,
//           horaSeleccionada,
//         }),
//       });

//       const resultado = await response.json();

//       if (!response.ok) {
//         alert(`Error al guardar la cita: ${resultado.error || "Inténtalo de nuevo"}`);
//         return;
//       }

//       // Actualizar el estado local para reflejar la cita inmediatamente sin recargar la página
//       setCitasOcupadas((prev) => [
//         ...prev,
//         { fecha: fechaFormatoString, hora: horaSeleccionada },
//       ]);

//       const fechaFormateada = fechaSeleccionada.toLocaleDateString("es-ES", {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//       });

//       const mensajeWhatsApp =
//         `Hola, quiero confirmar una cita:\n\n` +
//         `🪪 *DNI:* ${dni}\n` +
//         `👤 *Nombre:* ${nombre}\n` +
//         `📅 *Fecha:* ${fechaFormateada}\n` +
//         `⏰ *Hora:* ${horaSeleccionada} hs\n` +
//         `📞 *Contacto:* ${telefono || "No especificado"}`;

//       const numeroTelefonoNegocio = "1127873979";
//       const urlWhatsApp = `https://wa.me/${numeroTelefonoNegocio}?text=${encodeURIComponent(
//         mensajeWhatsApp
//       )}`;

//       window.open(urlWhatsApp, "_blank");
//       alert("¡Cita reservada con éxito!");
      
//       // Reiniciar formulario
//       setPasoFormulario(false);
//       setHoraSeleccionada(null);
//     } catch (error) {
//       console.error("Error de conexión:", error);
//       alert("No se pudo establecer conexión con el servidor.");
//     }
//   };

//   if (pasoFormulario) {
//     return (
//       <div className="bg-white rounded-xl shadow-md max-w-md mx-auto border border-slate-100 p-6">
//         <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">Datos de la Cita</h3>
//         <p className="text-sm text-slate-500 text-center mb-6">
//           Estás reservando para el <strong>{fechaSeleccionada?.toLocaleDateString("es-ES")}</strong> a las <strong>{horaSeleccionada} hs</strong>.
//         </p>

//         <form onSubmit={handleFinalizarReserva} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">DNI / Documento *</label>
//             <input
//               type="text"
//               required
//               value={dni}
//               onChange={(e) => setDni(e.target.value)}
//               className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               placeholder="Ej. 12345678"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo *</label>
//             <input
//               type="text"
//               required
//               value={nombre}
//               onChange={(e) => setNombre(e.target.value)}
//               className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               placeholder="Ej. Juan Pérez"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               placeholder="ejemplo@correo.com"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono de Contacto</label>
//             <input
//               type="tel"
//               value={telefono}
//               onChange={(e) => setTelefono(e.target.value)}
//               className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
//               placeholder="Ej. +54 9 11 ..."
//             />
//           </div>

//           <div className="flex gap-2 pt-2">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => setPasoFormulario(false)}
//               className="w-1/3"
//             >
//               Volver
//             </Button>
//             <Button
//               type="submit"
//               className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
//             >
//               Confirmar y Enviar
//             </Button>
//           </div>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto border border-slate-100">
//       <div className="flex flex-col items-center">
//         <h3 className="text-lg font-semibold text-slate-800 mb-4">1. Selecciona el día</h3>
//         <Calendar
//           mode="single"
//           selected={fechaSeleccionada}
//           onSelect={(date) => {
//             setFechaSeleccionada(date);
//             setHoraSeleccionada(null);
//           }}
//           locale={es}
//           className="rounded-md border border-slate-200"
//           // Bloquea días pasados Y días donde no quedan horarios disponibles
//           disabled={(date) => 
//             date < new Date(new Date().setHours(0, 0, 0, 0)) || esDiaLleno(date)
//           }
//         />
//       </div>

//       <div className="flex-1 w-full">
//         <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center md:text-left">2. Selecciona la hora</h3>
        
//         {cargandoHorarios ? (
//           <p className="text-sm text-slate-400 text-center py-8">Cargando disponibilidad...</p>
//         ) : (
//           <div className="grid grid-cols-3 gap-2 mb-6">
//             {HORARIOS_DISPONIBLES.map((hora) => {
//               const estaOcupado = horasOcupadasFechaSeleccionada.includes(hora);

//               return (
//                 <Button
//                   key={hora}
//                   variant={horaSeleccionada === hora ? "default" : "outline"}
//                   disabled={estaOcupado}
//                   className={`w-full transition-all ${
//                     estaOcupado ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 line-through" : ""
//                   }`}
//                   onClick={() => setHoraSeleccionada(hora)}
//                 >
//                   {hora}
//                 </Button>
//               );
//             })}
//           </div>
//         )}

//         {fechaSeleccionada && horaSeleccionada ? (
//           <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4 text-sm text-slate-600">
//             <p><strong>Día seleccionado:</strong> {fechaSeleccionada.toLocaleDateString("es-ES")}</p>
//             <p><strong>Hora seleccionada:</strong> {horaSeleccionada} hs</p>
//           </div>
//         ) : (
//           <p className="text-sm text-slate-400 text-center mb-4">Por favor, elige un día y una hora para continuar.</p>
//         )}

//         <Button
//           onClick={() => setPasoFormulario(true)}
//           disabled={!fechaSeleccionada || !horaSeleccionada}
//           className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6"
//         >
//           Siguiente: Introducir Datos
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { es } from "date-fns/locale";
import { 
  CalendarDays, 
  Clock, 
  User, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  ArrowLeft, 
  Check, 
  ShieldCheck 
} from "lucide-react";

const HORARIOS_DISPONIBLES = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

type CitaOcupada = {
  fecha: string;
  hora: string;
};

export default function AppointmentForm() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | undefined>(new Date());
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  const [pasoFormulario, setPasoFormulario] = useState<boolean>(false);

  const [citasOcupadas, setCitasOcupadas] = useState<CitaOcupada[]>([]);
  const [cargandoHorarios, setCargandoHorarios] = useState<boolean>(true);
  const [guardandoReserva, setGuardandoReserva] = useState(false);
  const [ahora, setAhora] = useState(() => new Date());

  // Datos del cliente
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tieneObraSocial, setTieneObraSocial] = useState(false);
  const [obraSocial, setObraSocial] = useState("");
  const [mensajePaciente, setMensajePaciente] = useState("");
  const [buscandoPaciente, setBuscandoPaciente] = useState(false);

  const formatearFecha = (date: Date): string => {
    const anio = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
  };

  useEffect(() => {
    const obtenerCitas = async () => {
      try {
        setCargandoHorarios(true);
        const res = await fetch("/api/appointments");
        if (res.ok) {
          const data = await res.json();
          setCitasOcupadas(
            data.filter((appointment: { status: string }) => appointment.status !== "CANCELLED")
          );
        }
      } catch (error) {
        console.error("Error cargando disponibilidad:", error);
      } finally {
        setCargandoHorarios(false);
      }
    };

    obtenerCitas();
  }, []);

  // Mantiene actualizada la disponibilidad si la persona deja la página abierta.
  useEffect(() => {
    const intervalId = window.setInterval(() => setAhora(new Date()), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const esDiaLleno = (date: Date): boolean => {
    const fechaStr = formatearFecha(date);
    const horasOcupadasEseDia = citasOcupadas.filter((c) => c.fecha === fechaStr).length;
    return horasOcupadasEseDia >= HORARIOS_DISPONIBLES.length;
  };

  const horasOcupadasFechaSeleccionada = React.useMemo(() => {
    if (!fechaSeleccionada) return [];
    const fechaStr = formatearFecha(fechaSeleccionada);
    return citasOcupadas
      .filter((c) => c.fecha === fechaStr)
      .map((c) => c.hora);
  }, [fechaSeleccionada, citasOcupadas]);

  const esHorarioPasado = (date: Date, hora: string) => {
    const fechaHora = new Date(`${formatearFecha(date)}T${hora}:00-03:00`);
    return fechaHora <= ahora;
  };

  const completarDatosPorDni = async () => {
    const cleanDni = dni.trim();
    if (!cleanDni) return;

    setBuscandoPaciente(true);
    setMensajePaciente("");
    try {
      const response = await fetch(`/api/patients/by-dni/${encodeURIComponent(cleanDni)}`);
      if (response.status === 404) return;
      if (!response.ok) throw new Error();

      const patient = await response.json();
      setNombre(patient.nombre ?? "");
      setEmail(patient.email ?? "");
      setTelefono(patient.telefono ?? "");
      setTieneObraSocial(patient.tieneObraSocial ?? false);
      setObraSocial(patient.obraSocial ?? "");
      setMensajePaciente("Paciente encontrado: completamos sus datos.");
    } catch {
      setMensajePaciente("No pudimos consultar los datos. Podés completarlos manualmente.");
    } finally {
      setBuscandoPaciente(false);
    }
  };

  const handleFinalizarReserva = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fechaSeleccionada || !horaSeleccionada || !dni || !nombre || guardandoReserva) return;

    try {
      setGuardandoReserva(true);
      const fechaFormatoString = formatearFecha(fechaSeleccionada);

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dni,
          nombre,
          email,
          telefono,
          tieneObraSocial,
          obraSocial,
          fechaSeleccionada: fechaFormatoString,
          horaSeleccionada,
        }),
      });

      const resultado = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setCitasOcupadas((prev) => [
            ...prev,
            { fecha: fechaFormatoString, hora: horaSeleccionada },
          ]);
          setHoraSeleccionada(null);
          setPasoFormulario(false);
        }
        alert(`Error al guardar la cita: ${resultado.error || "Inténtalo de nuevo"}`);
        return;
      }

      setCitasOcupadas((prev) => [
        ...prev,
        { fecha: fechaFormatoString, hora: horaSeleccionada },
      ]);

      const fechaFormateada = fechaSeleccionada.toLocaleDateString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });

      const mensajeWhatsApp =
        `Hola, quiero confirmar mi cita médica:\n\n` +
        `🪪 *DNI:* ${dni}\n` +
        `👤 *Nombre:* ${nombre}\n` +
        `📅 *Fecha:* ${fechaFormateada}\n` +
        `⏰ *Hora:* ${horaSeleccionada} hs\n` +
        `📞 *Contacto:* ${telefono || "No especificado"}`;

      const numeroTelefonoNegocio = "1127873979";
      const urlWhatsApp = `https://wa.me/${numeroTelefonoNegocio}?text=${encodeURIComponent(
        mensajeWhatsApp
      )}`;

      window.open(urlWhatsApp, "_blank");
      alert("¡Cita reservada con éxito!");

      setPasoFormulario(false);
      setHoraSeleccionada(null);
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("No se pudo establecer conexión con el servidor.");
    } finally {
      setGuardandoReserva(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-orange-50/40 p-4 md:p-8 font-sans">
      <div className="max-w-9xl mx-auto space-y-6">
        
        {/* HEADER Y BARRA DE PROGRESO */}
        <header className="bg-white p-6 rounded-2xl shadow-sm border border-orange-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Reserva de Citas <span className="text-orange-500">Consultorio</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Agenda tu turno de manera rápida, cómoda y segura</p>
          </div>

          {/* Stepper / Barra de Progreso */}
          <div className="flex items-center gap-3 bg-orange-50/80 px-4 py-2 rounded-xl border border-orange-200/60 w-full md:w-auto justify-center">
            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                !pasoFormulario ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "bg-orange-200 text-orange-800"
              }`}>
                {!pasoFormulario ? "1" : <Check className="w-4 h-4" />}
              </span>
              <span className={`text-sm font-semibold ${!pasoFormulario ? "text-orange-900" : "text-slate-500"}`}>
                Fecha y Hora
              </span>
            </div>

            <div className="w-8 h-[2px] bg-orange-200" />

            <div className="flex items-center gap-2">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                pasoFormulario ? "bg-orange-500 text-white shadow-md shadow-orange-500/20" : "bg-slate-200 text-slate-500"
              }`}>
                2
              </span>
              <span className={`text-sm font-semibold ${pasoFormulario ? "text-orange-900" : "text-slate-400"}`}>
                Tus Datos
              </span>
            </div>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL EN GRID COMPLETO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* COLUMNA IZQUIERDA: FLYER DE PROMOCIÓN (3 Columnas en Pantalla Ancha) */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl p-6 shadow-lg border border-orange-400">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-orange-100 mb-4 uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Promoción de la Semana
              </div>

              <h2 className="text-xl font-bold mb-2 leading-tight">Limpieza & Chequeo Preventivo</h2>
              <p className="text-orange-100 text-sm mb-4">
                Obtén un <strong className="text-white underline decoration-orange-300">20% OFF</strong> agendando tus consultas los días Martes y Jueves.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-xs text-orange-100">
                ✨ Válido presentando tu DNI en recepción.
              </div>
            </div>

            {/* Banner de Garantía / WhatsApp */}
            <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm flex items-start gap-3">
              <div className="p-2.5 bg-orange-100 rounded-xl text-orange-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800 text-sm">Reserva 100% Segura</p>
                <p>Confirmación inmediata. Podrás cancelar o reprogramar desde tu WhatsApp sin costo adicional.</p>
              </div>
            </div>
          </aside>

          {/* COLUMNA CENTRAL: FORMULARIO PRINCIPAL (6 Columnas) */}
          <main className="lg:col-span-6 bg-white rounded-2xl shadow-sm border border-orange-100 p-6 space-y-6">
            
            {!pasoFormulario ? (
              /* PASO 1: SELECCIÓN DE FECHA Y HORA */
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start justify-center">
                  
                  {/* Bloque Calendario */}
                  <div className="w-full sm:w-auto">
                    <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-orange-500" />
                      1. Elige la fecha
                    </label>
                    <Calendar
                      mode="single"
                      selected={fechaSeleccionada}
                      onSelect={(date) => {
                        setFechaSeleccionada(date);
                        setHoraSeleccionada(null);
                      }}
                      locale={es}
                      className="rounded-xl border border-slate-200 shadow-none p-3"
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0)) || esDiaLleno(date)
                      }
                    />
                  </div>

                  {/* Bloque Horarios */}
                  <div className="w-full flex-1">
                    <label className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      2. Elige el horario
                    </label>

                    {cargandoHorarios ? (
                      <div className="h-48 flex items-center justify-center">
                        <p className="text-sm text-slate-400 animate-pulse">Consultando disponibilidad...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                        {HORARIOS_DISPONIBLES.map((hora) => {
                          const estaOcupado = horasOcupadasFechaSeleccionada.includes(hora);
                          const yaPaso = fechaSeleccionada
                            ? esHorarioPasado(fechaSeleccionada, hora)
                            : false;
                          const esSeleccionado = horaSeleccionada === hora;
                          const noDisponible = estaOcupado || yaPaso;

                          return (
                            <Button
                              key={hora}
                              variant="outline"
                              disabled={noDisponible}
                              title={yaPaso ? "Este horario ya pasó" : undefined}
                              className={`w-full h-11 font-medium transition-all text-sm rounded-xl ${
                                esSeleccionado
                                  ? "bg-orange-500 hover:bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-500/20"
                                  : noDisponible
                                  ? "opacity-30 bg-slate-100 text-slate-400 line-through cursor-not-allowed"
                                  : "border-slate-200 text-slate-700 hover:border-orange-300 hover:bg-orange-50/50"
                              }`}
                              onClick={() => setHoraSeleccionada(hora)}
                            >
                              {hora} hs
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={() => setPasoFormulario(true)}
                  disabled={!fechaSeleccionada || !horaSeleccionada}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 rounded-xl text-base shadow-lg shadow-orange-500/25 transition-all disabled:opacity-50 disabled:shadow-none"
                >
                  Continuar con mis Datos
                </Button>
              </div>
            ) : (
              /* PASO 2: FORMULARIO DATOS DEL CLIENTE */
              <form onSubmit={handleFinalizarReserva} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-500" />
                    Completa tus datos de reserva
                  </h3>
                  <button
                    type="button"
                    onClick={() => setPasoFormulario(false)}
                    className="text-xs text-orange-600 hover:underline font-semibold flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" /> Cambiar fecha/hora
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">DNI / Documento *</label>
                    <input
                      type="text"
                      required
                      value={dni}
                      onChange={(e) => {
                        setDni(e.target.value);
                        setMensajePaciente("");
                      }}
                      onBlur={() => void completarDatosPorDni()}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
                      placeholder="Ej. 12345678"
                    />
                    {buscandoPaciente && <p className="text-xs text-slate-400 mt-1">Buscando paciente...</p>}
                    {mensajePaciente && <p className="text-xs text-emerald-600 mt-1">{mensajePaciente}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4 space-y-3">
                  <label className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                    <input type="checkbox" checked={tieneObraSocial} onChange={(event) => setTieneObraSocial(event.target.checked)} className="h-4 w-4 accent-orange-500" />
                    Tengo obra social o prepaga
                  </label>
                  {tieneObraSocial && <label className="block text-xs font-semibold text-slate-700">Nombre de la obra social o prepaga
                    <input value={obraSocial} onChange={(event) => setObraSocial(event.target.value)} placeholder="Ej. OSDE, Swiss Medical" className="mt-1 w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
                  </label>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
                      placeholder="ejemplo@correo.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono de Contacto (WhatsApp)</label>
                    <input
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
                      placeholder="Ej. +54 9 11 ..."
                    />
                  </div>
                </div>

                {/* Confirmación por WhatsApp y recordatorio por correo */}
                <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3.5 flex items-start gap-3 mt-4">
                  <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Recibirás un recordatorio en este correo <strong>dos horas antes del turno</strong>. Al confirmar, también podrás avisar al consultorio por WhatsApp.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setPasoFormulario(false)}
                    className="w-1/3 border-slate-200 text-slate-600 rounded-xl h-11"
                  >
                    Volver
                  </Button>
                  <Button
                    type="submit"
                    disabled={guardandoReserva}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-xl shadow-md shadow-emerald-600/20"
                  >
                    {guardandoReserva ? "Guardando reserva..." : "Confirmar y Enviar Cita"}
                  </Button>
                </div>
              </form>
            )}
          </main>

          {/* COLUMNA DERECHA: RESUMEN DEL TURNO (3 Columnas en Pantalla Ancha) */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                Resumen de la Cita
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-orange-50/60 rounded-xl border border-orange-100">
                  <CalendarDays className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Fecha</p>
                    <p className="text-sm font-bold text-slate-700">
                      {fechaSeleccionada
                        ? fechaSeleccionada.toLocaleDateString("es-ES", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "No seleccionada"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-orange-50/60 rounded-xl border border-orange-100">
                  <Clock className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Horario</p>
                    <p className="text-sm font-bold text-slate-700">
                      {horaSeleccionada ? `${horaSeleccionada} hs` : "No seleccionado"}
                    </p>
                  </div>
                </div>
              </div>

              {fechaSeleccionada && horaSeleccionada ? (
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-semibold bg-emerald-50 p-2.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Horario pre-reservado
                </div>
              ) : (
                <p className="text-xs text-slate-400 text-center py-1">
                  Selecciona un día y una hora para habilitar la reserva.
                </p>
              )}
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
