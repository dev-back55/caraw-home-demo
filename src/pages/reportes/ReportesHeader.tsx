
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

type Props = {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  onExportar: () => void;
  onGenerarPDF: () => void;
};

export function ReportesHeader({
  selectedPeriod,
  setSelectedPeriod,
  onExportar,
  onGenerarPDF
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reportes</h1>
        <p className="text-gray-600 mt-1">Análisis y estadísticas de gestión</p>
      </div>
      <div className="flex gap-2">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2023">2023</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={onExportar}>
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
        <Button onClick={onGenerarPDF}>
          <FileText className="h-4 w-4 mr-2" />
          Generar PDF
        </Button>
      </div>
    </div>
  );
}
