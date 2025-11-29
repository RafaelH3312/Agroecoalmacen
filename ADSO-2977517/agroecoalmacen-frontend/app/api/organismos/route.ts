import { prisma } from "@/libs/prisma";

export async function GET() {
  try {
    const organismos = await prisma.organismos.findMany();
    return new Response(JSON.stringify(organismos), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Error al obtener organismos" }), { status: 500 });
  }
}
