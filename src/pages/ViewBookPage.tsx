import { useParams } from "react-router-dom";
import BookSummaryLayout from "@/components/BookSummaryLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchBook } from "@/lib/bookApi";

const ViewBookPage = () => {
  const { id } = useParams();
  const { data: book } = useQuery(["book", id], () => fetchBook(id || ""), {
    enabled: !!id,
  });

  if (!book) return null;

  return (
    <BookSummaryLayout
      title={book.title}
      metadata={book}
      blocks={book.blocks}
      editingEnabled={false}
    />
  );
};

export default ViewBookPage;
