"use client";

import React from "react";
import { 
  Stethoscope, 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  MessageCircle, 
 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-orange-500/20">
      <div className="max-w-9xl mx-auto px-2 sm:px-6 lg:px-8 space-y-10">
        
        {/* FILA PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* COLUMNA 1: INFO DE LA MARCA (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Consultorio<span className="text-orange-500">Médico</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Brindamos atención de salud integral con profesionales capacitados y tecnología moderna para el cuidado de tu familia.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {/* <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-all text-slate-400">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-orange-500 hover:text-white flex items-center justify-center transition-all text-slate-400">
                <Facebook className="w-4 h-4" />
              </a> */}
              <a href="https://wa.me/1127873979" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all text-slate-400">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COLUMNA 2: ENLACES RÁPIDOS (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#inicio" className="hover:text-orange-400 transition-colors">Inicio</a></li>
              <li><a href="#servicios" className="hover:text-orange-400 transition-colors">Especialidades</a></li>
              <li><a href="#reserva" className="hover:text-orange-400 transition-colors">Reservar Turno</a></li>
              <li><a href="#preguntas" className="hover:text-orange-400 transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* COLUMNA 3: INFORMACIÓN DE CONTACTO (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Contacto
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Av. Principal 1234, Centro Medico, Piso 2</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span>+54 11 2787-3979</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                <span>contacto@consultorio.com</span>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: HORARIOS ATENCIÓN (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Horarios
            </h4>
            <div className="bg-slate-800/60 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-orange-400 font-semibold">
                <Clock className="w-4 h-4" />
                <span>Atención Presencial</span>
              </div>
              <p className="text-slate-300">Lunes a Viernes: 09:00 - 18:00 hs</p>
              <p className="text-slate-400">Sábados: 09:00 - 13:00 hs</p>
            </div>
          </div>

        </div>

        {/* PIE DE PÁGINA FINAL */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Consultorio Médico. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Política de Privacidad</a>
          </div>
        </div>

      </div>
    </footer>
  );
}