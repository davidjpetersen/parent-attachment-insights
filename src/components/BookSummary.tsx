import { useState } from "react";
import { useBookProgress } from "@/hooks/useBookProgress";
import { BookData } from "@/hooks/useBookData";
import BookHero from "./book-summary/BookHero";
import ReadingProgress from "./book-summary/ReadingProgress";
import CentralMessage from "./book-summary/CentralMessage";
import CoreConcepts from "./book-summary/CoreConcepts";
import AgeApplications from "./book-summary/AgeApplications";
import ImplementationGuide from "./book-summary/ImplementationGuide";
import ExpertReflection from "./book-summary/ExpertReflection";
import ChaptersCarousel from "./book-summary/ChaptersCarousel";
import CallToAction from "./book-summary/CallToAction";

interface BookSummaryProps {
  data: BookData;
}

const BookSummary = ({ data }: BookSummaryProps) => {
  const { progress, updateProgress } = useBookProgress(data.id);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  
  const readingProgress = progress?.progress_percentage || 0;

  const toggleChapter = (chapterNumber: number) => {
    setExpandedChapter(expandedChapter === chapterNumber ? null : chapterNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        <BookHero data={data} />
        <ReadingProgress 
          readingProgress={readingProgress}
          updateProgress={updateProgress}
          progress={progress}
          expandedChapter={expandedChapter}
        />
        <CentralMessage data={data} />
        <CoreConcepts data={data} />
        <AgeApplications data={data} />
        <ImplementationGuide data={data} />
        <ExpertReflection data={data} />
        <ChaptersCarousel
          data={data}
          expandedChapter={expandedChapter}
          toggleChapter={toggleChapter}
        />
        <CallToAction />
      </div>
    </div>
  );
};

export default BookSummary;