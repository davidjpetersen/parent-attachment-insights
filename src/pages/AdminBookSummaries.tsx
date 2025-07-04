import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { BookTable } from "@/components/admin/BookTable";
import { EditBookDialog } from "@/components/admin/EditBookDialog";
import { AddBookForm } from "@/components/admin/AddBookForm";
import { ContentTypesGrid } from "@/components/admin/ContentTypesGrid";

interface Book {
  id: string;
  title: string;
  author: string;
  publication_year?: number;
  genre?: string;
  target_audience?: string;
  created_at: string;
}

type BookFormValues = {
  title: string;
  author: string;
  publication_year?: string | number;
  genre?: string;
  target_audience?: string;
};

const AdminBookSummaries = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching books:', error);
        return;
      }

      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async () => {
    if (!newBookTitle.trim() || !newBookAuthor.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and author",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('books')
        .insert([
          {
            title: newBookTitle.trim(),
            author: newBookAuthor.trim(),
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Book added successfully",
      });

      setNewBookTitle("");
      setNewBookAuthor("");
      fetchBooks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add book",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (book: Book) => {
    setEditingBook(book);
    setIsEditDialogOpen(true);
  };

  const updateBook = async (values: BookFormValues) => {
    if (!editingBook) return;

    try {
      const updateData: any = {
        title: values.title,
        author: values.author,
        genre: values.genre || null,
        target_audience: values.target_audience || null,
      };

      if (values.publication_year && values.publication_year !== "") {
        updateData.publication_year = parseInt(values.publication_year.toString());
      }

      const { error } = await supabase
        .from('books')
        .update(updateData)
        .eq('id', editingBook.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Book updated successfully",
      });

      setIsEditDialogOpen(false);
      setEditingBook(null);
      fetchBooks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update book",
        variant: "destructive",
      });
    }
  };

  const deleteBook = async (book: Book) => {
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', book.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Book deleted successfully",
      });

      fetchBooks();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete book",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading book summaries...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Book Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage book summaries and content</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary self-start sm:self-center">
          <BookOpen className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Content Manager</span>
          <span className="sm:hidden">Admin</span>
        </Badge>
      </div>

      <Tabs defaultValue="add-book" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="add-book" className="text-xs sm:text-sm">Add Book</TabsTrigger>
          <TabsTrigger value="books" className="text-xs sm:text-sm">All Books</TabsTrigger>
          <TabsTrigger value="content-types" className="text-xs sm:text-sm">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                All Books ({books.length})
              </CardTitle>
              <CardDescription>
                Manage existing book summaries and their content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BookTable 
                books={books} 
                onEditBook={openEditDialog} 
                onDeleteBook={deleteBook} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-book" className="space-y-4">
          <AddBookForm
            title={newBookTitle}
            author={newBookAuthor}
            onTitleChange={setNewBookTitle}
            onAuthorChange={setNewBookAuthor}
            onAddBook={addBook}
          />
        </TabsContent>

        <TabsContent value="content-types" className="space-y-4">
          <ContentTypesGrid />
        </TabsContent>
      </Tabs>

      <EditBookDialog
        book={editingBook}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdateBook={updateBook}
      />
    </div>
  );
};

export default AdminBookSummaries;