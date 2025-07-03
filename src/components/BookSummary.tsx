import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Clock, Star, Users, Target, Brain, Heart, CheckCircle } from "lucide-react";
import { useBookProgress } from "@/hooks/useBookProgress";
import { useAuth } from "@/hooks/useAuth";
import { BookData } from "@/hooks/useBookData";

interface BookSummaryProps {
  data: BookData;
}

const BookSummary = ({ data }: BookSummaryProps) => {
  const { user } = useAuth();
  const { progress, updateProgress } = useBookProgress(data.id);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  
  const readingProgress = progress?.progress_percentage || 0;

  const toggleChapter = (chapterNumber: number) => {
    setExpandedChapter(expandedChapter === chapterNumber ? null : chapterNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        
        {/* Hero Section */}
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

        {/* Reading Progress */}
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

        {/* Central Message */}
        <Card className="shadow-md border-0 bg-primary-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <CardTitle className="text-primary">Key Takeaway</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <blockquote className="text-lg text-primary leading-relaxed font-medium italic border-l-4 border-primary pl-4">
              "{data.central_message.key_takeaway}"
            </blockquote>
            <div className="mt-4 p-4 bg-white rounded-lg">
              <p className="text-sm text-muted-foreground mb-2 font-medium">One-sentence summary:</p>
              <p className="text-foreground">{data.central_message.one_sentence_summary}</p>
            </div>
          </CardContent>
        </Card>

        {/* Core Concepts */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Core Concepts
          </h2>
          {data.core_concepts.map((concept: any, index: number) => (
            <Card key={index} className="shadow-md border-0 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">{concept.concept_name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{concept.description}</p>
                
                <div className="p-4 bg-accent-soft rounded-lg">
                  <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Practical Application
                  </h4>
                  <p className="text-sm text-foreground">{concept.practical_application}</p>
                </div>

                {concept.potential_challenges && (
                  <div className="p-4 bg-secondary-soft rounded-lg">
                    <h4 className="font-semibold text-secondary mb-2">Potential Challenges</h4>
                    <p className="text-sm text-foreground">{concept.potential_challenges}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Age Applications */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Age-Specific Applications
          </h2>
          <div className="grid gap-4">
            {Object.entries(data.age_applications).map(([ageGroup, info]: [string, any]) => (
              <Card key={ageGroup} className="shadow-md border-0">
                <CardHeader>
                  <CardTitle className="text-lg text-foreground capitalize">
                    {ageGroup.replace('_', ' ')} ({info.age_range})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Strategies</h4>
                    <ul className="space-y-1">
                      {info.specific_strategies.map((strategy: string, index: number) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          {strategy}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-card-subtle rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Key Considerations</h4>
                    <p className="text-sm text-muted-foreground">{info.developmental_considerations}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Implementation Guide */}
        <Card className="shadow-md border-0 bg-success-soft">
          <CardHeader>
            <CardTitle className="text-success flex items-center gap-2">
              <Target className="w-5 h-5" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-success mb-3">First Steps</h4>
              <ol className="space-y-2">
                {data.implementation.getting_started.map((step: string, index: number) => (
                  <li key={index} className="text-sm text-foreground flex items-start gap-3">
                    <span className="bg-success text-success-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-success mb-2">Time Investment</h4>
                <p className="text-sm text-foreground">{data.implementation.time_investment}</p>
              </div>
              <div>
                <h4 className="font-semibold text-success mb-2">Difficulty Level</h4>
                <Badge variant="outline" className="border-success text-success capitalize">
                  {data.implementation.difficulty_level}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expert Reflection */}
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Heart className="w-5 h-5 text-destructive" />
              Expert Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-accent rounded-lg text-white">
              <p className="font-semibold mb-2">Overall Assessment</p>
              <p className="text-accent-foreground/90">{data.expert_reflection.overall_assessment}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Recommendation Level</h4>
                <Badge variant="outline" className="border-accent text-accent capitalize">
                  {data.expert_reflection.recommendation_level.replace('_', ' ')}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Implementation Priority</h4>
                <Badge variant="outline" className="border-primary text-primary capitalize">
                  {data.expert_reflection.implementation_priority}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chapter Navigation */}
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

        {/* Bottom CTA */}
        <Card className="shadow-md border-0 bg-gradient-primary text-white">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Apply These Insights?</h3>
            <p className="text-primary-foreground/90 mb-4">
              Start implementing these evidence-based strategies in your daily parenting.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="secondary" size="sm">
                Save Summary
              </Button>
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-primary">
                Share Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookSummary;