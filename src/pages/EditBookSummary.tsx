import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, BookOpen, Save } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  publication_year?: number;
  genre?: string;
  target_audience?: string;
  created_at: string;
}

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  publication_year: z.union([z.string(), z.number()]).optional(),
  genre: z.string().optional(),
  target_audience: z.string().optional(),
});

type BookFormValues = z.infer<typeof bookSchema>;

const EditBookSummary = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      publication_year: "",
      genre: "",
      target_audience: "",
    },
  });

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  useEffect(() => {
    if (book) {
      form.reset({
        title: book.title,
        author: book.author,
        publication_year: book.publication_year || "",
        genre: book.genre || "",
        target_audience: book.target_audience || "",
      });
    }
  }, [book, form]);

  const fetchBook = async () => {
    if (!bookId) return;

    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', bookId)
        .single();

      if (error) throw error;
      setBook(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch book",
        variant: "destructive",
      });
      navigate('/admin/book-summaries');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: BookFormValues) => {
    if (!book) return;

    setSaving(true);
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
        .eq('id', book.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Book updated successfully",
      });

      navigate('/admin/book-summaries');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update book",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading book...</div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Book not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-3 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/book-summaries">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Edit Book</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Update book information and metadata</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Book Details
          </CardTitle>
          <CardDescription>
            Edit the book information below and save your changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Book title" {...field} className="h-12 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author name" {...field} className="h-12 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="publication_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Publication Year</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="2024"
                          {...field}
                          value={field.value?.toString() || ""}
                          className="h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="genre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-medium">Genre</FormLabel>
                      <FormControl>
                        <Input placeholder="Parenting" {...field} className="h-12 text-base" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="target_audience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">Target Audience</FormLabel>
                    <FormControl>
                      <Input placeholder="Parents of toddlers" {...field} className="h-12 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/admin/book-summaries')}
                  className="w-full sm:w-auto h-12 text-base"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="w-full sm:w-auto h-12 text-base font-medium"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditBookSummary;