
import { useState } from 'react';
import { useSupabaseAsociados } from "@/hooks/useSupabaseAsociados";
import { supabase } from "@/integrations/supabase/client";
import { Asociado, NuevoAsociadoForm } from './types';

export function useAsociadosData() {
  const { data: asociadosSupabase, isLoading, refetch } = useSupabaseAsociados();

  // Adaptar datos desde Supabase
  const asociados: Asociado[] = (asociadosSupabase ?? []).map((a: any) => ({
    id: a.idsocio,
    nombre: a.nombre,
    comercio: a.comercio ?? '',
    email: a.email ?? '',
    telefono: a.telefono ?? '',
    cuit: a.cuit ?? '',
    categoria: a.categoria ?? '',
    direccion: a.domicilio ?? '',
    ingbrutos: a.ingbrutos ?? '',
    catcuota: a.catcuota?.toString() ?? '',
    fechaIngreso: a.fecha_ingreso ?? '',
    estado: a.estado ?? 'Activo',
    deuda: a.deuda ?? 0,
    ultimoPago: '',
  }));

  const categorias = [...new Set(asociados.map(a => a.categoria).filter(Boolean))];

  const createAsociado = async (nuevoAsociado: NuevoAsociadoForm) => {
    console.log('createAsociado called with data:', nuevoAsociado);
    
    // Validación más específica - ingresos brutos no es obligatorio
    const requiredFields = ['nombre', 'comercio', 'email', 'telefono', 'cuit', 'categoria', 'direccion'];
    const missingFields = requiredFields.filter(field => !nuevoAsociado[field] || nuevoAsociado[field].toString().trim() === '');
    
    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      throw new Error(`Por favor complete los siguientes campos: ${missingFields.join(', ')}`);
    }

    console.log('All fields validated, attempting to save...');
    
    const { error } = await supabase.from("asociados").insert({
      nombre: nuevoAsociado.nombre.trim(),
      comercio: nuevoAsociado.comercio.trim(),
      email: nuevoAsociado.email.trim(),
      telefono: nuevoAsociado.telefono.trim(),
      cuit: nuevoAsociado.cuit.trim(),
      categoria: nuevoAsociado.categoria,
      domicilio: nuevoAsociado.direccion.trim(),
      ingbrutos: nuevoAsociado.ingbrutos.trim(),
      catcuota: Number(nuevoAsociado.catcuota), // Convertir a número para Supabase
      idsocio: Math.random().toString(36).substring(2, 10)
    });
    
    if (error) {
      console.error('Error saving asociado:', error);
      throw new Error("Hubo un error al guardar el asociado: " + error.message);
    }
    
    console.log('Asociado saved successfully');
    await refetch();
  };

  const updateAsociado = async (asociado: Asociado) => {
    const updateFields: any = {};
    if (asociado.nombre !== undefined) updateFields.nombre = asociado.nombre;
    if (asociado.comercio !== undefined) updateFields.comercio = asociado.comercio;
    if (asociado.email !== undefined) updateFields.email = asociado.email;
    if (asociado.telefono !== undefined) updateFields.telefono = asociado.telefono;
    if (asociado.categoria !== undefined) updateFields.categoria = asociado.categoria;
    if (asociado.direccion !== undefined) updateFields.domicilio = asociado.direccion;
    if (asociado.ingbrutos !== undefined) updateFields.ingbrutos = asociado.ingbrutos;
    if (asociado.catcuota !== undefined) updateFields.catcuota = Number(asociado.catcuota); // Convertir a número para Supabase
    if (asociado.fechaIngreso !== undefined) updateFields.fecha_ingreso = asociado.fechaIngreso;
    if (asociado.estado !== undefined) updateFields.estado = asociado.estado;
    if (asociado.deuda !== undefined) updateFields.deuda = asociado.deuda;

    const { error } = await supabase.from("asociados").update(updateFields).eq("idsocio", asociado.id);
    if (error) {
      throw new Error("Hubo un error al guardar los cambios: " + error.message);
    }
    await refetch();
  };

  const deleteAsociado = async (asociadoId: string) => {
    const { error } = await supabase.from("asociados").delete().eq("idsocio", asociadoId);
    if (error) {
      throw new Error("Hubo un error al eliminar el asociado: " + error.message);
    }
    await refetch();
  };

  return {
    asociados,
    categorias,
    isLoading,
    createAsociado,
    updateAsociado,
    deleteAsociado,
    refetch
  };
}
