
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface NuevoAsociadoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoriasDisponibles: string[];
  nuevoAsociado: any;
  onChange: (e: any) => void;
  onGuardar: () => void;
}

const NuevoAsociadoDialog = ({
  open,
  onOpenChange,
  categoriasDisponibles,
  nuevoAsociado,
  onChange,
  onGuardar,
}: NuevoAsociadoDialogProps) => {
  console.log('NuevoAsociadoDialog - nuevoAsociado.catcuota:', nuevoAsociado.catcuota);

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Asociado
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Asociado</DialogTitle>
          <DialogDescription>
            Complete los datos del nuevo asociado
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input 
              id="nombre" 
              placeholder="Juan Pérez" 
              value={nuevoAsociado.nombre || ''} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="comercio">Nombre del Comercio</Label>
            <Input 
              id="comercio" 
              placeholder="Mi Comercio" 
              value={nuevoAsociado.comercio || ''} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="juan@ejemplo.com" 
              value={nuevoAsociado.email || ''} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input 
              id="telefono" 
              placeholder="297-123-4567" 
              value={nuevoAsociado.telefono || ''} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cuit">CUIT</Label>
            <Input 
              id="cuit" 
              placeholder="20-12345678-9" 
              value={nuevoAsociado.cuit || ''} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoria">Categoría</Label>
            <Select value={nuevoAsociado.categoria || ''} onValueChange={handleCategoriaChange}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categoriasDisponibles.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="catcuota">Categoría de Cuota</Label>
            <Select 
              value={nuevoAsociado.catcuota ? nuevoAsociado.catcuota.toString() : ''} 
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
          </div>
          <div className="space-y-2">
            <Label htmlFor="ingbrutos">Ingresos Brutos</Label>
            <Input 
              id="ingbrutos" 
              placeholder="Ej: 987654321" 
              value={nuevoAsociado.ingbrutos || ''} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Textarea 
              id="direccion" 
              placeholder="Av. San Martín 123" 
              value={nuevoAsociado.direccion || ''} 
              onChange={handleInputChange} 
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={onGuardar}>Guardar Asociado</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NuevoAsociadoDialog;
