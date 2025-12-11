// libs/api/inventarioApi.ts
export async function getInventario() {
  const res = await fetch("/api/inventario");
  if (!res.ok) throw new Error("No se pudo obtener el inventario");
  return res.json();
}
