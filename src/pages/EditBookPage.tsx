import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookSummaryLayout from "@/components/BookSummaryLayout";
import type { Block } from "@blocknote/react";
import { fetchBook, updateBook } from "@/lib/bookApi";
import { useQuery } from "@tanstack/react-query";

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book } = useQuery(["book", id], () => fetchBook(id || ""), {
    enabled: !!id,
  });

  const [blocks, setBlocks] = useState<Block[]>(book?.blocks || []);

  const save = async () => {
    if (!id) return;
    await updateBook(id, { blocks });
    navigate(`/books/${id}`);
  };

  if (!book) return null;

  return (
    <BookSummaryLayout
      title={book.title}
      metadata={book}
      blocks={blocks}
      editingEnabled={true}
      onBlocksChange={setBlocks}
      onSave={save}
      onCancel={() => navigate(`/books/${id}`)}
    />
  );
};

export default EditBookPage;
