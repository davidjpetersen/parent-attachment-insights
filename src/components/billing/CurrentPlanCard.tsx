import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CurrentPlanCardProps {
  subscription: any;
}

const CurrentPlanCard = ({ subscription }: CurrentPlanCardProps) => {
  const isActiveSubscription = subscription?.subscription_status === 'active';
  const isPastDue = subscription?.subscription_status === 'past_due';
  const isCanceled = subscription?.subscription_status === 'canceled';

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Current Plan</CardTitle>
          {isActiveSubscription && (
            <Badge variant="outline" className="text-green-600 border-green-200">
              Active
            </Badge>
          )}
          {isPastDue && (
            <Badge variant="destructive">
              Past Due
            </Badge>
          )}
          {isCanceled && (
            <Badge variant="outline">
              Canceled
            </Badge>
          )}
          {!subscription && (
            <Badge variant="outline">
              Free Plan
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-0 space-y-4">
        {subscription ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium">Premium</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">$14.99/month</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Next billing</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <div className="py-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium">Free</span>
            </div>
            <Button asChild size="sm">
              <Link to="/subscription">
                Upgrade to Premium
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentPlanCard;