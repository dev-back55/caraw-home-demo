
import { useAsociadosData } from './asociados/useAsociadosData';
import { useAsociadosDialogs } from './asociados/useAsociadosDialogs';
import { useAsociadosFilters } from './asociados/useAsociadosFilters';
import { categoriasDisponibles } from './asociados/types';

export { type Asociado } from './asociados/types';
export { categoriasDisponibles };

export function useAsociados() {
  const {
    asociados,
    categorias,
    isLoading,
    createAsociado,
    updateAsociado,
    deleteAsociado
  } = useAsociadosData();

  const {
    openDialog,
    setOpenDialog,
    nuevoAsociado,
    setNuevoAsociado,
    handleNuevoAsociadoChange,
    resetNuevoAsociado,
    selectedAsociado,
    setSelectedAsociado,
    dialogMode,
    setDialogMode,
    handleVerAsociado,
    handleEditarAsociado,
    handleCerrarDialog,
    handleChangeEditarAsociado,
    openEliminar,
    setOpenEliminar,
    asociadoAEliminar,
    setAsociadoAEliminar,
    handleEliminarClick,
    handleCancelarEliminar
  } = useAsociadosDialogs();

  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    asociadosFiltrados
  } = useAsociadosFilters(asociados);

  const handleGuardarNuevoAsociado = async () => {
    try {
      console.log('Saving new asociado with data:', nuevoAsociado);
      await createAsociado(nuevoAsociado);
      resetNuevoAsociado();
      setOpenDialog(false);
    } catch (error) {
      console.error('Error saving asociado:', error);
      alert(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  const handleGuardarEdicion = async () => {
    if (!selectedAsociado) return;
    try {
      console.log('Updating asociado with data:', selectedAsociado);
      await updateAsociado(selectedAsociado);
      handleCerrarDialog();
    } catch (error) {
      console.error('Error updating asociado:', error);
      alert(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  const handleConfirmarEliminar = async () => {
    if (!asociadoAEliminar) return;
    try {
      await deleteAsociado(asociadoAEliminar.id);
      setOpenEliminar(false);
      setAsociadoAEliminar(null);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  return {
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    openDialog,
    setOpenDialog,
    nuevoAsociado,
    setNuevoAsociado,
    handleNuevoAsociadoChange,
    handleGuardarNuevoAsociado,
    asociados,
    categorias,
    asociadosFiltrados,
    selectedAsociado,
    setSelectedAsociado,
    dialogMode,
    setDialogMode,
    handleVerAsociado,
    handleEditarAsociado,
    handleCerrarDialog,
    handleChangeEditarAsociado,
    handleGuardarEdicion,
    openEliminar,
    setOpenEliminar,
    asociadoAEliminar,
    handleEliminarClick,
    handleConfirmarEliminar,
    handleCancelarEliminar,
    categoriasDisponibles
  };
}
