
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export const useSupabaseCuotas = () => {
  return useQuery({
    queryKey: ["cuotas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cuotas")
        .select("*, asociado:asociado_id(nombre, comercio)")
        .order("fecha_vencimiento", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
    staleTime: 0, // Los datos se consideran obsoletos inmediatamente
    gcTime: 0, // No cachear los datos
    refetchOnWindowFocus: true,
    refetchOnMount: true
  });
};
