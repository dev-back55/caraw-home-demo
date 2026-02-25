
import { useState, useMemo } from "react";

// Recibe cuota del backend con asociado embebido
export interface SupabaseCuota {
  id: string;
  asociado_id: string;
  asociado: {
    nombre: string;
    comercio?: string | null;
  };
  periodo: string;
  monto: number;
  fecha_vencimiento: string;
  fecha_pago: string | null;
  estado: string | null;
  metodo_pago: string | null;
  comprobante: string | null;
  url_pago: string | null;
}

export const useCuotasFilters = (cuotas: SupabaseCuota[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filtrar cuotas según los criterios
  const filteredCuotas = useMemo(() => {
    const termNorm = searchTerm.toLowerCase();
    return cuotas.filter(cuota =>
      (
        (cuota.asociado?.nombre?.toLowerCase() || "").includes(termNorm) ||
        (cuota.asociado?.comercio?.toLowerCase() || "").includes(termNorm) ||
        (cuota.periodo || "").toLowerCase().includes(termNorm)
      )
      &&
      (statusFilter === 'all' ||
        (cuota.estado?.toLowerCase() === statusFilter)
      )
    );
  }, [cuotas, searchTerm, statusFilter]);

  // Agrupar por estado
  const cuotasPorEstado = useMemo(() => ({
    pagadas: cuotas.filter(c => (c.estado?.toLowerCase?.() === "pagada")),
    pendientes: cuotas.filter(c => (c.estado?.toLowerCase?.() === "pendiente")),
    vencidas: cuotas.filter(c => (c.estado?.toLowerCase?.() === "vencida"))
  }), [cuotas]);

  // Resumen rápido
  const resumen = useMemo(() => ({
    total: cuotas.length,
    pagadas: cuotasPorEstado.pagadas.length,
    pendientes: cuotasPorEstado.pendientes.length,
    vencidas: cuotasPorEstado.vencidas.length,
    montoTotal: cuotas.reduce((sum, c) => sum + (c.monto || 0), 0),
    montoPagado: cuotasPorEstado.pagadas.reduce((sum, c) => sum + (c.monto || 0), 0),
    montoPendiente: cuotasPorEstado.pendientes.reduce((sum, c) => sum + (c.monto || 0), 0),
    montoVencido: cuotasPorEstado.vencidas.reduce((sum, c) => sum + (c.monto || 0), 0)
  }), [cuotas, cuotasPorEstado]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredCuotas,
    cuotasPorEstado,
    resumen,
  };
};
