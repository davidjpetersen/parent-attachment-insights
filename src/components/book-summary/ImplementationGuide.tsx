import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Target } from "lucide-react";
import { BookData } from "@/hooks/useBookData";

interface ImplementationGuideProps {
  data: BookData;
}

const ImplementationGuide = ({ data }: ImplementationGuideProps) => {
  return (
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
  );
};

export default ImplementationGuide;