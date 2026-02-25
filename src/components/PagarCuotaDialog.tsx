
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { SupabaseCuota } from "@/hooks/useCuotasFilters";

interface PagarCuotaDialogProps {
  cuota: SupabaseCuota;
  trigger: React.ReactNode;
}

export const PagarCuotaDialog: React.FC<PagarCuotaDialogProps> = ({ cuota, trigger }) => {
  const [metodoPago, setMetodoPago] = useState<string>("");

  const handlePagar = () => {
    toast({
      title: "Pago realizado",
      description: `El pago de $${cuota.monto.toLocaleString()} correspondiente al asociado ${cuota.asociado?.nombre} fue registrado exitosamente.`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pagar cuota</DialogTitle>
          <DialogDescription>
            Completa el pago de la siguiente cuota:
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Asociado:</strong> {cuota.asociado?.nombre}
          </div>
          <div>
            <strong>Comercio:</strong> {cuota.asociado?.comercio}
          </div>
          <div>
            <strong>Período:</strong> {cuota.periodo}
          </div>
          <div>
            <strong>Monto:</strong> ${cuota.monto.toLocaleString()}
          </div>
          <div>
            <strong>Fecha de vencimiento:</strong> {cuota.fecha_vencimiento}
          </div>
          <div>
            <strong>Método de pago:</strong>
            <Select value={metodoPago} onValueChange={setMetodoPago}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Selecciona un método" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mercado Pago">Mercado Pago</SelectItem>
                <SelectItem value="Transferencia">Transferencia</SelectItem>
                <SelectItem value="Efectivo">Efectivo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={!metodoPago} onClick={handlePagar}>
              Confirmar Pago
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
