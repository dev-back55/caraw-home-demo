
import { useState } from 'react';
import { Asociado, NuevoAsociadoForm } from './types';

export function useAsociadosDialogs() {
  // Nuevo asociado dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [nuevoAsociado, setNuevoAsociado] = useState<NuevoAsociadoForm>({
    nombre: '',
    comercio: '',
    email: '',
    telefono: '',
    cuit: '',
    categoria: '',
    direccion: '',
    ingbrutos: '',
    catcuota: '', // Cambiar a string
  });

  // Ver/editar dialog
  const [selectedAsociado, setSelectedAsociado] = useState<Asociado | null>(null);
  const [dialogMode, setDialogMode] = useState<'ver' | 'editar' | null>(null);

  // Eliminar dialog
  const [openEliminar, setOpenEliminar] = useState(false);
  const [asociadoAEliminar, setAsociadoAEliminar] = useState<Asociado | null>(null);

  const handleNuevoAsociadoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('handleNuevoAsociadoChange called with:', e);
    const { id, value } = e.target;
    console.log('Setting field', id, 'to:', value);
    setNuevoAsociado(prev => ({ ...prev, [id]: value }));
  };

  const resetNuevoAsociado = () => {
    setNuevoAsociado({
      nombre: '',
      comercio: '',
      email: '',
      telefono: '',
      cuit: '',
      categoria: '',
      direccion: '',
      ingbrutos: '',
      catcuota: '', // Cambiar a string
    });
  };

  const handleVerAsociado = (asociado: Asociado) => {
    setSelectedAsociado(asociado);
    setDialogMode('ver');
  };

  const handleEditarAsociado = (asociado: Asociado) => {
    setSelectedAsociado({ ...asociado });
    setDialogMode('editar');
  };

  const handleCerrarDialog = () => {
    setSelectedAsociado(null);
    setDialogMode(null);
  };

  const handleChangeEditarAsociado = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!selectedAsociado) return;
    console.log('handleChangeEditarAsociado called with:', e);
    const { id, value } = e.target;
    if (id === 'id' || id === 'idsocio' || id === 'cuit') return;
    console.log('Setting field', id, 'to:', value);
    setSelectedAsociado((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleEliminarClick = (asociado: Asociado) => {
    setAsociadoAEliminar(asociado);
    setOpenEliminar(true);
  };

  const handleCancelarEliminar = () => {
    setOpenEliminar(false);
    setAsociadoAEliminar(null);
  };

  return {
    // Nuevo asociado
    openDialog,
    setOpenDialog,
    nuevoAsociado,
    setNuevoAsociado,
    handleNuevoAsociadoChange,
    resetNuevoAsociado,
    
    // Ver/editar
    selectedAsociado,
    setSelectedAsociado,
    dialogMode,
    setDialogMode,
    handleVerAsociado,
    handleEditarAsociado,
    handleCerrarDialog,
    handleChangeEditarAsociado,
    
    // Eliminar
    openEliminar,
    setOpenEliminar,
    asociadoAEliminar,
    setAsociadoAEliminar,
    handleEliminarClick,
    handleCancelarEliminar
  };
}
