import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from "lucide-react";
import { BookData } from "@/hooks/useBookData";

interface CentralMessageProps {
  data: BookData;
}

const CentralMessage = ({ data }: CentralMessageProps) => {
  return (
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
  );
};

export default CentralMessage;