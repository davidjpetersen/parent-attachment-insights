import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Star, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // You could verify the session with your backend here
    if (sessionId) {
      console.log('Payment successful for session:', sessionId);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Main Content */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold text-green-600 mb-2">
              Welcome to Premium! 🎉
            </CardTitle>
            <CardDescription className="text-lg">
              Your payment was successful and your subscription is now active.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* What's Next */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5" />
                What's Included in Your Premium Plan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Unlimited book summaries</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Personalized insights</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Progress tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Expert guidance tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Community access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Priority support</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Ready to Get Started?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="flex items-center gap-2">
                  <Link to="/bookshelf">
                    <Star className="w-4 h-4" />
                    Explore Book Summaries
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex items-center gap-2">
                  <Link to="/">
                    <ArrowRight className="w-4 h-4" />
                    Go to Dashboard
                  </Link>
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 text-sm text-muted-foreground space-y-2">
              <p>
                A receipt has been sent to your email address.
              </p>
              <p>
                You can manage your subscription anytime in your account settings.
              </p>
              <p>
                Need help? <Link to="/help" className="text-primary hover:underline">Contact our support team</Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Want to make the most of your subscription?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" size="sm" asChild>
              <Link to="/quiz">Complete Your Profile</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/billing">Manage Billing</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
