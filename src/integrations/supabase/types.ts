export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      book_age_applications: {
        Row: {
          age_group: string
          age_range: string | null
          book_id: string
          created_at: string
          developmental_considerations: string | null
          id: string
          practical_examples: Json | null
          specific_strategies: Json | null
        }
        Insert: {
          age_group: string
          age_range?: string | null
          book_id: string
          created_at?: string
          developmental_considerations?: string | null
          id?: string
          practical_examples?: Json | null
          specific_strategies?: Json | null
        }
        Update: {
          age_group?: string
          age_range?: string | null
          book_id?: string
          created_at?: string
          developmental_considerations?: string | null
          id?: string
          practical_examples?: Json | null
          specific_strategies?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "book_age_applications_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      book_central_messages: {
        Row: {
          book_id: string
          created_at: string
          id: string
          key_takeaway: string | null
          main_thesis: string | null
          one_sentence_summary: string | null
          proposed_solution: string | null
          target_problem: string | null
        }
        Insert: {
          book_id: string
          created_at?: string
          id?: string
          key_takeaway?: string | null
          main_thesis?: string | null
          one_sentence_summary?: string | null
          proposed_solution?: string | null
          target_problem?: string | null
        }
        Update: {
          book_id?: string
          created_at?: string
          id?: string
          key_takeaway?: string | null
          main_thesis?: string | null
          one_sentence_summary?: string | null
          proposed_solution?: string | null
          target_problem?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_central_messages_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      book_chapters: {
        Row: {
          book_id: string
          chapter_number: number
          created_at: string
          examples_case_studies: Json | null
          id: string
          key_points: Json | null
          main_takeaway: string | null
          practical_advice: Json | null
          title: string
        }
        Insert: {
          book_id: string
          chapter_number: number
          created_at?: string
          examples_case_studies?: Json | null
          id?: string
          key_points?: Json | null
          main_takeaway?: string | null
          practical_advice?: Json | null
          title: string
        }
        Update: {
          book_id?: string
          chapter_number?: number
          created_at?: string
          examples_case_studies?: Json | null
          id?: string
          key_points?: Json | null
          main_takeaway?: string | null
          practical_advice?: Json | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_chapters_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      book_core_concepts: {
        Row: {
          book_id: string
          concept_name: string
          created_at: string
          description: string | null
          id: string
          potential_challenges: string | null
          practical_application: string | null
          sort_order: number | null
          supporting_evidence: string | null
        }
        Insert: {
          book_id: string
          concept_name: string
          created_at?: string
          description?: string | null
          id?: string
          potential_challenges?: string | null
          practical_application?: string | null
          sort_order?: number | null
          supporting_evidence?: string | null
        }
        Update: {
          book_id?: string
          concept_name?: string
          created_at?: string
          description?: string | null
          id?: string
          potential_challenges?: string | null
          practical_application?: string | null
          sort_order?: number | null
          supporting_evidence?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_core_concepts_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      book_evidence_quality: {
        Row: {
          bias_assessment: string | null
          book_id: string
          created_at: string
          evidence_strength: string | null
          expert_credentials: string | null
          id: string
          research_based: boolean | null
          source_types: Json | null
          study_citations: number | null
        }
        Insert: {
          bias_assessment?: string | null
          book_id: string
          created_at?: string
          evidence_strength?: string | null
          expert_credentials?: string | null
          id?: string
          research_based?: boolean | null
          source_types?: Json | null
          study_citations?: number | null
        }
        Update: {
          bias_assessment?: string | null
          book_id?: string
          created_at?: string
          evidence_strength?: string | null
          expert_credentials?: string | null
          id?: string
          research_based?: boolean | null
          source_types?: Json | null
          study_citations?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "book_evidence_quality_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      book_expert_reflections: {
        Row: {
          best_fit_families: string | null
          book_id: string
          created_at: string
          id: string
          implementation_priority: string | null
          long_term_impact: string | null
          overall_assessment: string | null
          recommendation_level: string | null
        }
        Insert: {
          best_fit_families?: string | null
          book_id: string
          created_at?: string
          id?: string
          implementation_priority?: string | null
          long_term_impact?: string | null
          overall_assessment?: string | null
          recommendation_level?: string | null
        }
        Update: {
          best_fit_families?: string | null
          book_id?: string
          created_at?: string
          id?: string
          implementation_priority?: string | null
          long_term_impact?: string | null
          overall_assessment?: string | null
          recommendation_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_expert_reflections_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      book_implementation: {
        Row: {
          book_id: string
          common_obstacles: Json | null
          created_at: string
          difficulty_level: string | null
          family_adaptation: string | null
          getting_started: Json | null
          id: string
          success_metrics: Json | null
          time_investment: string | null
        }
        Insert: {
          book_id: string
          common_obstacles?: Json | null
          created_at?: string
          difficulty_level?: string | null
          family_adaptation?: string | null
          getting_started?: Json | null
          id?: string
          success_metrics?: Json | null
          time_investment?: string | null
        }
        Update: {
          book_id?: string
          common_obstacles?: Json | null
          created_at?: string
          difficulty_level?: string | null
          family_adaptation?: string | null
          getting_started?: Json | null
          id?: string
          success_metrics?: Json | null
          time_investment?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_implementation_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      books: {
        Row: {
          author: string
          created_at: string
          genre: string | null
          id: string
          isbn: string | null
          page_count: number | null
          publication_year: number | null
          reading_level: string | null
          target_audience: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          created_at?: string
          genre?: string | null
          id?: string
          isbn?: string | null
          page_count?: number | null
          publication_year?: number | null
          reading_level?: string | null
          target_audience?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          created_at?: string
          genre?: string | null
          id?: string
          isbn?: string | null
          page_count?: number | null
          publication_year?: number | null
          reading_level?: string | null
          target_audience?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_book_progress: {
        Row: {
          book_id: string
          bookmarks: Json | null
          completed_at: string | null
          created_at: string
          id: string
          notes: string | null
          progress_percentage: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          book_id: string
          bookmarks?: Json | null
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          progress_percentage?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          book_id?: string
          bookmarks?: Json | null
          completed_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          progress_percentage?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_book_progress_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["id"]
          },
        ]
      }
      white_noise_collections: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      white_noise_files: {
        Row: {
          collection_id: string | null
          created_at: string
          description: string | null
          duration_seconds: number | null
          encoding_format: string | null
          file_url: string
          id: string
          language: string | null
          title: string
        }
        Insert: {
          collection_id?: string | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          encoding_format?: string | null
          file_url: string
          id?: string
          language?: string | null
          title: string
        }
        Update: {
          collection_id?: string | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          encoding_format?: string | null
          file_url?: string
          id?: string
          language?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "white_noise_files_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "white_noise_collections"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          member_since: string | null
          parenting_style: string | null
          quiz_completed: boolean | null
          stripe_customer_id: string | null
          subscription_status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          member_since?: string | null
          parenting_style?: string | null
          quiz_completed?: boolean | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          member_since?: string | null
          parenting_style?: string | null
          quiz_completed?: boolean | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_user_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
