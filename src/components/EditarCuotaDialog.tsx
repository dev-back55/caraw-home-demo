import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SupabaseCuota } from "@/hooks/useCuotasFilters";
import { useQueryClient } from "@tanstack/react-query";

interface EditarCuotaDialogProps {
  cuota: SupabaseCuota;
  trigger: React.ReactNode;
  onCuotaActualizada?: () => Promise<void> | void;
}

export const EditarCuotaDialog: React.FC<EditarCuotaDialogProps> = ({
  cuota,
  trigger,
  onCuotaActualizada,
}) => {
  const [open, setOpen] = useState(false);
  const [monto, setMonto] = useState(cuota.monto?.toString() || "");
  const [urlPago, setUrlPago] = useState((cuota as any).url_pago || "");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSave = async () => {
    if (!monto || isNaN(Number(monto))) {
      toast({
        title: "Error",
        description: "El monto debe ser un número válido",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const nuevoMonto = Number(monto);
      const montoAnterior = cuota.monto || 0;
      const diferenciaMonto = nuevoMonto - montoAnterior;

      // Actualizar la cuota
      const { error: cuotaError } = await supabase
        .from("cuotas")
        .update({
          monto: nuevoMonto,
          url_pago: urlPago || null,
        })
        .eq("id", cuota.id);

      if (cuotaError) throw cuotaError;

      // Actualizar la deuda del asociado
      if (diferenciaMonto !== 0 && (cuota as any).asociado_id) {
        const deudaActual = await getDeudaActualAsociado((cuota as any).asociado_id);
        const nuevaDeuda = deudaActual + diferenciaMonto;

        const { error: asociadoError } = await supabase
          .from("asociados")
          .update({ deuda: nuevaDeuda })
          .eq("id", (cuota as any).asociado_id);

        if (asociadoError) throw asociadoError;
      }

      toast({
        title: "Éxito",
        description: "Cuota actualizada correctamente",
      });

      // Cerrar modal
      setOpen(false);

      // Forzar refresh de los datos
      queryClient.removeQueries({ queryKey: ["cuotas"] });
      
      // Llamar callback
      if (onCuotaActualizada) {
        await onCuotaActualizada();
      }
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Error al actualizar la cuota: " + error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDeudaActualAsociado = async (asociadoId: string): Promise<number> => {
    const { data, error } = await supabase
      .from("asociados")
      .select("deuda")
      .eq("id", asociadoId)
      .single();

    if (error || !data) return 0;
    return data.deuda || 0;
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      // Restablecer valores al abrir
      setMonto(cuota.monto?.toString() || "");
      setUrlPago((cuota as any).url_pago || "");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Cuota</DialogTitle>
          <DialogDescription>
            Modifique el monto y la URL de pago de la cuota pendiente
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Asociado</Label>
            <Input 
              value={`${cuota.asociado?.nombre || ""} - ${cuota.asociado?.comercio || ""}`}
              disabled
              className="bg-gray-50"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Período</Label>
            <Input 
              value={cuota.periodo}
              disabled
              className="bg-gray-50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="monto">Monto *</Label>
            <Input
              id="monto"
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Ingrese el monto"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="url_pago">URL de Pago</Label>
            <Input
              id="url_pago"
              type="url"
              value={urlPago}
              onChange={(e) => setUrlPago(e.target.value)}
              placeholder="https://ejemplo.com/pago/..."
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
