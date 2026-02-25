
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

// El onboarding guarda datos por user.metadata (demo)
const OnboardingAsociadoDialog = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [datos, setDatos] = useState({
    nombre: "",
    comercio: "",
    email: "",
    telefono: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDatos(prev => ({ ...prev, [id]: value }));
  };

  const guardarDatos = async () => {
    if (!user) return;
    // Guarda datos en unsafeMetadata
    await user.update({ unsafeMetadata: { ...user.unsafeMetadata, asociado: datos } });
    setOpen(false);
    setDatos({ nombre: "", comercio: "", email: "", telefono: "" });
    alert("Onboarding completado.");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Onboarding Asociado</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Onboarding Asociado</DialogTitle>
          <DialogDescription>
            Complete el formulario para registrar nuevo asociado
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input id="nombre" value={datos.nombre} onChange={handleInput} />
          </div>
          <div>
            <Label htmlFor="comercio">Comercio</Label>
            <Input id="comercio" value={datos.comercio} onChange={handleInput} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={datos.email} onChange={handleInput} />
          </div>
          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input id="telefono" value={datos.telefono} onChange={handleInput} />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={guardarDatos}>Guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default OnboardingAsociadoDialog;
