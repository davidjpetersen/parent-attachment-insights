import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; description?: string }[];
  category: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "household_structure",
    question: "What best describes your household structure?",
    category: "Family Structure",
    options: [
      { value: "single", label: "Single parent", description: "Primary caregiver managing alone" },
      { value: "partnered", label: "Partnered/Married", description: "Two-parent household" },
      { value: "blended", label: "Blended family", description: "Multiple family units combined" },
      { value: "kinship", label: "Kinship care", description: "Extended family caregiving" },
      { value: "foster", label: "Foster/Adoptive", description: "Caring for non-biological children" }
    ]
  },
  {
    id: "caregiving_role",
    question: "How would you describe your caregiving role?",
    category: "Caregiving Setup",
    options: [
      { value: "full_time", label: "Full-time primary caregiver", description: "Home with children most of the time" },
      { value: "fifty_fifty", label: "50/50 shared care", description: "Equal caregiving with partner/co-parent" },
      { value: "working_parent", label: "Working parent", description: "Balancing career and parenting" },
      { value: "long_distance", label: "Long-distance parent", description: "Parenting from afar due to circumstances" },
      { value: "gig_shift", label: "Gig/shift work", description: "Irregular schedule affecting caregiving" }
    ]
  },
  {
    id: "child_needs",
    question: "Do any of your children have specific needs?",
    category: "Child Characteristics",
    options: [
      { value: "neurotypical", label: "Neurotypical development", description: "No specific developmental needs" },
      { value: "neurodivergent", label: "Neurodivergent", description: "ADHD, autism, learning differences" },
      { value: "disabled", label: "Physical or intellectual disabilities", description: "Requiring adaptive parenting approaches" },
      { value: "medical", label: "Medically fragile", description: "Ongoing medical care needs" },
      { value: "mixed", label: "Mixed needs", description: "Children with varying needs" }
    ]
  },
  {
    id: "emotional_state",
    question: "How are you feeling in your parenting journey right now?",
    category: "Emotional Wellbeing",
    options: [
      { value: "thriving", label: "Thriving and confident", description: "Feeling empowered and connected" },
      { value: "managing", label: "Managing well", description: "Mostly on top of things" },
      { value: "overwhelmed", label: "Overwhelmed", description: "Struggling to keep up" },
      { value: "isolated", label: "Isolated and alone", description: "Lacking support and connection" },
      { value: "grieving", label: "Processing loss/grief", description: "Dealing with significant life changes" }
    ]
  },
  {
    id: "parenting_values",
    question: "Which parenting approach resonates most with you?",
    category: "Parenting Philosophy",
    options: [
      { value: "gentle", label: "Gentle/Attachment parenting", description: "Connection-focused, empathetic approach" },
      { value: "structured", label: "Structured/Behavioral", description: "Clear boundaries and expectations" },
      { value: "montessori", label: "Montessori/Child-led", description: "Respecting child's natural development" },
      { value: "reparenting", label: "Reparenting approach", description: "Healing your own childhood while parenting" },
      { value: "faith_based", label: "Faith-based parenting", description: "Guided by spiritual/religious values" }
    ]
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [quizQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentAnswer = answers[quizQuestions[currentQuestion]?.id];

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">Quiz Complete!</CardTitle>
            <CardDescription>
              Thank you for taking the time to help us understand your family's unique needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="p-6 bg-gradient-primary rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Your Personalized Journey Begins</h3>
              <p className="text-primary-foreground/90">
                Based on your responses, we're creating a customized toolkit of resources, 
                strategies, and support designed specifically for your family's situation.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-accent-soft rounded-lg">
                <h4 className="font-medium text-accent-foreground mb-1">Tailored Resources</h4>
                <p className="text-muted-foreground">Content matched to your family structure and needs</p>
              </div>
              <div className="p-4 bg-secondary-soft rounded-lg">
                <h4 className="font-medium text-secondary-foreground mb-1">Smart Recommendations</h4>
                <p className="text-muted-foreground">Tools prioritized for your current situation</p>
              </div>
              <div className="p-4 bg-primary-soft rounded-lg">
                <h4 className="font-medium text-primary-foreground mb-1">Ongoing Support</h4>
                <p className="text-muted-foreground">Resources that grow with your family</p>
              </div>
            </div>
            <Button size="lg" className="w-full">
              Explore Your Personalized Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-primary">Family Assessment</h1>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="shadow-md">
          <CardHeader>
            <div className="text-sm text-muted-foreground mb-2">
              {quizQuestions[currentQuestion]?.category}
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {quizQuestions[currentQuestion]?.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={currentAnswer || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {quizQuestions[currentQuestion]?.options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="text-base font-medium cursor-pointer">
                      {option.label}
                    </Label>
                    {option.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!currentAnswer}
            className="flex items-center gap-2"
          >
            {currentQuestion === quizQuestions.length - 1 ? "Complete Quiz" : "Next"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;