import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BookDetailError = () => {
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
};

export default BookDetailError;