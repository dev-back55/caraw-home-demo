
import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, Download } from "lucide-react";

interface Props {
  onExport: () => void;
  onOpenGenerar: () => void;
  onProcesarPagos: () => void;
  onPagoMultiple: () => void;
  total: number;
}

export const CuotasHeader: React.FC<Props> = ({ onExport, onOpenGenerar, onProcesarPagos, onPagoMultiple, total }) => (
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Cuotas Societarias</h1>
      <p className="text-gray-600 mt-1">Gestión y seguimiento de cuotas</p>
    </div>
    <div className="flex gap-2">
      <Button variant="outline" onClick={onExport}>
        <Download className="h-4 w-4 mr-2" />
        Exportar
      </Button>
      <Button variant="outline" onClick={onOpenGenerar}>
        Generar cuotas
      </Button>
      <Button variant="outline" onClick={onPagoMultiple}>
        <CreditCard className="h-4 w-4 mr-2" />
        Pago Múltiple
      </Button>
      <Button onClick={onProcesarPagos}>
        <CreditCard className="h-4 w-4 mr-2" />
        Procesar Pagos
      </Button>
    </div>
  </div>
);
