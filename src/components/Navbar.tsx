// "use client";

// import React, { useState } from "react";
// import { Stethoscope, Calendar, Phone, Info, Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [menuAbierto, setMenuAbierto] = useState(false);

//   return (
//     <nav className="w-full bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
          
//           {/* LOGO Y MARCA */}
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
//               <Stethoscope className="w-6 h-6" />
//             </div>
//             <div>
//               <span className="text-xl font-extrabold text-slate-800 tracking-tight block leading-none">
//                 Consultorio<span className="text-orange-500">Médico</span>
//               </span>
//               <span className="text-xs text-slate-400 font-medium">Atención Especializada</span>
//             </div>
//           </div>

//           {/* ENLACES ESCRITORIO */}
//           <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
//             <a href="#inicio" className="hover:text-orange-500 transition-colors">Inicio</a>
//             <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
//             <a href="#especialistas" className="hover:text-orange-500 transition-colors">Especialistas</a>
//             <a href="#contacto" className="hover:text-orange-500 transition-colors">Contacto</a>
//           </div>

//           {/* BOTÓN ACCIÓN ESCRITORIO */}
//           <div className="hidden md:flex items-center gap-3">
//             <a
//               href="#reserva"
//               className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
//             >
//               <Calendar className="w-4 h-4" />
//               Agendar Turno
//             </a>

//               <a
//               href="#reserva"
//               className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02]"
//             >
//               <Calendar className="w-4 h-4" />
//               Dashboard
//             </a>
//           </div>


//           {/* BOTÓN MENÚ MÓVIL */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setMenuAbierto(!menuAbierto)}
//               className="p-2 rounded-xl bg-orange-50 text-orange-600 focus:outline-none"
//               aria-label="Abrir menú"
//             >
//               {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* MENÚ DESPLEGABLE MÓVIL */}
//       {menuAbierto && (
//         <div className="md:hidden bg-white border-b border-orange-100 px-4 pt-2 pb-6 space-y-3">
//           <a
//             href="#inicio"
//             onClick={() => setMenuAbierto(false)}
//             className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-medium text-sm"
//           >
//             Inicio
//           </a>
//           <a
//             href="#servicios"
//             onClick={() => setMenuAbierto(false)}
//             className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-medium text-sm"
//           >
//             Servicios
//           </a>
//           <a
//             href="#especialistas"
//             onClick={() => setMenuAbierto(false)}
//             className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-medium text-sm"
//           >
//             Especialistas
//           </a>
//           <a
//             href="#contacto"
//             onClick={() => setMenuAbierto(false)}
//             className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-medium text-sm"
//           >
//             Contacto
//           </a>
//           <div className="pt-2">
//             <a
//               href="#reserva"
//               onClick={() => setMenuAbierto(false)}
//               className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm py-3 rounded-xl shadow-md shadow-orange-500/20"
//             >
//               <Calendar className="w-4 h-4" />
//               Agendar Turno
//             </a>
//                 <a
//               href="#reserva"
//               onClick={() => setMenuAbierto(false)}
//               className="flex items-center justify-center gap-2 w-full bg-orange-200 hover:bg-orange-600 text-white font-bold text-sm py-3 rounded-xl shadow-md shadow-orange-500/20"
//             >
//               <Calendar className="w-4 h-4" />
//               Dashboard
//             </a>
//           </div>
      
//         </div>
//       )}
//     </nav>
//   );
// }

"use client";

import React, { useState } from "react";
import { Stethoscope, Calendar, LayoutDashboard, Menu, X } from "lucide-react";

// Definimos las Props que recibe el Navbar
interface NavbarProps {
  vistaActual: "reserva" | "dashboard";
  setVistaActual: (vista: "reserva" | "dashboard") => void;
}

export default function Navbar({ vistaActual, setVistaActual }: NavbarProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-9xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO Y MARCA */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setVistaActual("reserva")}
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-800 tracking-tight block leading-none">
                Consultorio<span className="text-orange-500">Médico</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">Atención Especializada</span>
            </div>
          </div>

          {/* ENLACES ESCRITORIO */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#inicio" className="hover:text-orange-500 transition-colors">Inicio</a>
            <a href="#servicios" className="hover:text-orange-500 transition-colors">Servicios</a>
            <a href="#especialistas" className="hover:text-orange-500 transition-colors">Especialistas</a>
            <a href="#contacto" className="hover:text-orange-500 transition-colors">Contacto</a>
          </div>

          {/* BOTONES DE ACCIÓN ESCRITORIO */}
          <div className="hidden md:flex items-center gap-3">
            {/* Botón Agendar Turno */}
            <button
              onClick={() => setVistaActual("reserva")}
              className={`inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all ${
                vistaActual === "reserva"
                  ? "bg-orange-500 text-white shadow-orange-500/20"
                  : "bg-orange-50 text-orange-600 hover:bg-orange-100"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Agendar Turno
            </button>

            {/* Botón Dashboard */}
            <button
              onClick={() => setVistaActual("dashboard")}
              className={`inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all ${
                vistaActual === "dashboard"
                  ? "bg-orange-500 text-white shadow-orange-500/20"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
          </div>

          {/* BOTÓN MENÚ MÓVIL */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="p-2 rounded-xl bg-orange-50 text-orange-600 focus:outline-none"
              aria-label="Abrir menú"
            >
              {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {menuAbierto && (
        <div className="md:hidden bg-white border-b border-orange-100 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#inicio"
            onClick={() => setMenuAbierto(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-medium text-sm"
          >
            Inicio
          </a>
          <a
            href="#servicios"
            onClick={() => setMenuAbierto(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-orange-50 hover:text-orange-600 font-medium text-sm"
          >
            Servicios
          </a>

          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setVistaActual("reserva");
                setMenuAbierto(false);
              }}
              className={`flex items-center justify-center gap-2 w-full font-bold text-sm py-3 rounded-xl shadow-md ${
                vistaActual === "reserva"
                  ? "bg-orange-500 text-white shadow-orange-500/20"
                  : "bg-orange-50 text-orange-600"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Agendar Turno
            </button>

            <button
              onClick={() => {
                setVistaActual("dashboard");
                setMenuAbierto(false);
              }}
              className={`flex items-center justify-center gap-2 w-full font-bold text-sm py-3 rounded-xl shadow-md ${
                vistaActual === "dashboard"
                  ? "bg-orange-500 text-white shadow-orange-500/20"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}