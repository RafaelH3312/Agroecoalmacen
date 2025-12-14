export interface Organismo {
  id: number;
  nombre_comun: string;

  tipo: string;
  fecha_ingreso: string;
  ubicacion: string;
  estado: string;
  temp: number;
  luz: number;
  img: string;
}

// Función para normalizar datos del backend
export function createOrganismo(data: any): Organismo {
  return {
    id: data.id,
    nombre_comun: data.nombre_comun ?? "",
    tipo: data.tipo ?? "",
    fecha_ingreso: data.fecha_ingreso ?? "",
    ubicacion: data.ubicacion ?? "",
    estado: data.estado ?? "",
    temp: data.temp ?? 0,
    luz: data.luz ?? 0,
    img: data.img ?? "/assets/img.jpg",
  };
}
