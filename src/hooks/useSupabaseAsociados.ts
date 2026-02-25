
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

export const useSupabaseAsociados = () => {
  return useQuery({
    queryKey: ["asociados"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("asociados")
        .select("*")
        .order("nombre", { ascending: true });
      if (error) throw error;
      return data as Database["public"]["Tables"]["asociados"]["Row"][];
    }
  });
};
