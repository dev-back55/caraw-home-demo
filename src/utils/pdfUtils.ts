import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function descargarComprobantePDF(cuota: {
  asociado: string;
  comercio: string;
  periodo: string;
  monto: number;
  fechaPago: string | null;
  estado: string;
  metodoPago: string | null;
  comprobante: string | null;
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([400, 320]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = 280;
  page.drawText("COMPROBANTE DE PAGO", {
    x: 100,
    y,
    size: 16,
    font,
    color: rgb(0, 0.2, 0.6),
  });
  y -= 30;

  const lines = [
    `Asociado: ${cuota.asociado}`,
    `Comercio: ${cuota.comercio}`,
    `Periodo: ${cuota.periodo}`,
    `Monto: $${cuota.monto.toLocaleString()}`,
    `Fecha de Pago: ${cuota.fechaPago ?? ""}`,
    `Estado: ${cuota.estado}`,
    `Método de Pago: ${cuota.metodoPago ?? ""}`,
    `Nº Comprobante: ${cuota.comprobante ?? ""}`,
    "",
    "Emitido automáticamente.",
  ];

  lines.forEach((line) => {
    page.drawText(line, {
      x: 40,
      y,
      size: 13,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 24;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `Comprobante_${cuota.comprobante ?? ""}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// Nueva función para generar PDF individual de pago
export async function generatePagoPDF(pago: {
  id: string;
  fecha_pago: string;
  asociado?: {
    nombre: string;
    comercio: string;
  };
  monto: number;
  metodo_pago: string;
  comprobante: string;
  estado: string;
}) {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([440, 350]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = 310;
  page.drawText("COMPROBANTE DE PAGO", {
    x: 115,
    y,
    size: 16,
    font,
    color: rgb(0, 0.2, 0.6),
  });
  y -= 30;

  // Formatear fecha en formato dd-MM-YYYY
  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const año = date.getFullYear();
    return `${dia}-${mes}-${año}`;
  };

  const lines = [
    `Asociado: ${pago.asociado?.nombre || "N/A"}`,
    `Comercio: ${pago.asociado?.comercio || "N/A"}`,
    `Concepto: Cuota periodo`,
    `Fecha: ${formatearFecha(pago.fecha_pago)}`,
    `Monto: $${pago.monto.toLocaleString()}`,
    `Método: ${pago.metodo_pago || "N/A"}`,
    `Estado: ${pago.estado}`,
    `Comprobante: ${pago.comprobante || "N/A"}`,
    "",
    "Emitido automáticamente.",
  ].filter(Boolean);

  lines.forEach((line) => {
    page.drawText(line, {
      x: 40,
      y,
      size: 13,
      font,
      color: rgb(0, 0, 0),
    });
    y -= 23;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `Pago_${pago.comprobante || pago.id}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// Nueva función para generar reporte PDF masivo de pagos
export async function generatePagosReportePDF(
  pagos: Array<{
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
  }>
) {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // One page per 18 pagos aprox.
  let pagosPorPagina = 18;
  let currentPage = null;
  let y = 0;

  for (let i = 0; i < pagos.length; i++) {
    if (i % pagosPorPagina === 0) {
      currentPage = pdfDoc.addPage([530, 780]);
      y = 740;
      // Header
      currentPage.drawText("REPORTE DE PAGOS", {
        x: 180,
        y,
        size: 18,
        font,
        color: rgb(0, 0.2, 0.6),
      });
      y -= 28;
      currentPage.drawText(
        "Fecha  " +
          new Date().toLocaleDateString("es-AR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
        { x: 25, y, size: 11, font, color: rgb(0,0,0) }
      );
      y -= 20;
      // Table headers
      const headers = [
        "Fecha",
        "Asociado",
        "Comercio",
        "Monto",
        "Método",
        "Estado",
        "Comprobante",
      ];
      let x = 25;
      headers.forEach((h, idx) => {
        currentPage.drawText(h, { x, y, size: 11, font, color: rgb(0, 0, 0) });
        x += [65, 105, 100, 60, 75, 70, 80][idx];
      });
      y -= 16;
    }

    const pago = pagos[i];
    let x = 25;
    [
      pago.fecha,
      pago.asociado,
      pago.comercio,
      `$${pago.monto.toLocaleString()}`,
      pago.metodo,
      pago.estado,
      pago.comprobante,
    ].forEach((text, idx) => {
      currentPage.drawText(
        String(text),
        {
          x,
          y,
          size: 10,
          font,
          color: rgb(0, 0, 0),
        }
      );
      x += [65, 105, 100, 60, 75, 70, 80][idx];
    });
    y -= 17;
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "Reporte_Pagos.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
