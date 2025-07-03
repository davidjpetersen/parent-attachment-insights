import { Loader2 } from "lucide-react";

const BookDetailLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span>Loading book summary...</span>
      </div>
    </div>
  );
};

export default BookDetailLoading;