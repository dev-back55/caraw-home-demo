
import React from "react";
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
import { SupabaseCuota } from "@/hooks/useCuotasFilters";

interface GestionarCuotaDialogProps {
  cuota: SupabaseCuota;
  trigger: React.ReactNode;
}

export const GestionarCuotaDialog: React.FC<GestionarCuotaDialogProps> = ({
  cuota,
  trigger,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gestionar cuota vencida</DialogTitle>
          <DialogDescription>
            Gestiona el cobro de la siguiente cuota vencida:
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
        </div>
        <DialogFooter>
          <Button variant="secondary" asChild>
            <a
              href={`mailto:?subject=Cobro pendiente de cuota&body=Estimado/a ${cuota.asociado?.nombre},%0A%0ATiene una cuota vencida del comercio ${cuota.asociado?.comercio} correspondiente al período ${cuota.periodo}, por un monto de $${cuota.monto.toLocaleString()}.%0APor favor, regularice su situación.%0A%0AGracias.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enviar Recordatorio por Email
            </a>
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
