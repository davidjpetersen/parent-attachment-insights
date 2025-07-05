import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface PlanFeaturesCardProps {
  subscription: any;
}

const PlanFeaturesCard = ({ subscription }: PlanFeaturesCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Plan Includes</CardTitle>
        <CardDescription>Features available with your current plan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subscription ? (
            // Premium features
            <>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Unlimited book summaries</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Personalized insights</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Progress tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Expert guidance tools</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Community access</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Priority support</span>
              </div>
            </>
          ) : (
            // Free features
            <>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>3 book summaries</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Basic parenting quiz</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Community access</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Weekly newsletter</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanFeaturesCard;