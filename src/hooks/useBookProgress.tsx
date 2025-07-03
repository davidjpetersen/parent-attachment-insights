import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface UserBookProgress {
  id: string;
  user_id: string;
  book_id: string;
  progress_percentage: number;
  bookmarks: any;
  notes: string;
  completed_at: string | null;
}

export const useBookProgress = (bookId: string) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const progressQuery = useQuery({
    queryKey: ["bookProgress", bookId, user?.id],
    queryFn: async (): Promise<UserBookProgress | null> => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from("user_book_progress")
        .select("*")
        .eq("book_id", bookId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id && !!bookId
  });

  const updateProgressMutation = useMutation({
    mutationFn: async ({ progressPercentage, bookmarks, notes }: {
      progressPercentage?: number;
      bookmarks?: any[];
      notes?: string;
    }) => {
      if (!user?.id) throw new Error("User not authenticated");

      const updateData: any = {};
      if (progressPercentage !== undefined) updateData.progress_percentage = progressPercentage;
      if (bookmarks !== undefined) updateData.bookmarks = bookmarks;
      if (notes !== undefined) updateData.notes = notes;
      if (progressPercentage === 100) updateData.completed_at = new Date().toISOString();

      const { data, error } = await supabase
        .from("user_book_progress")
        .upsert({
          user_id: user.id,
          book_id: bookId,
          ...updateData
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookProgress", bookId, user?.id] });
    }
  });

  return {
    progress: progressQuery.data,
    isLoading: progressQuery.isLoading,
    error: progressQuery.error,
    updateProgress: updateProgressMutation.mutate,
    isUpdating: updateProgressMutation.isPending
  };
};