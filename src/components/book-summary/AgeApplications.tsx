import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle } from "lucide-react";
import { BookData } from "@/hooks/useBookData";

interface AgeApplicationsProps {
  data: BookData;
}

const AgeApplications = ({ data }: AgeApplicationsProps) => {
  return (
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
  );
};

export default AgeApplications;