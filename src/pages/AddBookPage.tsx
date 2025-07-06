import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookSummaryLayout from "@/components/BookSummaryLayout";
import type { Block } from "@blocknote/react";
import { createBook } from "@/lib/bookApi";

const AddBookPage = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [metadata] = useState({ author: "", page_count: 0, publication_year: 0 });
  const navigate = useNavigate();

  const save = async () => {
    const newId = await createBook({ metadata, blocks });
    navigate(`/books/${newId}`);
  };

  return (
    <BookSummaryLayout
      title="New Book"
      metadata={metadata}
      blocks={blocks}
      editingEnabled={true}
      onBlocksChange={setBlocks}
      onSave={save}
      onCancel={() => navigate(-1)}
    />
  );
};

export default AddBookPage;
