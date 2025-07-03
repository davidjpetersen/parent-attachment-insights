import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import BookSummary from "@/components/BookSummary";
import { useBookData } from "@/hooks/useBookData";

const BookDetail = () => {
  const { bookId } = useParams();
  const { data: bookData, isLoading, error } = useBookData(bookId || "");
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading book summary...</span>
        </div>
      </div>
    );
  }

  if (error || !bookData) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-destructive mb-2">Book Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The book you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Button asChild variant="outline">
            <Link to="/bookshelf">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Bookshelf
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {/* Navigation Header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/bookshelf">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Bookshelf
            </Link>
          </Button>
        </div>
      </div>
      
      <BookSummary data={bookData} />
    </div>
  );
};

export default BookDetail;