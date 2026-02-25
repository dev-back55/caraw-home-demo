export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      asociados: {
        Row: {
          catcuota: number | null
          categoria: string | null
          comercio: string | null
          created_at: string | null
          cuit: string | null
          deuda: number | null
          domicilio: string | null
          email: string | null
          estado: string | null
          fecha_ingreso: string
          id: string
          idclerk: string | null
          idsocio: string
          ingbrutos: string | null
          nombre: string
          telefono: string | null
        }
        Insert: {
          catcuota?: number | null
          categoria?: string | null
          comercio?: string | null
          created_at?: string | null
          cuit?: string | null
          deuda?: number | null
          domicilio?: string | null
          email?: string | null
          estado?: string | null
          fecha_ingreso?: string
          id?: string
          idclerk?: string | null
          idsocio: string
          ingbrutos?: string | null
          nombre: string
          telefono?: string | null
        }
        Update: {
          catcuota?: number | null
          categoria?: string | null
          comercio?: string | null
          created_at?: string | null
          cuit?: string | null
          deuda?: number | null
          domicilio?: string | null
          email?: string | null
          estado?: string | null
          fecha_ingreso?: string
          id?: string
          idclerk?: string | null
          idsocio?: string
          ingbrutos?: string | null
          nombre?: string
          telefono?: string | null
        }
        Relationships: []
      }
      catcuotas: {
        Row: {
          codigo: number | null
          created_at: string
          descripcion: string | null
          id: number
          valorcuota: number | null
        }
        Insert: {
          codigo?: number | null
          created_at?: string
          descripcion?: string | null
          id?: number
          valorcuota?: number | null
        }
        Update: {
          codigo?: number | null
          created_at?: string
          descripcion?: string | null
          id?: number
          valorcuota?: number | null
        }
        Relationships: []
      }
      cuotas: {
        Row: {
          asociado_id: string
          comprobante: string | null
          created_at: string | null
          estado: string | null
          fecha_pago: string | null
          fecha_vencimiento: string
          id: string
          metodo_pago: string | null
          monto: number
          periodo: string
          url_pago: string | null
        }
        Insert: {
          asociado_id: string
          comprobante?: string | null
          created_at?: string | null
          estado?: string | null
          fecha_pago?: string | null
          fecha_vencimiento: string
          id?: string
          metodo_pago?: string | null
          monto: number
          periodo: string
          url_pago?: string | null
        }
        Update: {
          asociado_id?: string
          comprobante?: string | null
          created_at?: string | null
          estado?: string | null
          fecha_pago?: string | null
          fecha_vencimiento?: string
          id?: string
          metodo_pago?: string | null
          monto?: number
          periodo?: string
          url_pago?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cuotas_asociado_id_fkey"
            columns: ["asociado_id"]
            isOneToOne: false
            referencedRelation: "asociados"
            referencedColumns: ["id"]
          },
        ]
      }
      pagos: {
        Row: {
          asociado_id: string
          comprobante: string | null
          created_at: string | null
          cuota_id: string
          estado: string | null
          fecha_pago: string
          id: string
          metodo_pago: string | null
          monto: number
          periodo: string | null
          usuario_id: string | null
        }
        Insert: {
          asociado_id: string
          comprobante?: string | null
          created_at?: string | null
          cuota_id: string
          estado?: string | null
          fecha_pago?: string
          id?: string
          metodo_pago?: string | null
          monto: number
          periodo?: string | null
          usuario_id?: string | null
        }
        Update: {
          asociado_id?: string
          comprobante?: string | null
          created_at?: string | null
          cuota_id?: string
          estado?: string | null
          fecha_pago?: string
          id?: string
          metodo_pago?: string | null
          monto?: number
          periodo?: string | null
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pagos_asociado_id_fkey"
            columns: ["asociado_id"]
            isOneToOne: false
            referencedRelation: "asociados"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pagos_cuota_id_fkey"
            columns: ["cuota_id"]
            isOneToOne: false
            referencedRelation: "cuotas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pagos_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      usuarios: {
        Row: {
          created_at: string | null
          email: string
          id: string
          idclerk: string | null
          nombre: string | null
          rol: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id: string
          idclerk?: string | null
          nombre?: string | null
          rol?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          idclerk?: string | null
          nombre?: string | null
          rol?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
