// "use client";

// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { 
//   faCalendarAlt, 
//   faCommentDots, 
//   faBolt, 
//   faUserMd, 
//   faEnvelope, 
//   faLock, 
//   faUser, 
//   faPhone, 
//   faStethoscope,
//   faEye,
//   faEyeSlash,
//   faArrowRight
// } from "@fortawesome/free-solid-svg-icons";

// interface AuthProps {
//   onLoginSuccess: () => void;
// }

// export default function AuthScreen({ onLoginSuccess }: AuthProps) {
//   const [esRegistro, setEsRegistro] = useState(false);
//   const [mostrarPassword, setMostrarPassword] = useState(false);

//   // Estados del formulario
//   const [formData, setFormData] = useState({
//     nombre: "",
//     apellido: "",
//     email: "",
//     telefono: "",
//     especialidad: "",
//     password: "",
//     confirmPassword: ""
//   });

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     // Aquí conectarías con tu backend / Neon Database / NextAuth
// //     // Por ahora simulamos la entrada exitosa al dashboard:
// //     onLoginSuccess();
// //   };


// const [errorMsg, setErrorMsg] = useState("");
// const [cargando, setCargando] = useState(false);

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setErrorMsg("");
//   setCargando(true);

//   const endpoint = esRegistro ? "/api/auth/register" : "/api/auth/login";

//   try {
//     const res = await fetch(endpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setErrorMsg(data.error || "Ocurrió un error");
//       setCargando(false);
//       return;
//     }

//     if (esRegistro) {
//       // Si se registró con éxito, cambiamos a vista de login para que ingrese
//       setEsRegistro(false);
//       alert("Cuenta creada con éxito. Ahora inicia sesión.");
//     } else {
//       // Login correcto -> Guardar sesión y entrar al Dashboard
//       localStorage.setItem("doctor_session", JSON.stringify(data.doctor));
//       onLoginSuccess();
//     }
//   } catch (err) {
//     setErrorMsg("Error de conexión con el servidor");
//   } finally {
//     setCargando(false);
//   }
// };
//   return (
//     <div className="flex min-h-screen bg-[#0e111a] text-slate-200">
      
//       {/* ------------------------------------------------------------- */}
//       {/* COLUMNA IZQUIERDA (PANEL OSCURO / BRANDING Y BENEFICIOS) */}
//       {/* ------------------------------------------------------------- */}
//       <div className="hidden lg:flex lg:w-5/12 bg-linear-to-r from-[#121624] via-[#161c2e] to-[#0e111a] p-12 flex-col justify-between border-r border-slate-800/60 relative overflow-hidden">
        
//         {/* Glow de fondo tenue */}
//         <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

//         <div className="relative z-10 space-y-8">
//           {/* BADGE SUPERIOR */}
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
//             <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
//             PRO 14 DÍAS GRATIS
//           </div>

//           {/* TÍTULO PRINCIPAL */}
//           <div className="space-y-2">
//             <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
//               Tu agenda, <br />
//               <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500 italic">
//                 sin el caos.
//               </span>
//             </h1>
//             <p className="text-slate-400 text-sm max-w-md pt-2">
//               Plataforma exclusiva de gestión de turnos e historial para profesionales de la salud. Sin configuraciones complejas.
//             </p>
//           </div>

//           {/* TARJETAS DE CARACTERÍSTICAS */}
//           <div className="space-y-3 pt-4">
//             <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm flex items-center gap-4">
//               <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
//                 <FontAwesomeIcon icon={faCalendarAlt} className="w-5 h-5" />
//               </div>
//               <div>
//                 <h4 className="font-bold text-white text-sm">Agenda online 24/7</h4>
//                 <p className="text-xs text-slate-400">Tus pacientes reservan sin interrumpir tus consultas.</p>
//               </div>
//             </div>

//             <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm flex items-center gap-4">
//               <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
//                 <FontAwesomeIcon icon={faCommentDots} className="w-5 h-5" />
//               </div>
//               <div>
//                 <h4 className="font-bold text-white text-sm">Recordatorios por WhatsApp</h4>
//                 <p className="text-xs text-slate-400">Reduce ausencias hasta un 60% de forma automática.</p>
//               </div>
//             </div>

//             <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm flex items-center gap-4">
//               <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
//                 <FontAwesomeIcon icon={faBolt} className="w-5 h-5" />
//               </div>
//               <div>
//                 <h4 className="font-bold text-white text-sm">Listo en 5 minutos</h4>
//                 <p className="text-xs text-slate-400">Configuración guiada al instante sin tecnicismos.</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* PRUEBA SOCIAL / FOOTER IZQUIERDO */}
//         <div className="relative z-10 pt-8 border-t border-slate-800/60 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="flex -space-x-2">
//               <div className="w-8 h-8 rounded-full bg-linear-to-r from-orange-400 to-rose-400 border-2 border-slate-900 text-[10px] font-bold flex items-center justify-center text-white">ML</div>
//               <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-400 to-indigo-400 border-2 border-slate-900 text-[10px] font-bold flex items-center justify-center text-white">CR</div>
//               <div className="w-8 h-8 rounded-full bg-linear-to-r from-emerald-400 to-teal-400 border-2 border-slate-900 text-[10px] font-bold flex items-center justify-center text-white">JP</div>
//             </div>
//             <div>
//               <p className="text-xs font-bold text-white">+5.000 Médicos activos</p>
//               <p className="text-[11px] text-slate-400">Unidos este mes</p>
//             </div>
//           </div>
//           <span className="text-amber-400 text-xs">★★★★★</span>
//         </div>

//       </div>


//       {/* ------------------------------------------------------------- */}
//       {/* COLUMNA DERECHA (FORMULARIO DE ACCESO PROFESIONAL) */}
//       {/* ------------------------------------------------------------- */}
//       <div className="w-full lg:w-7/12 bg-white text-slate-800 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
//         <div className="w-full max-w-lg space-y-6">
          
//           {/* HEADER FORMULARIO */}
//           <div className="text-center sm:text-left space-y-2">
//             <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
//               <span className="w-3 h-3 rounded-full bg-orange-500"></span>
//               <span className="text-2xl font-black text-slate-900 tracking-tight">TurnoYa</span>
//             </div>
//             <h2 className="text-2xl font-black text-slate-900">
//               {esRegistro ? "Crear cuenta médica" : "Iniciar sesión médica"}
//             </h2>
//             <p className="text-xs text-slate-500">
//               {esRegistro 
//                 ? "Completa tus datos para comenzar a gestionar tu agenda." 
//                 : "Ingresa tus credenciales para acceder a tu panel de control."}
//             </p>
//           </div>

//           {/* TIPO DE CUENTA (FIJADO EN MÉDICO/INDIVIDUAL) */}
//           <div className="space-y-1.5">
//             <label className="text-xs font-bold text-slate-700">Tipo de cuenta</label>
//             <div className="grid grid-cols-1 gap-3">
//               <div className="p-3.5 rounded-xl border-2 border-orange-500 bg-orange-50/50 flex items-center justify-between cursor-default">
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
//                     <FontAwesomeIcon icon={faUserMd} className="w-4 h-4" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-slate-800 text-xs">Médico / Profesional Individual</p>
//                     <p className="text-[10px] text-slate-500">Acceso exclusivo a consultorio personal</p>
//                   </div>
//                 </div>
//                 <span className="text-orange-500 font-bold text-sm">✓</span>
//               </div>
//             </div>
//           </div>

//           {/* FORMULARIO */}
//           <form onSubmit={handleSubmit} className="space-y-4">
            
//             {/* CAMPOS SOLO PARA REGISTRO */}
//             {esRegistro && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-slate-700">Nombre *</label>
//                   <div className="relative">
//                     <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
//                     <input
//                       type="text"
//                       required
//                       placeholder="Dra. María"
//                       className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-800"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-slate-700">Apellido *</label>
//                   <div className="relative">
//                     <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
//                     <input
//                       type="text"
//                       required
//                       placeholder="López"
//                       className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-800"
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* EMAIL */}
//             <div className="space-y-1">
//               <label className="text-xs font-bold text-slate-700">Email profesional *</label>
//               <div className="relative">
//                 <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
//                 <input
//                   type="email"
//                   required
//                   placeholder="dra.lopez@ejemplo.com"
//                   className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-800"
//                 />
//               </div>
//             </div>

//             {/* CAMPOS ADICIONALES PARA REGISTRO */}
//             {esRegistro && (
//               <>
//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-slate-700">Teléfono / WhatsApp *</label>
//                   <div className="relative">
//                     <FontAwesomeIcon icon={faPhone} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
//                     <input
//                       type="tel"
//                       required
//                       placeholder="+54 9 11 1234-5678"
//                       className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-800"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-1">
//                   <label className="text-xs font-bold text-slate-700">Especialidad / Rubro</label>
//                   <div className="relative">
//                     <FontAwesomeIcon icon={faStethoscope} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
//                     <select className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-700 appearance-none">
//                       <option value="medicina-general">Medicina Generalista</option>
//                       <option value="pediatria">Pediatría</option>
//                       <option value="odontologia">Odontología</option>
//                       <option value="dermatologia">Dermatología</option>
//                       <option value="otra">Otra Especialidad</option>
//                     </select>
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* CONTRASEÑA */}
//             <div className="space-y-1">
//               <label className="text-xs font-bold text-slate-700">Contraseña *</label>
//               <div className="relative">
//                 <FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
//                 <input
//                   type={mostrarPassword ? "text" : "password"}
//                   required
//                   placeholder="Mínimo 8 caracteres"
//                   className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-800"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setMostrarPassword(!mostrarPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
//                 >
//                   <FontAwesomeIcon icon={mostrarPassword ? faEyeSlash : faEye} className="w-3.5 h-3.5" />
//                 </button>
//               </div>
//             </div>

//             {/* REPETIR CONTRASEÑA SI REGISTRO */}
//             {esRegistro && (
//               <div className="space-y-1">
//                 <label className="text-xs font-bold text-slate-700">Repetir contraseña *</label>
//                 <div className="relative">
//                   <FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
//                   <input
//                     type="password"
//                     required
//                     placeholder="Repetí tu contraseña"
//                     className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-800"
//                   />
//                 </div>
//               </div>
//             )}

//             {/* BOTÓN SUBMIT */}
//             <button
//               type="submit"
//               className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 mt-2"
//             >
//               <span>{esRegistro ? "Crear mi cuenta médica" : "Entrar al Dashboard"}</span>
//               <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
//             </button>
//           </form>

//           {/* TOGGLE ENTRE LOGIN Y REGISTRO */}
//           <div className="text-center pt-2 border-t border-slate-100">
//             <p className="text-xs text-slate-500">
//               {esRegistro ? "¿Ya tienes una cuenta?" : "¿Aún no tienes cuenta médica?"}{" "}
//               <button
//                 onClick={() => setEsRegistro(!esRegistro)}
//                 className="font-bold text-orange-500 hover:underline"
//               >
//                 {esRegistro ? "Iniciar Sesión" : "Registrarme"}
//               </button>
//             </p>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCalendarAlt, 
  faCommentDots, 
  faBolt, 
  faUserMd, 
  faEnvelope, 
  faLock, 
  faUser, 
  faPhone, 
  faStethoscope,
  faEye,
  faEyeSlash,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";

interface AuthProps {
  onLoginSuccess: () => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthProps) {
  const [esRegistro, setEsRegistro] = useState(false);
  const [olvidoPassword, setOlvidoPassword] = useState(false);
  const [mensajeRecuperacion, setMensajeRecuperacion] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [cargando, setCargando] = useState(false);

  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    especialidad: "medicina-general",
    password: "",
    confirmPassword: ""
  });

  // Manejador para actualizar el estado cuando el usuario escribe
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validar coincidencia de contraseñas si es registro
    if (esRegistro && formData.password !== formData.confirmPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    setCargando(true);
    const endpoint = esRegistro ? "/api/auth/register" : "/api/auth/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Ocurrió un error al procesar la solicitud");
        setCargando(false);
        return;
      }

      if (esRegistro) {
        setEsRegistro(false);
        alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
      } else {
        localStorage.setItem("doctor_session", JSON.stringify(data.doctor));
        onLoginSuccess();
      }
    } catch (err) {
  console.error("Error en la solicitud:", err); // <--- Usas la variable aquí
  setErrorMsg("Error de conexión con el servidor");
    } finally {
      setCargando(false);
    }
  };

  const solicitarRecuperacion = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setMensajeRecuperacion("");
    setCargando(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (!res.ok) setErrorMsg(data.error || "No pudimos enviar el enlace.");
      else setMensajeRecuperacion(data.message);
    } catch {
      setErrorMsg("Error de conexión con el servidor");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0e111a] text-slate-200">
      
      {/* COLUMNA IZQUIERDA (PANEL OSCURO) */}
      <div className="hidden lg:flex lg:w-5/12 bg-linear-to-r from-[#121624] via-[#161c2e] to-[#0e111a] p-12 flex-col justify-between border-r border-slate-800/60 relative overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            PRO 14 DÍAS GRATIS
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
              Tu agenda, <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500 italic">
                sin el caos.
              </span>
            </h1>
            <p className="text-slate-400 text-sm max-w-md pt-2">
              Plataforma exclusiva de gestión de turnos e historial para profesionales de la salud. Sin configuraciones complejas.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faCalendarAlt} className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Agenda online 24/7</h4>
                <p className="text-xs text-slate-400">Tus pacientes reservan sin interrumpir tus consultas.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faCommentDots} className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Recordatorios por WhatsApp</h4>
                <p className="text-xs text-slate-400">Reduce ausencias hasta un 60% de forma automática.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <FontAwesomeIcon icon={faBolt} className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Listo en 5 minutos</h4>
                <p className="text-xs text-slate-400">Configuración guiada al instante sin tecnicismos.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-orange-400 to-rose-400 border-2 border-slate-900 text-[10px] font-bold flex items-center justify-center text-white">ML</div>
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-blue-400 to-indigo-400 border-2 border-slate-900 text-[10px] font-bold flex items-center justify-center text-white">CR</div>
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-emerald-400 to-teal-400 border-2 border-slate-900 text-[10px] font-bold flex items-center justify-center text-white">JP</div>
            </div>
            <div>
              <p className="text-xs font-bold text-white">+5.000 Médicos activos</p>
              <p className="text-[11px] text-slate-400">Unidos este mes</p>
            </div>
          </div>
          <span className="text-amber-400 text-xs">★★★★★</span>
        </div>
      </div>

      {/* COLUMNA DERECHA (FORMULARIO) */}
      <div className="w-full lg:w-7/12 bg-white text-slate-800 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-lg space-y-6">
          
          <div className="text-center sm:text-left space-y-2">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span className="text-2xl font-black text-slate-900 tracking-tight">TurnoYa</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              {olvidoPassword ? "Recuperar contraseña" : esRegistro ? "Crear cuenta médica" : "Iniciar sesión médica"}
            </h2>
            {!olvidoPassword && <p className="text-xs text-slate-500">
              {esRegistro 
                ? "Completa tus datos para comenzar a gestionar tu agenda." 
                : "Ingresa tus credenciales para acceder a tu panel de control."}
            </p>}
          </div>

          {/* MENSAJE DE ERROR */}
          {errorMsg && (
            <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl font-medium">
              ⚠️ {errorMsg}
            </div>
          )}

          {!olvidoPassword && <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Tipo de cuenta</label>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3.5 rounded-xl border-2 border-orange-500 bg-orange-50/50 flex items-center justify-between cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                    <FontAwesomeIcon icon={faUserMd} className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-xs">Médico / Profesional Individual</p>
                    <p className="text-[10px] text-slate-500">Acceso exclusivo a consultorio personal</p>
                  </div>
                </div>
                <span className="text-orange-500 font-bold text-sm">✓</span>
              </div>
            </div>
          </div>}

          {olvidoPassword ? (
            <form onSubmit={solicitarRecuperacion} className="space-y-4">
              <p className="text-sm text-slate-600">Ingresá tu correo profesional y te enviaremos un enlace seguro para cambiarla.</p>
              <label className="block text-xs font-bold text-slate-700">Email profesional
                <input type="email" required value={formData.email} onChange={handleChange} name="email" placeholder="dra.lopez@ejemplo.com" className="mt-2 w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-500" />
              </label>
              {mensajeRecuperacion && <p role="status" className="text-sm text-emerald-700">{mensajeRecuperacion}</p>}
              <button disabled={cargando} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl disabled:opacity-50">{cargando ? "Enviando..." : "Enviar enlace"}</button>
              <button type="button" onClick={() => { setOlvidoPassword(false); setErrorMsg(""); }} className="w-full text-sm font-semibold text-orange-600 hover:underline">Volver a iniciar sesión</button>
            </form>
          ) : <form onSubmit={handleSubmit} className="space-y-4">
            
            {esRegistro && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Nombre *</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Dra. María"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Apellido *</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faUser} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                      placeholder="López"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-800"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email profesional *</label>
              <div className="relative">
                <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="dra.lopez@ejemplo.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-800"
                />
              </div>
            </div>

            {!esRegistro && <button type="button" onClick={() => { setOlvidoPassword(true); setErrorMsg(""); setMensajeRecuperacion(""); }} className="text-xs font-semibold text-orange-600 hover:underline">¿Olvidaste tu contraseña?</button>}

            {esRegistro && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Teléfono / WhatsApp *</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faPhone} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder="+54 9 11 1234-5678"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Especialidad / Rubro</label>
                  <div className="relative">
                    <FontAwesomeIcon icon={faStethoscope} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select 
                      name="especialidad"
                      value={formData.especialidad}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-700 appearance-none"
                    >
                      <option value="medicina-general">Medicina Generalista</option>
                      <option value="pediatria">Pediatría</option>
                      <option value="odontologia">Odontología</option>
                      <option value="dermatologia">Dermatología</option>
                      <option value="otra">Otra Especialidad</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* CONTRASEÑA */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Contraseña *</label>
              <div className="relative">
                <FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={mostrarPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Mínimo 8 caracteres"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setMostrarPassword(!mostrarPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <FontAwesomeIcon icon={mostrarPassword ? faEyeSlash : faEye} className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* REPETIR CONTRASEÑA SI REGISTRO */}
            {esRegistro && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Repetir contraseña *</label>
                <div className="relative">
                  <FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Repetí tu contraseña"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-slate-800"
                  />
                </div>
              </div>
            )}

            {/* BOTÓN SUBMIT */}
            <button
              type="submit"
              disabled={cargando}
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              <span>
                {cargando 
                  ? "Procesando..." 
                  : esRegistro 
                    ? "Crear mi cuenta médica" 
                    : "Entrar al Dashboard"}
              </span>
              <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />
            </button>
          </form>}

          {/* TOGGLE ENTRE LOGIN Y REGISTRO */}
          {!olvidoPassword && <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              {esRegistro ? "¿Ya tienes una cuenta?" : "¿Aún no tienes cuenta médica?"}{" "}
              <button
                onClick={() => {
                  setEsRegistro(!esRegistro);
                  setErrorMsg("");
                }}
                className="font-bold text-orange-500 hover:underline"
              >
                {esRegistro ? "Iniciar Sesión" : "Registrarme"}
              </button>
            </p>
          </div>}

        </div>
      </div>

    </div>
  );
}
