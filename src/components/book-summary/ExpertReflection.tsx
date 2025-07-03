import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { BookData } from "@/hooks/useBookData";

interface ExpertReflectionProps {
  data: BookData;
}

const ExpertReflection = ({ data }: ExpertReflectionProps) => {
  return (
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
  );
};

export default ExpertReflection;