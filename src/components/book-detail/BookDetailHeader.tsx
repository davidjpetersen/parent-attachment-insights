import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BookDetailHeader = () => {
  return (
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
  );
};

export default BookDetailHeader;