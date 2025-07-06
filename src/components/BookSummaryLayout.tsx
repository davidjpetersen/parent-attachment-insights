import { Block, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/style.css";

export interface BookSummaryLayoutProps {
  title: string;
  metadata: Record<string, any>;
  blocks: Block[];
  editingEnabled: boolean;
  onBlocksChange?: (blocks: Block[]) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

const BookSummaryLayout = ({
  title,
  metadata,
  blocks,
  editingEnabled,
  onBlocksChange,
  onSave,
  onCancel,
}: BookSummaryLayoutProps) => {

  const editor = useCreateBlockNote({ initialContent: blocks });

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6">
      {/* Title and metadata */}
      <div className="bg-gradient-hero text-white p-8 rounded-lg shadow-colored">
        <h1 className="text-2xl font-bold mb-1 leading-tight">{title}</h1>
        {metadata.author && (
          <p className="text-white/90 text-lg mb-4">by {metadata.author}</p>
        )}
        <div className="flex gap-4 text-sm text-white/80">
          {metadata.page_count && (
            <span>{metadata.page_count} pages</span>
          )}
          {metadata.publication_year && (
            <span>{metadata.publication_year}</span>
          )}
        </div>
      </div>

      {/* Content blocks */}
      <div className="bg-white p-4 rounded-md shadow">
        <BlockNoteView
          editor={editor}
          editable={editingEnabled}
          onChange={(b) => onBlocksChange && onBlocksChange(b)}
        />
      </div>

      {/* Controls */}
      {editingEnabled && (
        <div className="summary-controls flex gap-2 justify-end">
          <button
            className="px-4 py-2 rounded-md bg-primary text-white"
            onClick={onSave}
          >
            Save
          </button>
          <button
            className="px-4 py-2 rounded-md border"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default BookSummaryLayout;
