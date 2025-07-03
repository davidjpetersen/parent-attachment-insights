import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Star } from "lucide-react";
import { BookData } from "@/hooks/useBookData";

interface BookHeroProps {
  data: BookData;
}

const BookHero = ({ data }: BookHeroProps) => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-hero p-8 text-white shadow-colored">
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <BookOpen className="w-6 h-6" />
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {data.metadata.genre}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold mb-2 leading-tight">
          {data.metadata.title}
        </h1>
        <p className="text-white/90 text-lg mb-4">
          by {data.metadata.author}
        </p>
        <div className="flex items-center gap-4 text-sm text-white/80">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{data.metadata.page_count} pages</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            <span>{data.metadata.publication_year}</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/10"></div>
    </div>
  );
};

export default BookHero;