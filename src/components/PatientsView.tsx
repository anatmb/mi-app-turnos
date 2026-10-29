"use client";

import { FormEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileMedical, faPlus, faSearch, faSpinner, faTrashAlt, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";

type Appointment = { id: string; dateTime: string; status: string };
type Patient = { id: string; nombre: string; dni: string; email?: string | null; telefono?: string | null; tieneObraSocial: boolean; obraSocial?: string | null; appointments: Appointment[] };
type Expediente = { id: string; titulo: string; notas?: string | null; createdAt: string };
const blankForm = { dni: "", nombre: "", email: "", telefono: "", tieneObraSocial: false, obraSocial: "" };

export default function PatientsView() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState<Patient | null>(null);
  const [form, setForm] = useState(blankForm);
  const [selected, setSelected] = useState<Patient | null>(null);
  const [records, setRecords] = useState<Expediente[]>([]);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const loadPatients = async () => {
    try {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error();
      setPatients(await response.json());
    } catch {
      alert("No se pudieron cargar los pacientes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => { void loadPatients(); }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const openEdit = (patient: Patient) => {
    setEditing(patient);
    setForm({ dni: patient.dni, nombre: patient.nombre, email: patient.email ?? "", telefono: patient.telefono ?? "", tieneObraSocial: patient.tieneObraSocial, obraSocial: patient.obraSocial ?? "" });
  };

  const savePatient = async (event: FormEvent) => {
    event.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/users/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "No se pudo modificar el paciente.");
      setPatients((current) => current.map((patient) => patient.id === data.id ? data : patient));
      setEditing(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : "No se pudo modificar el paciente.");
    } finally { setSaving(false); }
  };

  const deactivate = async (patient: Patient) => {
    if (!window.confirm(`¿Dar de baja a ${patient.nombre}? Su historial se conservará.`)) return;
    try {
      const response = await fetch(`/api/users/${patient.id}`, { method: "DELETE" });
      if (!response.ok) throw new Error();
      setPatients((current) => current.filter((item) => item.id !== patient.id));
      if (selected?.id === patient.id) setSelected(null);
    } catch { alert("No se pudo dar de baja al paciente."); }
  };

  const openRecord = async (patient: Patient) => {
    setSelected(patient); setRecords([]); setTitle(""); setNotes(""); setLoadingRecords(true);
    try {
      const response = await fetch(`/api/users/${patient.id}/expedientes`);
      if (!response.ok) throw new Error();
      setRecords(await response.json());
    } catch { alert("No se pudo cargar el expediente."); }
    finally { setLoadingRecords(false); }
  };

  const addRecord = async (event: FormEvent) => {
    event.preventDefault();
    if (!selected || !title.trim()) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/users/${selected.id}/expedientes`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ titulo: title, notas: notes }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "No se pudo guardar la nota.");
      setRecords((current) => [data, ...current]); setTitle(""); setNotes("");
    } catch (error) { alert(error instanceof Error ? error.message : "No se pudo guardar la nota."); }
    finally { setSaving(false); }
  };

  const filtered = patients.filter((patient) => patient.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || patient.dni.includes(searchTerm));

  return <div className="space-y-6">
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h2 className="text-lg font-bold text-slate-800">Pacientes</h2><p className="text-xs text-slate-400 mt-1">Modificá datos, consultá el expediente o realizá una baja recuperable.</p></div>
        <div className="relative w-full sm:w-72"><FontAwesomeIcon icon={faSearch} className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar por nombre o DNI..." className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-orange-500/20" /></div>
      </div>
      <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-400"><tr><th className="px-5 py-3">Paciente</th><th className="px-5 py-3">Contacto</th><th className="px-5 py-3">Turnos</th><th className="px-5 py-3 text-right">Acciones</th></tr></thead><tbody className="divide-y divide-slate-100">
        {loading ? <tr><td colSpan={4} className="px-5 py-10 text-center text-sm text-slate-400"><FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />Cargando pacientes...</td></tr> : filtered.length === 0 ? <tr><td colSpan={4} className="px-5 py-10 text-center text-sm text-slate-400">No se encontraron pacientes.</td></tr> : filtered.map((patient) => <tr key={patient.id} className="hover:bg-slate-50/70"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"><FontAwesomeIcon icon={faUser} /></span><div><p className="text-sm font-bold text-slate-800">{patient.nombre}</p><p className="text-xs text-slate-400">DNI: {patient.dni}</p></div></div></td><td className="px-5 py-4 text-xs text-slate-600"><p>{patient.telefono || "Sin teléfono"}</p><p className="text-slate-400 mt-1">{patient.email || "Sin email"}</p><p className="text-slate-500 mt-1">{patient.tieneObraSocial ? `Obra social: ${patient.obraSocial || "Sin especificar"}` : "Sin obra social"}</p></td><td className="px-5 py-4"><span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">{patient.appointments.length} registrados</span></td><td className="px-5 py-4"><div className="flex justify-end gap-2"><button onClick={() => openEdit(patient)} className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100"><FontAwesomeIcon icon={faEdit} className="mr-1.5" />Modificar</button><button onClick={() => void openRecord(patient)} className="px-3 py-2 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold hover:bg-orange-100"><FontAwesomeIcon icon={faFileMedical} className="mr-1.5" />Expediente</button><button onClick={() => void deactivate(patient)} className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100" title="Dar de baja"><FontAwesomeIcon icon={faTrashAlt} /></button></div></td></tr>)}
      </tbody></table></div>
    </section>

    {editing && <div className="fixed inset-0 z-50 bg-slate-950/40 p-4 flex items-center justify-center"><form onSubmit={savePatient} className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-4"><div className="flex justify-between items-center"><h2 className="font-bold text-slate-800">Modificar paciente</h2><button type="button" onClick={() => setEditing(null)} className="text-slate-400 hover:text-slate-700"><FontAwesomeIcon icon={faXmark} /></button></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><input required placeholder="Nombre completo" value={form.nombre} onChange={(event) => setForm({ ...form, nombre: event.target.value })} className="rounded-xl border border-slate-200 p-3 text-sm" /><input required placeholder="DNI" value={form.dni} onChange={(event) => setForm({ ...form, dni: event.target.value })} className="rounded-xl border border-slate-200 p-3 text-sm" /><input type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="rounded-xl border border-slate-200 p-3 text-sm" /><input placeholder="Teléfono" value={form.telefono} onChange={(event) => setForm({ ...form, telefono: event.target.value })} className="rounded-xl border border-slate-200 p-3 text-sm" /></div><label className="flex gap-2 items-center text-sm font-medium text-slate-700"><input type="checkbox" checked={form.tieneObraSocial} onChange={(event) => setForm({ ...form, tieneObraSocial: event.target.checked })} className="accent-orange-500" />Tiene obra social o prepaga</label>{form.tieneObraSocial && <input placeholder="Nombre de la obra social o prepaga" value={form.obraSocial} onChange={(event) => setForm({ ...form, obraSocial: event.target.value })} className="w-full rounded-xl border border-slate-200 p-3 text-sm" />}<button disabled={saving} className="w-full rounded-xl bg-emerald-600 text-white font-bold py-3 text-sm disabled:opacity-50">{saving ? "Guardando..." : "Guardar cambios"}</button></form></div>}

    {selected && <div className="fixed inset-0 z-50 bg-slate-950/40 p-4 overflow-y-auto"><section className="w-full max-w-3xl mx-auto my-8 bg-white rounded-2xl shadow-xl p-6 space-y-6"><div className="flex justify-between gap-4"><div><h2 className="text-xl font-bold text-slate-800">Expediente de {selected.nombre}</h2><p className="text-xs text-slate-400 mt-1">DNI: {selected.dni}</p></div><button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700"><FontAwesomeIcon icon={faXmark} /></button></div><form onSubmit={addRecord} className="rounded-xl border border-orange-100 bg-orange-50/50 p-4 space-y-3"><h3 className="text-sm font-bold text-slate-800"><FontAwesomeIcon icon={faPlus} className="text-orange-500 mr-2" />Agregar nota al expediente</h3><input required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Título, por ejemplo: Consulta de control" className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm" /><textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Observaciones clínicas" rows={3} className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm resize-y" /><button disabled={saving} className="rounded-xl bg-orange-500 text-white font-bold px-4 py-2.5 text-sm disabled:opacity-50">Guardar nota</button></form><div className="space-y-3"><h3 className="font-bold text-slate-800">Historial del expediente</h3>{loadingRecords ? <p className="text-sm text-slate-400">Cargando expediente...</p> : records.length === 0 ? <p className="text-sm text-slate-400">Todavía no hay notas ni estudios cargados.</p> : records.map((record) => <article key={record.id} className="border border-slate-200 rounded-xl p-4"><div className="flex justify-between gap-3"><h4 className="font-bold text-slate-800 text-sm">{record.titulo}</h4><time className="text-[11px] text-slate-400 shrink-0">{new Date(record.createdAt).toLocaleDateString("es-AR")}</time></div>{record.notas && <p className="text-sm text-slate-600 whitespace-pre-wrap mt-2">{record.notas}</p>}</article>)}</div></section></div>}
  </div>;
}
