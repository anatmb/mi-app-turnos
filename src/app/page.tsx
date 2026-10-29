// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }

// src/app/page.tsx
//  import AppointmentForm from "@/components/AppointmentForm";
//  import Navbar from "@/components/Navbar";
//  import Footer from "@/components/Footer";


// export default function Home() {
//   return (
//     <main className="min-h-screen bg-slate-50 py-12 px-4">
  
//        <Navbar/>
//        <AppointmentForm /> 
//        <Footer/>
   
//     </main>
//   );
// }

// "use client";

// import React, { useState } from "react";
// import AppointmentForm from "@/components/AppointmentForm";
// // import Dashboard from "@/components/dashboard"; // Asegúrate de importar tu componente de Dashboard
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function Home() {
//   // Estado para controlar qué vista mostrar
//   const [vistaActual, setVistaActual] = useState<"reserva" | "dashboard">("reserva");

//   return (
//     <div className="min-h-screen flex flex-col bg-slate-50">
//       {/* Pasamos el estado y la función para cambiarlo al Navbar */}
//       <Navbar vistaActual={vistaActual} setVistaActual={setVistaActual} />

//       {/* Contenido dinámico según la opción elegida */}
//       <main className="flex-1">
//         {vistaActual === "reserva" ? (
//           <AppointmentForm />
//         ) : (
//           <Dashboard />
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// }




// import AuthScreen from "@/components/AuthScreen";
// import Dashboard from "@/components/Dashboard"; // o el componente de tu dashboard

// export default function Home() {
//   const [estaAutenticado, setEstaAutenticado] = useState(false);
//   const [cargando, setCargando] = useState(true);

//   // Verificar si la doctora ya había iniciado sesión previamente
//   useEffect(() => {
//     const session = localStorage.getItem("doctor_session");
//     if (session) {
//       setEstaAutenticado(true);
//     }
//     setCargando(false);
//   }, []);

//   if (cargando) return null; // Previene parpadeos de pantalla mientras verifica

//   if (!estaAutenticado) {
//     return <AuthScreen onLoginSuccess={() => setEstaAutenticado(true)} />;
//   }

//   return <Dashboard />;
// }

"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppointmentForm from "@/components/AppointmentForm";
import AuthScreen from "@/components/AuthScreen";
import Dashboard from "@/components/dashboard";


export default function Home() {
  const [vistaActual, setVistaActual] = useState<"reserva" | "dashboard">("reserva");

  // Inicialización directa sin useEffect
  const [estaAutenticado, setEstaAutenticado] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("doctor_session");
    }
    return false;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar vistaActual={vistaActual} setVistaActual={setVistaActual} />

      <main className="flex-1">
        {vistaActual === "reserva" ? (
          <AppointmentForm />
        ) : estaAutenticado ? (
          <Dashboard />
        ) : (
          <AuthScreen onLoginSuccess={() => setEstaAutenticado(true)} />
        )}
      </main>

      <Footer />
    </div>
  );
}