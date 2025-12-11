// app/api/inventario/route.ts
import { prisma } from "@/libs/prisma";

// GET: Obtener todos los organismos
export async function GET() {
  try {
    const organismos = await prisma.organismos.findMany({
      orderBy: { id: "asc" }, // opcional, orden por id
    });

    return new Response(JSON.stringify(organismos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener organismos:", error);
    return new Response(JSON.stringify({ error: "No se pudo obtener organismos" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST: Crear un organismo nuevo
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const nuevoOrganismo = await prisma.organismos.create({
      data: {
        nombre_comun: body.nombre_comun,
        nombre_cientifico: body.nombre_cientifico || "",
        tipo: body.tipo || "",
        fecha_ingreso: body.fecha_ingreso || new Date(),
        ubicacion: body.ubicacion || "",
        estado: body.estado || "germinacion",
      },
    });

    return new Response(JSON.stringify(nuevoOrganismo), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al crear organismo:", error);
    return new Response(JSON.stringify({ error: "No se pudo crear organismo" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
