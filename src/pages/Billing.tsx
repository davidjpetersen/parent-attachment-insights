import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  ArrowLeft,
  Settings,
  Download,
  Bell
} from 'lucide-react';
import { useStripe } from '@/hooks/useStripe';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { formatPrice } from '@/lib/stripe';

const Billing = () => {
  const { user } = useAuth();
  const { subscription, fetchSubscription, createCustomerPortalSession, isProcessing } = useStripe();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscription = async () => {
      await fetchSubscription();
      setLoading(false);
    };
    loadSubscription();
  }, [fetchSubscription]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading billing information...</div>
      </div>
    );
  }

  const isActiveSubscription = subscription?.subscription_status === 'active';
  const isPastDue = subscription?.subscription_status === 'past_due';
  const isCanceled = subscription?.subscription_status === 'canceled';

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Billing & Subscription</h1>
            <p className="text-muted-foreground">Manage your subscription and billing information</p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Current Plan */}
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Billing Actions */}
          {subscription && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Manage Subscription
                </CardTitle>
                <CardDescription>
                  Update payment method, view invoices, or cancel subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={createCustomerPortalSession}
                    disabled={isProcessing}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {isProcessing ? 'Loading...' : 'Manage Billing'}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Receipts
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  The billing portal allows you to update payment methods, view invoices, 
                  and manage your subscription settings securely.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Usage & Features */}
          <Card>
            <CardHeader>
              <CardTitle>Your Plan Includes</CardTitle>
              <CardDescription>Features available with your current plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Billing Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Billing Notifications
              </CardTitle>
              <CardDescription>Manage how you receive billing updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Receipts</p>
                    <p className="text-sm text-muted-foreground">Get receipts sent to your email</p>
                  </div>
                  <Badge variant="outline">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Reminders</p>
                    <p className="text-sm text-muted-foreground">Reminders before charges</p>
                  </div>
                  <Badge variant="outline">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Billing Updates</p>
                    <p className="text-sm text-muted-foreground">Important billing changes</p>
                  </div>
                  <Badge variant="outline">Enabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Contact our support team for billing questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" asChild>
                  <a href="mailto:support@familying.org">
                    Contact Support
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/help">
                    View Help Center
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Billing;
