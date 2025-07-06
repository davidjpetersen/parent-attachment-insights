import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { BookTable } from "@/components/admin/BookTable";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";

interface Book {
  id: string;
  title: string;
  author: string;
  publication_year?: number;
  genre?: string;
  target_audience?: string;
  created_at: string;
}

const AdminBooks = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    data: books = [],
    isLoading: loading,
  } = useSupabaseQuery<Book[]>(
    ['books'],
    async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }
  );

  const deleteBookMutation = useMutation({
    mutationFn: async (book: Book) => {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', book.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Book deleted successfully' });
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete book',
        variant: 'destructive',
      });
    },
  });

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading books...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Link to="/admin" className="hover:text-foreground transition-colors">
            Admin
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Books</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Books</h1>
            <p className="text-lg text-muted-foreground">Manage your book collection</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <BookOpen className="w-4 h-4 mr-2" />
              {books.length} Books
            </Badge>
            <Button asChild>
              <Link to="/admin/books/add">
                <Plus className="w-4 h-4 mr-2" />
                Add Book
              </Link>
            </Button>
          </div>
        </div>

        {/* Books List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              All Books ({books.length})
            </CardTitle>
            <CardDescription>
              Manage your book summaries and content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BookTable
              books={books}
              onDeleteBook={(book) => deleteBookMutation.mutate(book)}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBooks;