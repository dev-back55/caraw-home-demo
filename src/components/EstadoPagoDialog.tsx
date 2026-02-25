
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface EstadoPagoDialogProps {
  pago: any;
  trigger: React.ReactNode;
}

const EstadoPagoDialog: React.FC<EstadoPagoDialogProps> = ({ pago, trigger }) => {
  const [selectedEstado, setSelectedEstado] = useState(pago.estado || "Pendiente");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("pagos")
        .update({ estado: selectedEstado })
        .eq("id", pago.id);

      if (error) throw error;

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["pagos"] });
      setOpen(false);
      console.log("Estado actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar Estado del Pago</DialogTitle>
          <DialogDescription>
            Actualizar el estado del pago de {pago.asociado?.nombre || "N/A"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Estado actual: {pago.estado}</Label>
          </div>
          
          <RadioGroup value={selectedEstado} onValueChange={setSelectedEstado}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Pendiente" id="pendiente" />
              <Label htmlFor="pendiente">Pendiente</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Aprobado" id="aprobado" />
              <Label htmlFor="aprobado">Aprobado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Rechazado" id="rechazado" />
              <Label htmlFor="rechazado">Rechazado</Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EstadoPagoDialog;
