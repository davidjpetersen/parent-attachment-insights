import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BookOpen } from "lucide-react";
import { BookData } from "@/hooks/useBookData";

interface ChaptersCarouselProps {
  data: BookData;
  expandedChapter: number | null;
  toggleChapter: (chapterNumber: number) => void;
}

const ChaptersCarousel = ({ data, expandedChapter, toggleChapter }: ChaptersCarouselProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        Chapters ({data.chapters.length})
      </h2>
      <Carousel className="w-full">
        <CarouselContent>
          {data.chapters.map((chapter) => (
            <CarouselItem
              key={chapter.chapter_number}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <Card
                className="shadow-md border-0 cursor-pointer hover:shadow-lg transition-all duration-300 h-full"
                onClick={() => toggleChapter(chapter.chapter_number)}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-foreground flex items-center justify-between">
                    <span>{chapter.title}</span>
                    <Badge variant="outline">{chapter.chapter_number}</Badge>
                  </CardTitle>
                </CardHeader>
                {expandedChapter === chapter.chapter_number && (
                  <CardContent className="space-y-2 animate-in slide-in-from-top-2">
                    <p className="text-muted-foreground italic">
                      {chapter.main_takeaway}
                    </p>
                    {chapter.key_points && chapter.key_points.length > 0 && (
                      <ul className="list-disc list-inside space-y-1">
                        {chapter.key_points.map((point, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                )}
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ChaptersCarousel;
