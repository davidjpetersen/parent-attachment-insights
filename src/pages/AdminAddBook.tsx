import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BookOpen, ChevronRight, Plus, Upload, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { JsonBookUpload } from "@/components/admin/JsonBookUpload";

const AdminAddBook = () => {
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

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
      navigate("/admin/books");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add book",
        variant: "destructive",
      });
    }
  };

  const handleBookAdded = () => {
    navigate("/admin/books");
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Link to="/admin" className="hover:text-foreground transition-colors">
            Admin
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/admin/books" className="hover:text-foreground transition-colors">
            Books
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Add Book</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Add Book</h1>
            <p className="text-lg text-muted-foreground">Add a new book manually or via JSON upload</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <BookOpen className="w-4 h-4 mr-2" />
              Book Manager
            </Badge>
            <Button variant="outline" asChild>
              <Link to="/admin/books">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Books
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Manual Book Entry */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Manual Entry
              </CardTitle>
              <CardDescription>
                Add a new book with basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bookTitle" className="text-base font-medium">Book Title</Label>
                  <Input
                    id="bookTitle"
                    placeholder="Enter book title"
                    value={newBookTitle}
                    onChange={(e) => setNewBookTitle(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="bookAuthor" className="text-base font-medium">Author</Label>
                  <Input
                    id="bookAuthor"
                    placeholder="Enter author name"
                    value={newBookAuthor}
                    onChange={(e) => setNewBookAuthor(e.target.value)}
                    className="h-12 text-base"
                  />
                </div>
              </div>
              <Button 
                onClick={addBook} 
                disabled={!newBookTitle.trim() || !newBookAuthor.trim()}
                className="w-full h-12 text-base font-medium"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Book
              </Button>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-sm text-muted-foreground font-medium">OR</span>
            <Separator className="flex-1" />
          </div>

          {/* JSON Upload */}
          <JsonBookUpload onBookAdded={handleBookAdded} />
        </div>
      </div>
    </div>
  );
};

export default AdminAddBook;