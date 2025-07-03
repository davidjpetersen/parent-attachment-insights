import { useParams } from "react-router-dom";
import BookSummary from "@/components/BookSummary";
import { useBookData } from "@/hooks/useBookData";
import BookDetailHeader from "@/components/book-detail/BookDetailHeader";
import BookDetailLoading from "@/components/book-detail/BookDetailLoading";
import BookDetailError from "@/components/book-detail/BookDetailError";

const BookDetail = () => {
  const { bookId } = useParams();
  const { data: bookData, isLoading, error } = useBookData(bookId || "");
  
  if (isLoading) {
    return <BookDetailLoading />;
  }

  if (error || !bookData) {
    return <BookDetailError />;
  }
  
  return (
    <div>
      <BookDetailHeader />
      <BookSummary data={bookData} />
    </div>
  );
};

export default BookDetail;