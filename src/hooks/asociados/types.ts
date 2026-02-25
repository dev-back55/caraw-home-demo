
export interface Asociado {
  id: string;
  nombre: string;
  comercio: string;
  email: string;
  telefono: string;
  cuit: string;
  categoria: string;
  direccion: string;
  ingbrutos: string;
  catcuota: string; // Cambiar a string
  fechaIngreso: string;
  estado: string;
  deuda: number;
  ultimoPago: string;
}

export const categoriasDisponibles = [
  "Comercio",
  "Profesional",
  "Servicio"
];

export interface NuevoAsociadoForm {
  nombre: string;
  comercio: string;
  email: string;
  telefono: string;
  cuit: string;
  categoria: string;
  direccion: string;
  ingbrutos: string;
  catcuota: string; // Cambiar a string
}
