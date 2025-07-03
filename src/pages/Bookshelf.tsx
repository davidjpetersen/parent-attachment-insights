import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useBookProgress } from "@/hooks/useBookProgress";
import { useAuth } from "@/hooks/useAuth";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  page_count: number;
  publication_year: number;
}

const BookCard = ({ book }: { book: Book }) => {
  const { user } = useAuth();
  const { progress } = useBookProgress(book.id);
  
  return (
    <Card className="shadow-md border-0 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-foreground line-clamp-2">
              {book.title}
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-1">by {book.author}</p>
          </div>
          <Badge variant="outline" className="border-primary text-primary ml-2">
            {book.genre.split(',')[0]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{book.page_count} pages</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{book.publication_year}</span>
          </div>
        </div>
        
        {user && progress && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Reading Progress</span>
              <span className="text-sm text-muted-foreground">{progress.progress_percentage}%</span>
            </div>
            <Progress value={progress.progress_percentage} className="h-2" />
          </div>
        )}
        
        <Button asChild className="w-full">
          <Link to={`/book/${book.id}`}>
            <BookOpen className="w-4 h-4 mr-2" />
            View Summary
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

const Bookshelf = () => {
  const { data: books, isLoading, error } = useQuery({
    queryKey: ["books"],
    queryFn: async (): Promise<Book[]> => {
      const { data, error } = await supabase
        .from("books")
        .select("id, title, author, genre, page_count, publication_year")
        .order("title");

      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading your bookshelf...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-destructive mb-2">Error Loading Books</h2>
            <p className="text-muted-foreground">
              There was an error loading your bookshelf. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Bookshelf</h1>
          <p className="text-muted-foreground">
            Discover evidence-based parenting insights from expert-curated books
          </p>
        </div>

        {/* Books Grid */}
        {books && books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No Books Available</h2>
            <p className="text-muted-foreground">
              Check back soon for new book summaries and parenting insights.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookshelf;