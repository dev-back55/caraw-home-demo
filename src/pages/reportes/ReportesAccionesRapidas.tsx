
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, PieChart } from "lucide-react";

type Props = {
  onReporteMensual: () => void;
  onListaMorosos: () => void;
  onAnalisisAnual: () => void;
};

export function ReportesAccionesRapidas({
  onReporteMensual,
  onListaMorosos,
  onAnalisisAnual
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
        <CardDescription>Generar reportes específicos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" onClick={onReporteMensual}>
            <FileText className="h-6 w-6" />
            <span>Reporte Mensual</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" onClick={onListaMorosos}>
            <Users className="h-6 w-6" />
            <span>Lista de Morosos</span>
          </Button>
          <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2" onClick={onAnalisisAnual}>
            <PieChart className="h-6 w-6" />
            <span>Análisis Anual</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
