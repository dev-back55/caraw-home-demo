
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, AlertCircle, CreditCard } from "lucide-react";

interface Resumen {
  total: number;
  pagadas: number;
  pendientes: number;
  vencidas: number;
  montoTotal: number;
  montoPagado: number;
  montoPendiente: number;
  montoVencido: number;
}

export const CuotasResumen = ({ resumen }: { resumen: Resumen }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Recaudado</CardTitle>
        <CheckCircle className="h-4 w-4 text-green-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-600">
          ${resumen.montoPagado.toLocaleString()}
        </div>
        <p className="text-xs text-gray-600">
          {resumen.pagadas} cuotas pagadas
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Pendiente de Cobro</CardTitle>
        <Clock className="h-4 w-4 text-yellow-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-yellow-600">
          ${resumen.montoPendiente.toLocaleString()}
        </div>
        <p className="text-xs text-gray-600">
          {resumen.pendientes} cuotas pendientes
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
        <AlertCircle className="h-4 w-4 text-red-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-red-600">
          ${resumen.montoVencido.toLocaleString()}
        </div>
        <p className="text-xs text-gray-600">
          {resumen.vencidas} cuotas vencidas
        </p>
      </CardContent>
    </Card>

    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Tasa de Cobro</CardTitle>
        <CreditCard className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-blue-600">
          {resumen.total ? Math.round((resumen.pagadas / resumen.total) * 100) : 0}%
        </div>
        <p className="text-xs text-gray-600">
          {resumen.pagadas} de {resumen.total} cuotas
        </p>
      </CardContent>
    </Card>
  </div>
);
