import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Star, Zap, Shield, Users, BookOpen, Brain, Heart } from 'lucide-react';
import { useStripe } from '@/hooks/useStripe';
import { SUBSCRIPTION_PLANS } from '@/lib/stripe';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const Subscription = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { createCheckoutSession, isProcessing } = useStripe();
  const { user } = useAuth();

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      // Redirect to auth if not logged in
      window.location.href = '/auth';
      return;
    }
    await createCheckoutSession(priceId);
  };

  const currentPlan = isYearly ? SUBSCRIPTION_PLANS.YEARLY : SUBSCRIPTION_PLANS.MONTHLY;

  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your Parenting Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get unlimited access to science-backed parenting resources, expert guidance, 
            and tools that grow with your family.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4 bg-muted/50 rounded-lg p-1">
            <span className={`text-sm font-medium px-3 py-2 ${!isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm font-medium px-3 py-2 ${isYearly ? 'text-primary' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {isYearly && (
              <Badge className="bg-green-500 text-white ml-2">
                Save 17%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Free Plan */}
          <Card className="border-2 border-muted">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Free Access</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Access to 3 book summaries</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Basic parenting quiz</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Community access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Weekly newsletter</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full mt-6"
                asChild
              >
                <Link to="/auth">
                  Get Started Free
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-center py-2 text-sm font-medium">
              Most Popular
            </div>
            <CardHeader className="text-center pt-12">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                Premium Access
              </CardTitle>
              <CardDescription>Complete parenting toolkit</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{currentPlan.price}</span>
                <span className="text-muted-foreground">/{currentPlan.interval}</span>
                {isYearly && SUBSCRIPTION_PLANS.YEARLY.savings && (
                  <div className="text-sm text-green-600 mt-1">{SUBSCRIPTION_PLANS.YEARLY.savings}</div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {currentPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full mt-6 bg-primary hover:bg-primary/90"
                onClick={() => handleSubscribe(currentPlan.priceId)}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Start Premium Trial'}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                7-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert-Curated Content</h3>
            <p className="text-muted-foreground">
              Book summaries and resources from leading child development experts
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Insights</h3>
            <p className="text-muted-foreground">
              AI-powered recommendations based on your family's unique needs
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
            <p className="text-muted-foreground">
              Connect with other parents on similar journeys for support and advice
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-muted/30 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">What Parents Are Saying</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Game-changer for our family. The personalized insights helped us navigate 
                the toddler years with confidence."
              </p>
              <p className="font-semibold">Sarah M., Mom of 2</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "The book summaries saved me hours of reading time while still getting 
                the key insights I needed."
              </p>
              <p className="font-semibold">Michael T., Dad of 3</p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Finally, parenting advice that's actually backed by science. 
                This platform is incredible."
              </p>
              <p className="font-semibold">Jessica L., Mom of 1</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
          <div className="max-w-2xl mx-auto space-y-4 text-left">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Can I cancel anytime?</h4>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have 
                access until the end of your billing period.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Is there a free trial?</h4>
              <p className="text-muted-foreground">
                Yes! We offer a 7-day free trial for new premium subscribers. 
                No credit card required to start.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-muted-foreground">
                We accept all major credit cards, debit cards, and PayPal through 
                our secure Stripe payment processor.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
