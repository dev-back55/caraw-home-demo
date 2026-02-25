
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import VerPagoDialog from "./VerPagoDialog";
import EstadoPagoDialog from "./EstadoPagoDialog";

interface PagosTableProps {
  pagos: any[];
  onDescargarPDF: (pago: any) => void;
}

const PagosTable: React.FC<PagosTableProps> = ({ pagos, onDescargarPDF }) => {
  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Aprobado':
        return 'bg-green-100 text-green-800';
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rechazado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMetodoColor = (metodo: string) => {
    switch (metodo) {
      case 'Mercado Pago':
        return 'bg-blue-100 text-blue-800';
      case 'Transferencia Bancaria':
        return 'bg-green-100 text-green-800';
      case 'Tarjeta de Crédito':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Asociado</TableHead>
            <TableHead>Período</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Método</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Comprobante</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagos.map((pago) => (
            <TableRow key={pago.id}>
              <TableCell>
                <div className="text-sm font-medium text-gray-900">
                  {pago.fecha_pago}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium text-gray-900">
                    {pago.asociado?.nombre || "N/A"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {pago.asociado?.comercio || "N/A"}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm font-medium text-gray-900">
                  {pago.periodo || "N/A"}
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium text-gray-900">
                  ${pago.monto?.toLocaleString() || "0"}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getMetodoColor(pago.metodo_pago)}>
                  {pago.metodo_pago || "N/A"}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(pago.estado)}>
                  {pago.estado || "Pendiente"}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-600 font-mono">
                {pago.comprobante || "N/A"}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <VerPagoDialog
                    pago={pago}
                    trigger={
                      <Button size="sm" variant="outline">
                        Ver
                      </Button>
                    }
                  />
                  <EstadoPagoDialog
                    pago={pago}
                    trigger={
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Estado
                      </Button>
                    }
                  />
                  {pago.estado === 'Aprobado' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDescargarPDF(pago)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PagosTable;
