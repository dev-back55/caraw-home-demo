import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Edit } from "lucide-react";
import { GestionarCuotaDialog } from "./GestionarCuotaDialog";
import { PagarCuotaDialog } from "./PagarCuotaDialog";
import { EditarCuotaDialog } from "./EditarCuotaDialog";
import { SupabaseCuota } from "@/hooks/useCuotasFilters";

interface Props {
  cuotas: SupabaseCuota[];
  getStatusColor: (estado: string) => string;
  getStatusIcon: (estado: string) => React.ReactNode;
  descargarComprobantePDF: (cuota: SupabaseCuota) => void;
  onCuotaActualizada?: () => void;
}

const CuotasTable: React.FC<Props> = ({
  cuotas,
  getStatusColor,
  getStatusIcon,
  descargarComprobantePDF,
  onCuotaActualizada,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Asociado</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Período</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Monto</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Vencimiento</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Estado</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cuotas.map(cuota => (
            <tr key={cuota.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">
                <div>
                  <div className="font-medium text-gray-900">
                    {cuota.asociado?.nombre || "-"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {cuota.asociado?.comercio || "-"}
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-gray-700">{cuota.periodo}</td>
              <td className="py-3 px-4 font-medium text-gray-900">
                ${cuota.monto?.toLocaleString?.() || "-"}
              </td>
              <td className="py-3 px-4 text-gray-700">
                {cuota.fecha_vencimiento}
              </td>
              <td className="py-3 px-4">
                <Badge
                  className={`${getStatusColor(cuota.estado ?? "")} flex items-center gap-1 w-fit`}
                >
                  {getStatusIcon(cuota.estado ?? "")}
                  {cuota.estado}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  {cuota.estado === "Pendiente" && (
                    <EditarCuotaDialog
                      cuota={cuota}
                      onCuotaActualizada={onCuotaActualizada}
                      trigger={
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      }
                    />
                  )}
                  {cuota.estado === "Vencida" && (
                    <GestionarCuotaDialog
                      cuota={cuota}
                      trigger={
                        <Button size="sm" variant="destructive">
                          Gestionar
                        </Button>
                      }
                    />
                  )}
                  {cuota.estado === "Pagada" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => descargarComprobantePDF(cuota)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Comprobante
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CuotasTable;
