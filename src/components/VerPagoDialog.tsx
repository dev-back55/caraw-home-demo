
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

interface Pago {
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
  periodo?: string;
}

interface VerPagoDialogProps {
  pago: Pago;
  trigger: React.ReactNode;
}

const VerPagoDialog: React.FC<VerPagoDialogProps> = ({ pago, trigger }) => (
  <Dialog>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Detalles del Pago</DialogTitle>
        <DialogDescription>Visualiza toda la información registrada</DialogDescription>
      </DialogHeader>
      <div className="space-y-2 text-sm">
        <div><strong>Asociado:</strong> {pago.asociado?.nombre || "N/A"}</div>
        <div><strong>Comercio:</strong> {pago.asociado?.comercio || "N/A"}</div>
        <div><strong>Período:</strong> {pago.periodo || "N/A"}</div>
        <div><strong>Fecha:</strong> {pago.fecha_pago}</div>
        <div><strong>Monto:</strong> ${pago.monto?.toLocaleString() || "0"}</div>
        <div><strong>Método:</strong> {pago.metodo_pago || "N/A"}</div>
        <div><strong>Estado:</strong> {pago.estado || "Pendiente"}</div>
        <div><strong>Comprobante:</strong> <span className="font-mono">{pago.comprobante || "N/A"}</span></div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default VerPagoDialog;
