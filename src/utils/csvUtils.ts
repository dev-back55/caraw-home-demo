
import { SupabaseCuota } from "@/hooks/useCuotasFilters";

export function exportCuotasCSV(cuotas: SupabaseCuota[]) {
  const csvHeader = [
    "Asociado",
    "Comercio",
    "Periodo",
    "Monto",
    "Fecha Vencimiento",
    "Fecha Pago",
    "Estado",
    "Metodo de Pago",
    "Comprobante"
  ];
  const csvRows = cuotas.map(cuota =>
    [
      cuota.asociado?.nombre ?? "",
      cuota.asociado?.comercio ?? "",
      cuota.periodo ?? "",
      cuota.monto ?? "",
      cuota.fecha_vencimiento ?? "",
      cuota.fecha_pago ?? "",
      cuota.estado ?? "",
      cuota.metodo_pago ?? "",
      cuota.comprobante ?? ""
    ].map(v => `"${v}"`).join(",")
  );
  const csvContent = [csvHeader.join(","), ...csvRows].join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "cuotas_export.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

interface Pago {
  id: number;
  fecha: string;
  hora: string;
  asociado: string;
  comercio: string;
  monto: number;
  metodo: string;
  comprobante: string;
  estado: string;
  concepto: string;
  comision: number;
}

export function exportPagosToCSV(pagos: Pago[]) {
  const csvHeader = [
    "ID",
    "Fecha",
    "Hora",
    "Asociado",
    "Comercio",
    "Concepto",
    "Monto",
    "Comisión",
    "Método",
    "Estado",
    "Comprobante"
  ];
  const csvRows = pagos.map(pago =>
    [
      pago.id,
      pago.fecha,
      pago.hora,
      pago.asociado,
      pago.comercio,
      pago.concepto,
      pago.monto,
      pago.comision,
      pago.metodo,
      pago.estado,
      pago.comprobante
    ].map(v => `"${v}"`).join(",")
  );
  const csvContent = [csvHeader.join(","), ...csvRows].join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "pagos_export.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
