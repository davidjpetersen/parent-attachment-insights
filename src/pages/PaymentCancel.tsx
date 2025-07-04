import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, HelpCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Cancel Icon */}
        <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <XCircle className="w-12 h-12 text-orange-600" />
        </div>

        {/* Main Content */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold text-orange-600 mb-2">
              Payment Cancelled
            </CardTitle>
            <CardDescription className="text-lg">
              No worries! Your payment was cancelled and no charges were made.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* What Happened */}
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">What happened?</h3>
              <p className="text-muted-foreground text-left">
                You cancelled the payment process before it was completed. This is completely normal 
                and happens if you:
              </p>
              <ul className="text-left text-muted-foreground mt-3 space-y-1">
                <li>• Clicked the back button during checkout</li>
                <li>• Closed the payment window</li>
                <li>• Decided to think about it more</li>
                <li>• Encountered a technical issue</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What would you like to do?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="flex items-center gap-2">
                  <Link to="/subscription">
                    Try Again
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex items-center gap-2">
                  <Link to="/">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                  </Link>
                </Button>
              </div>
            </div>

            {/* Free Plan Reminder */}
            <div className="border rounded-lg p-4 bg-muted/30">
              <h4 className="font-semibold mb-2">Continue with Free Access</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Remember, you can still enjoy our free features while you decide:
              </p>
              <div className="text-sm text-left space-y-1">
                <div>• Access to 3 book summaries</div>
                <div>• Basic parenting quiz</div>
                <div>• Community access</div>
                <div>• Weekly newsletter</div>
              </div>
            </div>

            {/* Help Options */}
            <div className="space-y-3">
              <h4 className="font-medium">Need Help?</h4>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/help" className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    View FAQ
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:support@familying.org" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Contact Support
                  </a>
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 text-sm text-muted-foreground">
              <p>
                No payment information was saved and no charges were made to your account.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Special Offer (Optional) */}
        <div className="mt-8 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg">
          <h4 className="font-semibold mb-2">Still considering Premium?</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Join thousands of parents who have transformed their parenting journey with our expert-backed resources.
          </p>
          <Button variant="outline" size="sm" asChild>
            <Link to="/subscription">
              View Pricing Plans
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
