// "use client";

// import React, { useState } from "react";
// import { Calendar } from "@/components/ui/calendar";
// import { Button } from "@/components/ui/button";
// import { es } from "date-fns/locale";

// // Lista simulada de horarios disponibles para el negocio
// const HORARIOS_DISPONIBLES = [
//   "09:00",
//   "10:00",
//   "11:00",
//   "12:00",
//   "14:00",
//   "15:00",
//   "16:00",
//   "17:00",
// ];

// export default function AppointmentForm() {
//   const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | undefined>(
//     new Date()
//   );
//   const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);

//   const handleConfirmarTurno = () => {
//     if (!fechaSeleccionada || !horaSeleccionada) return;

//     // Formateamos la fecha para mostrarla en la alerta
//     const fechaFormateada = fechaSeleccionada.toLocaleDateString("es-ES", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });

//     alert(`¡Turno reservado!\nFecha: ${fechaFormateada}\nHora: ${horaSeleccionada}\n\n(Próximo paso: Guardar en Postgres y enviar WhatsApp)`);
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto border border-slate-100">
      
//       {/* Columna Izquierda: El Calendario */}
//       <div className="flex flex-col items-center">
//         <h3 className="text-lg font-semibold text-slate-800 mb-4">
//           1. Selecciona el día
//         </h3>
//         <Calendar
//           mode="single"
//           selected={fechaSeleccionada}
//           onSelect={(date) => {
//             setFechaSeleccionada(date);
//             setHoraSeleccionada(null); // Reinicia la hora si cambia de día
//           }}
//           locale={es}
//           className="rounded-md border border-slate-200"
//           // Evita que seleccionen días pasados
//           disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
//         />
//       </div>

//       {/* Columna Derecha: Los Horarios y Confirmación */}
//       <div className="flex-1 w-full">
//         <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center md:text-left">
//           2. Selecciona la hora
//         </h3>
        
//         {/* Cuadrícula de Horas */}
//         <div className="grid grid-cols-3 gap-2 mb-6">
//           {HORARIOS_DISPONIBLES.map((hora) => (
//             <Button
//               key={hora}
//               variant={horaSeleccionada === hora ? "default" : "outline"}
//               className="w-full transition-all"
//               onClick={() => setHoraSeleccionada(hora)}
//             >
//               {hora}
//             </Button>
//           ))}
//         </div>

//         {/* Resumen y Botón de Acción */}
//         {fechaSeleccionada && horaSeleccionada ? (
//           <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4 text-sm text-slate-600">
//             <p><strong>Día seleccionado:</strong> {fechaSeleccionada.toLocaleDateString("es-ES")}</p>
//             <p><strong>Hora seleccionada:</strong> {horaSeleccionada} hs</p>
//           </div>
//         ) : (
//           <p className="text-sm text-slate-400 text-center mb-4">
//             Por favor, elige un día y una hora para continuar.
//           </p>
//         )}

//         <Button
//           onClick={handleConfirmarTurno}
//           disabled={!fechaSeleccionada || !horaSeleccionada}
//           className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6"
//         >
//           Confirmar Turno
//         </Button>
//       </div>

//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { es } from "date-fns/locale";

const HORARIOS_DISPONIBLES = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

export default function AppointmentForm() {
  // Estados para la cita
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | undefined>(new Date());
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  
  // Estado para cambiar de pantalla (false = elegir fecha, true = llenar datos)
  const [pasoFormulario, setPasoFormulario] = useState<boolean>(false);

  // Estados para los datos del cliente
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleFinalizarReserva = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fechaSeleccionada || !horaSeleccionada || !nombre || !email) return;

    const fechaFormateada = fechaSeleccionada.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });

    // ==========================================
    // 1. AQUÍ CONECTAREMOS PRISMA PRÓXIMAMENTE
    // ==========================================
    console.log("Guardando en Neon...", { nombre, email, telefono, fechaSeleccionada, horaSeleccionada });

    // ==========================================
    // 2. LOGICA DE ENVÍO A WHATSAPP
    // ==========================================
    // Reemplaza con tu número de teléfono real (con código de país, ej: 549 para Argentina, 34 para España)
    const numeroTelefonoNegocio = "5491123456789"; 
    
    const mensajeWhatsApp = `Hola, quiero confirmar una cita:\n\n` +
      `👤 *Nombre:* ${nombre}\n` +
      `📅 *Fecha:* ${fechaFormateada}\n` +
      `⏰ *Hora:* ${horaSeleccionada} hs\n` +
      `📞 *Contacto:* ${telefono || "No especificado"}`;

    // Codificamos el texto para que sea válido en una URL
    const urlWhatsApp = `https://wa.me/${1127873979}?text=${encodeURIComponent(mensajeWhatsApp)}`;
    
    // Abre WhatsApp en una nueva pestaña
    window.open(urlWhatsApp, "_blank");
  };

  // PANTALLA B: Formulario de Datos Personales
  if (pasoFormulario) {
    return (
      <div className="bg-white rounded-xl shadow-md max-w-md mx-auto border border-slate-100 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2 text-center">Datos de la Cita</h3>
        <p className="text-sm text-slate-500 text-center mb-6">
          Estás reservando para el <strong>{fechaSeleccionada?.toLocaleDateString("es-ES")}</strong> a las <strong>{horaSeleccionada} hs</strong>.
        </p>

        <form onSubmit={handleFinalizarReserva} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo *</label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej. Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Correo Electrónico *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono de Contacto</label>
            <input
              type="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej. +54 9 11 ..."
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPasoFormulario(false)}
              className="w-1/3"
            >
              Volver
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            >
              Confirmar y Enviar
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // PANTALLA A: Calendario y Horas (Lo que ya tenías)
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-center p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto border border-slate-100">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">1. Selecciona el día</h3>
        <Calendar
          mode="single"
          selected={fechaSeleccionada}
          onSelect={(date) => {
            setFechaSeleccionada(date);
            setHoraSeleccionada(null);
          }}
          locale={es}
          className="rounded-md border border-slate-200"
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </div>

      <div className="flex-1 w-full">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center md:text-left">2. Selecciona la hora</h3>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {HORARIOS_DISPONIBLES.map((hora) => (
            <Button
              key={hora}
              variant={horaSeleccionada === hora ? "default" : "outline"}
              className="w-full transition-all"
              onClick={() => setHoraSeleccionada(hora)}
            >
              {hora}
            </Button>
          ))}
        </div>

        {fechaSeleccionada && horaSeleccionada ? (
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4 text-sm text-slate-600">
            <p><strong>Día seleccionado:</strong> {fechaSeleccionada.toLocaleDateString("es-ES")}</p>
            <p><strong>Hora seleccionada:</strong> {horaSeleccionada} hs</p>
          </div>
        ) : (
          <p className="text-sm text-slate-400 text-center mb-4">Por favor, elige un día y una hora para continuar.</p>
        )}

        <Button
          onClick={() => setPasoFormulario(true)}
          disabled={!fechaSeleccionada || !horaSeleccionada}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-6"
        >
          Siguiente: Introducir Datos
        </Button>
      </div>
    </div>
  );
}