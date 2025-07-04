import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface AddBookFormProps {
  title: string;
  author: string;
  onTitleChange: (title: string) => void;
  onAuthorChange: (author: string) => void;
  onAddBook: () => void;
}

export const AddBookForm = ({ title, author, onTitleChange, onAuthorChange, onAddBook }: AddBookFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Book
        </CardTitle>
        <CardDescription>
          Add a new book to create summaries and content for
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="bookTitle" className="text-base font-medium">Book Title</Label>
            <Input
              id="bookTitle"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              className="h-12 text-base"
            />
          </div>
          <div>
            <Label htmlFor="bookAuthor" className="text-base font-medium">Author</Label>
            <Input
              id="bookAuthor"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => onAuthorChange(e.target.value)}
              className="h-12 text-base"
            />
          </div>
        </div>
        <Button 
          onClick={onAddBook} 
          disabled={!title.trim() || !author.trim()}
          className="w-full h-12 text-base font-medium"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Book
        </Button>
      </CardContent>
    </Card>
  );
};