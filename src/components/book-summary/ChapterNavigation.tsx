import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle } from "lucide-react";
import { BookData } from "@/hooks/useBookData";

interface ChapterNavigationProps {
  data: BookData;
  expandedChapter: number | null;
  toggleChapter: (chapterNumber: number) => void;
}

const ChapterNavigation = ({ data, expandedChapter, toggleChapter }: ChapterNavigationProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        Chapters ({data.chapters.length})
      </h2>
      {data.chapters.slice(0, 5).map((chapter: any) => (
        <Card 
          key={chapter.chapter_number} 
          className="shadow-md border-0 cursor-pointer hover:shadow-lg transition-all duration-300"
          onClick={() => toggleChapter(chapter.chapter_number)}
        >
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center justify-between">
              <span>{chapter.title}</span>
              <Badge variant="outline">{chapter.chapter_number}</Badge>
            </CardTitle>
          </CardHeader>
          {expandedChapter === chapter.chapter_number && (
            <CardContent className="space-y-4 animate-in slide-in-from-top-2">
              <p className="text-muted-foreground italic">{chapter.main_takeaway}</p>
              
              {chapter.key_points && chapter.key_points.length > 0 && (
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Key Points</h4>
                  <ul className="space-y-1">
                    {chapter.key_points.map((point: string, index: number) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          )}
        </Card>
      ))}
      
      {data.chapters.length > 5 && (
        <Button variant="outline" className="w-full hover:bg-primary-soft hover:text-primary hover:border-primary">
          View All {data.chapters.length} Chapters
        </Button>
      )}
    </div>
  );
};

export default ChapterNavigation;