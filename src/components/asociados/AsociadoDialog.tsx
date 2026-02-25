
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AsociadoDialogProps {
  open: boolean;
  mode: 'ver' | 'editar' | null;
  asociado: any;
  categorias: string[];
  categoriasDisponibles: string[];
  onClose: () => void;
  onChange: (e: any) => void;
  onSave: () => void;
}

const AsociadoDialog = ({
  open,
  mode,
  asociado,
  categoriasDisponibles,
  onClose,
  onChange,
  onSave,
}: AsociadoDialogProps) => {
  if (!mode || !asociado) return null;
  
  console.log('AsociadoDialog - asociado.catcuota:', asociado.catcuota);
  
  const valoresCatcuota = ["3000", "5000", "10000", "15000"];

  const handleCategoriaChange = (value: string) => {
    console.log('Categoria changed to:', value);
    onChange({ target: { id: 'categoria', value } });
  };

  const handleCatcuotaChange = (value: string) => {
    console.log('Catcuota changed to:', value);
    onChange({ target: { id: 'catcuota', value } });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('Input changed:', e.target.id, e.target.value);
    onChange(e);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'ver' ? "Ver Asociado" : "Editar Asociado"}
          </DialogTitle>
          <DialogDescription>
            {mode === 'ver'
              ? "Información del asociado"
              : "Modifique los datos del asociado y guarde los cambios"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input
              id="nombre"
              value={asociado.nombre || ''}
              onChange={handleInputChange}
              disabled={mode === "ver"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comercio">Nombre del Comercio</Label>
            <Input
              id="comercio"
              value={asociado.comercio || ''}
              onChange={handleInputChange}
              disabled={mode === "ver"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={asociado.email || ''}
              onChange={handleInputChange}
              disabled={mode === "ver"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              value={asociado.telefono || ''}
              onChange={handleInputChange}
              disabled={mode === "ver"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cuit">CUIT</Label>
            <Input
              id="cuit"
              value={asociado.cuit || ''}
              onChange={handleInputChange}
              disabled={mode === "ver"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoría</Label>
            <Select
              value={asociado.categoria || ''}
              onValueChange={handleCategoriaChange}
              disabled={mode === "ver"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categoriasDisponibles.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="catcuota">Categoría de Cuota</Label>
            {mode === "ver" ? (
              <Input
                value={asociado.catcuota || 'Sin asignar'}
                disabled
              />
            ) : (
              <Select
                value={asociado.catcuota ? asociado.catcuota.toString() : ''}
                onValueChange={handleCatcuotaChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar valor de cuota" />
                </SelectTrigger>
                <SelectContent>
                  {valoresCatcuota.map(valor => (
                    <SelectItem key={valor} value={valor}>
                      {valor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="ingbrutos">Ingresos Brutos</Label>
            <Input
              id="ingbrutos"
              value={asociado.ingbrutos || ''}
              onChange={handleInputChange}
              disabled={mode === "ver"}
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Textarea
              id="direccion"
              value={asociado.direccion || ''}
              onChange={handleInputChange}
              disabled={mode === "ver"}
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="fechaIngreso">Fecha de Ingreso</Label>
            <Input
              id="fechaIngreso"
              type="date"
              value={asociado.fechaIngreso || ''}
              onChange={handleInputChange}
              disabled={mode === "ver"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estado">Estado</Label>
            {mode === "ver" ? (
              <Input
                value={asociado.estado || ''}
                disabled
              />
            ) : (
              <Select
                value={asociado.estado || ''}
                onValueChange={(value) => onChange({ target: { id: 'estado', value } })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                  <SelectItem value="Suspendido">Suspendido</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="deuda">Deuda</Label>
            <Input
              id="deuda"
              value={"$" + (asociado.deuda?.toLocaleString() ?? "0")}
              disabled
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
          {mode === "editar" && (
            <Button onClick={onSave}>Guardar Cambios</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AsociadoDialog;
