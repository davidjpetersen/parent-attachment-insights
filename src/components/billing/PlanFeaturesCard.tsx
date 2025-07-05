import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface PlanFeaturesCardProps {
  subscription: any;
}

const PlanFeaturesCard = ({ subscription }: PlanFeaturesCardProps) => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pb-3">
        <CardTitle className="text-lg font-medium">Features</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-2">
          {subscription ? (
            // Premium features
            <>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Unlimited book summaries</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Personalized insights</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Progress tracking</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Priority support</span>
              </div>
            </>
          ) : (
            // Free features
            <>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>3 book summaries</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Basic parenting quiz</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Community access</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanFeaturesCard;