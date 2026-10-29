"use client";

import { useState } from "react";

export default function RestablecerContrasenaPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: new URLSearchParams(window.location.search).get("token") || "", password }),
      });
      const data = await response.json();
      if (!response.ok) setError(data.error || "No se pudo cambiar la contraseña.");
      else setMessage(data.message);
    } catch {
      setError("No pudimos conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-orange-50/50 flex items-center justify-center p-5">
      <form onSubmit={submit} className="w-full max-w-md bg-white rounded-2xl border border-orange-100 shadow-sm p-7 space-y-5">
        <div><p className="text-orange-500 font-black text-xl">TurnoYa</p><h1 className="text-2xl font-bold text-slate-800 mt-3">Crear contraseña nueva</h1><p className="text-sm text-slate-500 mt-2">Elegí una contraseña de al menos 8 caracteres.</p></div>
        <label className="block text-sm font-semibold text-slate-700">Nueva contraseña<input required minLength={8} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3" /></label>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        {message && <p role="status" className="text-sm text-emerald-700">{message} <a className="font-bold underline" href="/">Volver al inicio</a></p>}
        <button disabled={loading} className="w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 disabled:opacity-50">{loading ? "Guardando..." : "Cambiar contraseña"}</button>
      </form>
    </main>
  );
}
