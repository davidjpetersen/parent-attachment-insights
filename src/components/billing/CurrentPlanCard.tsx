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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Current Plan
            </CardTitle>
            <CardDescription>Your subscription status and details</CardDescription>
          </div>
          {isActiveSubscription && (
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </Badge>
          )}
          {isPastDue && (
            <Badge variant="destructive">
              <AlertCircle className="w-3 h-3 mr-1" />
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
      <CardContent className="space-y-4">
        {subscription ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Plan</p>
                <p className="text-lg font-semibold">Premium</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Billing Cycle</p>
                <p className="text-lg font-semibold">Monthly</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Amount</p>
                <p className="text-lg font-semibold">$14.99/month</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next Billing Date</p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date().toLocaleDateString()} {/* This would be actual next billing date */}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Started</p>
                <p>{new Date(subscription.created_at || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">Free Plan</h3>
            <p className="text-muted-foreground mb-4">
              You're currently on the free plan with limited access to features.
            </p>
            <Button asChild>
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