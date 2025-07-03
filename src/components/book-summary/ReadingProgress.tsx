import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";

interface ReadingProgressProps {
  readingProgress: number;
  updateProgress: (update: { progressPercentage?: number; bookmarks?: any[] }) => void;
  progress: any;
  expandedChapter: number | null;
}

const ReadingProgress = ({ readingProgress, updateProgress, progress, expandedChapter }: ReadingProgressProps) => {
  const { user } = useAuth();

  return (
    <Card className="shadow-md border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Reading Progress</h3>
          <span className="text-sm text-muted-foreground">{readingProgress}% complete</span>
        </div>
        <Progress value={readingProgress} className="h-2 mb-4" />
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => updateProgress({ progressPercentage: Math.min(readingProgress + 10, 100) })}
            className="hover:bg-primary-soft hover:text-primary hover:border-primary"
            disabled={!user}
          >
            Mark Progress
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="hover:bg-accent-soft hover:text-accent hover:border-accent"
            onClick={() => {
              const newBookmarks = [...(progress?.bookmarks || []), { chapter: expandedChapter, timestamp: new Date().toISOString() }];
              updateProgress({ bookmarks: newBookmarks });
            }}
            disabled={!user}
          >
            Add Bookmark
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingProgress;