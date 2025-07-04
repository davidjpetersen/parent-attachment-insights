import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, Plus, Edit, Trash, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  author: string;
  publication_year?: number;
  genre?: string;
  target_audience?: string;
  created_at: string;
}

const AdminBookSummaries = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
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
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Admin
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Book Summary Management</h1>
            <p className="text-muted-foreground">Manage book summaries and related content</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          <BookOpen className="w-4 h-4 mr-2" />
          Content Manager
        </Badge>
      </div>

      <Tabs defaultValue="books" className="space-y-4">
        <TabsList>
          <TabsTrigger value="books">Books Overview</TabsTrigger>
          <TabsTrigger value="add-book">Add New Book</TabsTrigger>
          <TabsTrigger value="content-types">Content Types</TabsTrigger>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <div className="font-medium">{book.title}</div>
                      </TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.publication_year || 'N/A'}</TableCell>
                      <TableCell>
                        {book.genre ? (
                          <Badge variant="outline">{book.genre}</Badge>
                        ) : (
                          'N/A'
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(book.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-book" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Book
              </CardTitle>
              <CardDescription>
                Add a new book to create summaries and content for
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bookTitle">Book Title</Label>
                  <Input
                    id="bookTitle"
                    placeholder="Enter book title"
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="bookAuthor">Author</Label>
                  <Input
                    id="bookAuthor"
                    placeholder="Enter author name"
                    value={newBookAuthor}
                    onChange={(e) => setNewBookAuthor(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={addBook} disabled={!newBookTitle.trim() || !newBookAuthor.trim()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Book
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content-types" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Book Summary Content Types</CardTitle>
              <CardDescription>
                Manage different types of content for book summaries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Central Messages</h3>
                  <p className="text-sm text-muted-foreground mb-3">Main thesis and key takeaways</p>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Core Concepts</h3>
                  <p className="text-sm text-muted-foreground mb-3">Key concepts and practical applications</p>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Chapters</h3>
                  <p className="text-sm text-muted-foreground mb-3">Chapter summaries and key points</p>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Age Applications</h3>
                  <p className="text-sm text-muted-foreground mb-3">Age-specific strategies and examples</p>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Implementation Guide</h3>
                  <p className="text-sm text-muted-foreground mb-3">Getting started and success metrics</p>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">Expert Reflections</h3>
                  <p className="text-sm text-muted-foreground mb-3">Expert assessments and recommendations</p>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminBookSummaries;