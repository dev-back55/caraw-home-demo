
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";

interface EliminarAsociadoDialogProps {
  open: boolean;
  asociado: any;
  onConfirm: () => void;
  onCancel: () => void;
}

const EliminarAsociadoDialog = ({ open, asociado, onConfirm, onCancel }: EliminarAsociadoDialogProps) => (
  <AlertDialog open={open} onOpenChange={onCancel}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          ¿Eliminar asociado?
        </AlertDialogTitle>
        <AlertDialogDescription>
          {asociado && (
            <span>
              ¿Está seguro que desea eliminar al asociado <b>{asociado.nombre}</b>? Esta acción no se puede deshacer.
            </span>
          )}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <div className="flex justify-end gap-2 pt-4">
        <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Eliminar</AlertDialogAction>
      </div>
    </AlertDialogContent>
  </AlertDialog>
);

export default EliminarAsociadoDialog;
