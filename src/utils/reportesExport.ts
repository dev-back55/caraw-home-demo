
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// Datos de ejemplo igual que en Reportes
export type MonthlyData = {
  mes: string,
  ingresos: number,
  asociados: number,
  cuotas: number,
  morosidad: number
}
export type MorosityData = {
  categoria: string,
  morosos: number,
  total: number,
  porcentaje: number
}
export type CategoryData = {
  name: string,
  value: number,
  color: string
}
export type PaymentMethodData = {
  name: string,
  value: number,
  color: string
}

// CSV de Ingresos Mensuales
export function exportIngresosCSV(monthlyData: MonthlyData[]) {
  const header = ["Mes", "Ingresos", "Asociados", "Cuotas", "Morosidad %"];
  const rows = monthlyData.map(m =>
    [m.mes, m.ingresos, m.asociados, m.cuotas, m.morosidad].join(",")
  );
  const csvContent = [header.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "reporte_ingresos.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// CSV de Morosidad
export function exportMorososCSV(morosityData: MorosityData[]) {
  const header = ["Categoría", "Morosos", "Total", "Porcentaje"];
  const rows = morosityData.map(m =>
    [m.categoria, m.morosos, m.total, m.porcentaje + "%"].join(",")
  );
  const csvContent = [header.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "reporte_morosidad.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}


// PDF de resumen ingresos/anual/morosidad
export async function generateSimpleReportePDF(
  type: "mensual" | "morosos" | "anual",
  {
    monthlyData,
    morosityData,
    year
  }: {
    monthlyData: MonthlyData[],
    morosityData: MorosityData[],
    year?: string
  }
) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const page = pdfDoc.addPage([480, 680]);

  let y = 650;
  page.drawText("REPORTE " + type.toUpperCase(), { x: 160, y, size: 16, font, color: rgb(0,0.2,0.6)});
  y -= 20;
  page.drawText(`Generado: ${new Date().toLocaleDateString("es-AR")}`, { x: 28, y, size: 10, font}); 
  if (year) {
    page.drawText(`Año: ${year}`, { x: 400, y, size: 10, font});
  }
  y -= 30;

  if (type === "mensual" || type === "anual") {
    // Tabla mensual/anual simple
    page.drawText("Mes    Ingresos    Asociados    Cuotas    Morosidad", { x: 28, y, size: 12, font});
    y -= 19;
    monthlyData.forEach(m => {
      const line = `${m.mes.padEnd(5)} $${m.ingresos.toLocaleString().padEnd(10)} ${String(m.asociados).padEnd(10)} ${String(m.cuotas).padEnd(8)} ${m.morosidad}%`;
      page.drawText(line, { x: 28, y, size: 12, font});
      y -= 17;
    });
  }
  if (type === "morosos") {
    page.drawText("Categoría      Morosos   Total    % Morosidad", { x: 28, y, size: 12, font});
    y -= 19;
    morosityData.forEach(m => {
      const line = `${m.categoria.padEnd(15)}  ${String(m.morosos).padEnd(7)}${String(m.total).padEnd(8)}${m.porcentaje}%`;
      page.drawText(line, { x: 28, y, size: 12, font});
      y -= 17;
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `Reporte_${type}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
