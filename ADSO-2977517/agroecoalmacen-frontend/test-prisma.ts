import { prisma } from "./libs/prisma";

async function main() {
  console.log("=== Listando cuentas ===");
  const cuentas = await prisma.cuentas.findMany();
  console.log(cuentas);

  console.log("\n=== Listando organismos ===");
  const organismos = await prisma.organismos.findMany();
  console.log(organismos);

  // Ejemplo de inserción en organismos
  console.log("\n=== Insertando un organismo de prueba ===");
  const nuevoOrganismo = await prisma.organismos.create({
    data: {
      nombre_comun: "Planta Prueba",
      nombre_cientifico: "Planta Testus",
      tipo: "Herbácea",
      fecha_ingreso: new Date(),
      ubicacion: "Invernadero 1",
      estado: "germinacion",
    },
  });
  console.log(nuevoOrganismo);

  // Ejemplo de actualización
  console.log("\n=== Actualizando organismo insertado ===");
  const actualizado = await prisma.organismos.update({
    where: { id: nuevoOrganismo.id },
    data: { estado: "planta" },
  });
  console.log(actualizado);

  // Ejemplo de borrado
  console.log("\n=== Borrando organismo de prueba ===");
  const eliminado = await prisma.organismos.delete({
    where: { id: nuevoOrganismo.id },
  });
  console.log(eliminado);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
