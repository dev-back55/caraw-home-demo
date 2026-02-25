
import { useState, useEffect, useMemo } from 'react';
import { useSearch } from '@/context/SearchContext';
import { Asociado } from './types';

export function useAsociadosFilters(asociados: Asociado[]) {
  const { term } = useSearch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => { 
    setSearchTerm(term || ''); 
  }, [term]);

  const asociadosFiltrados = useMemo(() => {
    return asociados.filter(a => {
      const texto = (a.nombre + a.comercio + a.email).toLowerCase();
      const busqueda = searchTerm.toLowerCase();
      const coincideTexto = texto.includes(busqueda);
      const coincideCategoria = selectedCategory === "all" || a.categoria === selectedCategory;
      return coincideTexto && coincideCategoria;
    });
  }, [asociados, searchTerm, selectedCategory]);

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    asociadosFiltrados
  };
}
