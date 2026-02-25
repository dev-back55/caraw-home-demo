import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSupabaseAsociados } from "@/hooks/useSupabaseAsociados";
import { usePagoMultipleCuotas } from "@/hooks/usePagoMultipleCuotas";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PagarMultiplesCuotasDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const [asociadoId, setAsociadoId] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [metodoPago, setMetodoPago] = useState("");
  const [comprobante, setComprobante] = useState("");
  const [paso, setPaso] = useState<'seleccion' | 'resumen' | 'pago'>('seleccion');

  const { data: asociados } = useSupabaseAsociados();
  const { loading, cuotasResumen, calcularCuotasResumen, procesarPagoMultiple, setCuotasResumen } = usePagoMultipleCuotas();

  useEffect(() => {
    if (!open) {
      // Resetear formulario al cerrar
      setAsociadoId("");
      setFechaDesde("");
      setFechaHasta("");
      setMetodoPago("");
      setComprobante("");
      setPaso('seleccion');
      setCuotasResumen([]);
    }
  }, [open, setCuotasResumen]);

  const handleCalcularResumen = async () => {
    if (!asociadoId || !fechaDesde || !fechaHasta) {
      return;
    }

    const resumen = await calcularCuotasResumen(asociadoId, fechaDesde, fechaHasta);
    if (resumen.length > 0) {
      setPaso('resumen');
    }
  };

  const handleConfirmarPago = async () => {
    if (!metodoPago) return;

    const success = await procesarPagoMultiple(asociadoId, metodoPago, comprobante);
    if (success) {
      onOpenChange(false);
    }
  };

  const asociadoSeleccionado = asociados?.find(a => a.id === asociadoId);
  const montoTotal = cuotasResumen.reduce((sum, c) => sum + c.monto, 0);
  const cuotasNuevas = cuotasResumen.filter(c => !c.existia).length;
  const cuotasExistentes = cuotasResumen.filter(c => c.existia).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Pago Múltiple de Cuotas</DialogTitle>
        </DialogHeader>

        {paso === 'seleccion' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="asociado">Asociado *</Label>
                <Select value={asociadoId} onValueChange={setAsociadoId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar asociado" />
                  </SelectTrigger>
                  <SelectContent>
                    {asociados?.filter(a => a.estado === 'Activo').map((asociado) => (
                      <SelectItem key={asociado.id} value={asociado.id}>
                        {asociado.nombre} - {asociado.comercio}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaDesde">Fecha Desde *</Label>
                <Input
                  id="fechaDesde"
                  type="month"
                  value={fechaDesde}
                  onChange={(e) => setFechaDesde(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fechaHasta">Fecha Hasta *</Label>
                <Input
                  id="fechaHasta"
                  type="month"
                  value={fechaHasta}
                  onChange={(e) => setFechaHasta(e.target.value)}
                />
              </div>
            </div>

            {asociadoSeleccionado && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Información del Asociado</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Nombre:</span> {asociadoSeleccionado.nombre}
                    </div>
                    <div>
                      <span className="font-medium">Comercio:</span> {asociadoSeleccionado.comercio}
                    </div>
                    <div>
                      <span className="font-medium">Cuota Mensual:</span> ${asociadoSeleccionado.catcuota?.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Deuda Actual:</span> ${asociadoSeleccionado.deuda?.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {paso === 'resumen' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Resumen de Cuotas a Pagar</h3>
              <Button variant="outline" onClick={() => setPaso('seleccion')}>
                Volver
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{cuotasResumen.length}</div>
                    <div className="text-sm text-muted-foreground">Total Cuotas</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{cuotasNuevas}</div>
                    <div className="text-sm text-muted-foreground">Por Generar</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">${montoTotal.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Monto Total</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="max-h-60 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Período</TableHead>
                    <TableHead>Vencimiento</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cuotasResumen.map((cuota) => (
                    <TableRow key={cuota.id}>
                      <TableCell>{cuota.periodo}</TableCell>
                      <TableCell>{new Date(cuota.fecha_vencimiento).toLocaleDateString()}</TableCell>
                      <TableCell>${cuota.monto.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={cuota.existia ? "secondary" : "outline"}>
                          {cuota.existia ? "Existente" : "Por Generar"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metodoPago">Método de Pago *</Label>
                  <Select value={metodoPago} onValueChange={setMetodoPago}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mercado Pago">Mercado Pago</SelectItem>
                      <SelectItem value="Transferencia Bancaria">Transferencia Bancaria</SelectItem>
                      <SelectItem value="Tarjeta de Crédito">Tarjeta de Crédito</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comprobante">Comprobante de Pago</Label>
                  <Input
                    id="comprobante"
                    type="text"
                    placeholder="Número de comprobante, referencia, etc."
                    value={comprobante}
                    onChange={(e) => setComprobante(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancelar
          </Button>
          
          {paso === 'seleccion' && (
            <Button 
              onClick={handleCalcularResumen} 
              disabled={!asociadoId || !fechaDesde || !fechaHasta || loading}
            >
              {loading ? "Calculando..." : "Calcular Cuotas"}
            </Button>
          )}
          
          {paso === 'resumen' && (
            <Button 
              onClick={handleConfirmarPago} 
              disabled={!metodoPago || loading}
            >
              {loading ? "Procesando..." : `Confirmar Pago - $${montoTotal.toLocaleString()}`}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};