// libs/api/inventarioApi.ts

export interface Organismo {
  id: number;
  nombre_comun: string;
  nombre_cientifico?: string;
  tipo?: string;
  fecha_ingreso?: string;
  ubicacion?: string;
  estado?: string;
  img?: string;
  temp?: string;
  luz?: string;
}

// URL base del backend Spring Boot
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

// GET: obtener todos los organismos
export async function getInventario(): Promise<Organismo[]> {
  const res = await fetch(`${BASE_URL}/inventario`, { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo obtener el inventario");
  return res.json();
}

// POST: crear un organismo nuevo
export async function crearOrganismo(data: Partial<Organismo>): Promise<Organismo> {
  const res = await fetch(`${BASE_URL}/inventario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("No se pudo crear el organismo");
  return res.json();
}

// PUT: actualizar un organismo existente
export async function actualizarOrganismo(data: Organismo): Promise<Organismo> {
  const res = await fetch(`${BASE_URL}/inventario`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("No se pudo actualizar el organismo");
  return res.json();
}

// DELETE: eliminar un organismo por id
export async function eliminarOrganismo(id: number): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/inventario?id=${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("No se pudo eliminar el organismo");
  return res.json();
}
