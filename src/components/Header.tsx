
import { Bell, Search, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSearch } from '@/context/SearchContext';
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useSupabaseAsociados } from "@/hooks/useSupabaseAsociados";
import { useSupabaseCuotas } from "@/hooks/useSupabaseCuotas";
import { useSupabasePagos } from "@/hooks/useSupabasePagos";

export function Header() {
  const { term, setTerm } = useSearch();
  const [localValue, setLocalValue] = useState(term);
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch real data from Supabase
  const { data: asociadosData } = useSupabaseAsociados();
  const { data: cuotasData } = useSupabaseCuotas();
  const { data: pagosData } = useSupabasePagos();

  const asociados = asociadosData || [];
  const cuotas = cuotasData || [];
  const pagos = pagosData || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  // Función para limpiar el input y el estado global
  const handleClear = () => {
    setLocalValue("");
    setTerm("");
  };

  // Normaliza textos
  const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  // Funciones para búsqueda con datos reales de Supabase
  const matchAsociados = (valor: string) => {
    if (!valor) return [];
    const v = normalize(valor);
    return asociados.filter(a =>
      normalize(a.nombre || '').includes(v) ||
      normalize(a.comercio || '').includes(v) ||
      normalize(a.email || '').includes(v) ||
      normalize(a.cuit || '').includes(v) ||
      normalize(a.categoria || '').includes(v)
    );
  };

  const matchCuotas = (valor: string) => {
    if (!valor) return [];
    const v = normalize(valor);
    return cuotas.filter(c =>
      normalize(c.asociado?.nombre || '').includes(v) ||
      normalize(c.asociado?.comercio || '').includes(v) ||
      normalize(c.periodo || '').includes(v) ||
      normalize(c.estado || '').includes(v) ||
      normalize(c.comprobante || '').includes(v)
    );
  };

  const matchPagos = (valor: string) => {
    if (!valor) return [];
    const v = normalize(valor);
    return pagos.filter(p =>
      normalize(p.asociado?.nombre || '').includes(v) ||
      normalize(p.asociado?.comercio || '').includes(v) ||
      normalize(p.comprobante || '').includes(v) ||
      normalize(p.metodo_pago || '').includes(v) ||
      normalize(p.estado || '').includes(v)
    );
  };

  const doSearch = () => {
    setTerm(localValue);

    // Orden de prioridad: asociados, cuotas, pagos
    const asociadosMatches = matchAsociados(localValue);
    const cuotasMatches = matchCuotas(localValue);
    const pagosMatches = matchPagos(localValue);

    if (asociadosMatches.length > 0) {
      if (location.pathname !== "/asociados") navigate("/asociados");
    } else if (cuotasMatches.length > 0) {
      if (location.pathname !== "/cuotas") navigate("/cuotas");
    } else if (pagosMatches.length > 0) {
      if (location.pathname !== "/pagos") navigate("/pagos");
    } else {
      // Default: Pagos
      if (location.pathname !== "/pagos") navigate("/pagos");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      doSearch();
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center gap-4">
        {/* LOGO AGREGADO */}
        <img
          src="/lovable-uploads/802f1823-b376-40ea-b87b-309982d8066b.png"
          alt="CCRAW logo"
          className="h-10 w-10 rounded-full object-contain mr-2"
          style={{ background: "#fff" }}
        />
        <SidebarTrigger className="text-gray-600 hover:text-gray-900" />

        <div className="flex-1 flex items-center gap-4">
          {/* Contenedor flex para la barra de búsqueda y acciones */}
          <div className="flex items-center w-full max-w-md space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <Input
                placeholder="Buscar asociados, cuotas, pagos..."
                className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white"
                value={localValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoComplete="off"
              />
              {localValue.length > 0 && (
                <button
                  type="button"
                  aria-label="Limpiar búsqueda"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={doSearch}
              type="button"
              className="shrink-0"
            >
              Buscar
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/*<Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>*/}

          {/* Reemplaza icono usuario por Clerk UserButton con menú */}
          <UserButton afterSignOutUrl="/login" />
        </div>
      </div>
    </header>
  );
}
