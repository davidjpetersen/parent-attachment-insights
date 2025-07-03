import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, CheckCircle } from "lucide-react";
import { BookData } from "@/hooks/useBookData";

interface CoreConceptsProps {
  data: BookData;
}

const CoreConcepts = ({ data }: CoreConceptsProps) => {
  return (
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
  );
};

export default CoreConcepts;