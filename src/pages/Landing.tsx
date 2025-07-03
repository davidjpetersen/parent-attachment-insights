import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  BookOpen, 
  ArrowRight, 
  Star, 
  Users, 
  Brain, 
  Heart, 
  Lightbulb, 
  Shield, 
  Clock, 
  CheckCircle,
  Quote,
  MessageCircle,
  Baby,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Landing = () => {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    // Time-based nudge after 15 seconds of activity
    const timer = setTimeout(() => {
      setShowFloatingCTA(true);
    }, 15000);

    // Exit intent detection (desktop only)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !showExitIntent && window.innerWidth > 768) {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showExitIntent]);

  const scrollToQuiz = () => {
    const element = document.getElementById('quiz-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/quiz';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Section 1: Above the Fold (Hero) */}
      <section className="relative bg-gradient-hero text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Turn Chaos Hour Into Calm—<br />
            <span className="text-white">in Just 3 Minutes a Day</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Take our quiz to get a personalized parenting toolkit that matches your family's real needs.
          </p>
          
          {/* Primary CTA */}
          <div className="space-y-4">
            <Button 
              onClick={scrollToQuiz}
              size="lg" 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-lg px-8 py-4 h-auto font-semibold"
            >
              Take the 3-Minute Quiz
            </Button>
            
            {/* Trust badges */}
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-sm text-white/80 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Backed by child development experts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Loved by over 20,000 parents</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">Why It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <CardContent className="p-6">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Science-Backed</h3>
                <p className="text-muted-foreground">
                  Built with psychology and parenting research from leading experts
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="p-6">
                <div className="p-4 bg-accent/10 rounded-full w-fit mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Custom-Fit</h3>
                <p className="text-muted-foreground">
                  Matches your values, roles, and family type perfectly
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="p-6">
                <div className="p-4 bg-secondary/10 rounded-full w-fit mx-auto mb-4">
                  <Heart className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Emotionally Attuned</h3>
                <p className="text-muted-foreground">
                  Supports the real you, not a parenting ideal
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 3: What You'll Get */}
      <section className="py-20 px-4 bg-gradient-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">What You'll Get</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center bg-primary-soft border-primary/20">
              <CardContent className="p-6">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-foreground">Mindfulness Check-ins</h3>
                <p className="text-primary-foreground/80">
                  Quick emotional regulation tools for stressful moments
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center bg-accent-soft border-accent/20">
              <CardContent className="p-6">
                <div className="p-4 bg-accent/10 rounded-full w-fit mx-auto mb-4">
                  <Baby className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-accent-foreground">Age-Based Activity Cards</h3>
                <p className="text-accent-foreground/80">
                  Developmentally appropriate activities and conversation starters
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center bg-secondary-soft border-secondary/20">
              <CardContent className="p-6">
                <div className="p-4 bg-secondary/10 rounded-full w-fit mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-secondary-foreground">Co-Parenting Tools</h3>
                <p className="text-secondary-foreground/80">
                  Communication frameworks and boundary-setting scripts
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Button 
              onClick={scrollToQuiz}
              size="lg" 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Unlock Your Toolkit - Take Quiz
            </Button>
          </div>
        </div>
      </section>

      {/* Section 4: Testimonials */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">What Parents Are Saying</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="p-6">
                <Quote className="w-6 h-6 text-primary mb-4" />
                <p className="text-muted-foreground mb-4 italic">
                  "Finally, parenting advice that actually fits our chaotic single-parent life. The 3-minute tools are a lifesaver during meltdowns."
                </p>
                <div className="font-semibold text-foreground">— Sarah M., Single Mom</div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-6">
                <Quote className="w-6 h-6 text-primary mb-4" />
                <p className="text-muted-foreground mb-4 italic">
                  "The quiz understood our blended family dynamics better than our therapist. The co-parenting scripts actually work!"
                </p>
                <div className="font-semibold text-foreground">— Marcus & Lisa T., Blended Family</div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="p-6">
                <Quote className="w-6 h-6 text-primary mb-4" />
                <p className="text-muted-foreground mb-4 italic">
                  "As a working parent with ADHD kids, I needed tools that actually fit our reality. This toolkit gets it."
                </p>
                <div className="font-semibold text-foreground">— Jamie K., Working Parent</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section 5: FAQ */}
      <section id="why-free" className="py-20 px-4 bg-gradient-subtle">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-background border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Is this quiz really free?
              </AccordionTrigger>
              <AccordionContent>
                Yes, completely free. No hidden fees, no credit card required. We believe every parent deserves access to evidence-based parenting support, regardless of their financial situation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-background border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What happens after I take the quiz?
              </AccordionTrigger>
              <AccordionContent>
                You'll get instant access to your personalized toolkit with specific tools, scripts, and strategies matched to your family's unique situation. You can bookmark it and return anytime.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-background border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Do I need to sign up or create an account?
              </AccordionTrigger>
              <AccordionContent>
                You can take the quiz without signing up. However, creating a free account lets you save your results, bookmark favorite tools, and access additional resources as we add them.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-background border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                How long does the quiz take?
              </AccordionTrigger>
              <AccordionContent>
                Just 3 minutes! We've designed it to be quick but thorough, covering the key dimensions that matter most for personalized parenting support.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-background border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Why is this free?
              </AccordionTrigger>
              <AccordionContent>
                We're building a community of supported parents. Our mission is to reduce parenting overwhelm for everyone. The basic toolkit is free forever - we may offer premium features in the future, but the core support will always be accessible.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="quiz-section" className="py-20 px-4 bg-background">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Ready to Transform Your Family Life?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of parents who've found their calm. Take the 3-minute quiz and get your personalized toolkit today.
          </p>
          
          <Button 
            onClick={scrollToQuiz}
            size="lg" 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-lg px-8 py-4 h-auto font-semibold"
          >
            Take the 3-Minute Quiz Now
          </Button>
          
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>100% Free • No Email Required • Instant Results</span>
          </div>
        </div>
      </section>

      {/* Floating CTA for Mobile */}
      {showFloatingCTA && (
        <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
          <Card className="bg-destructive text-destructive-foreground shadow-lg">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="font-semibold">Take the Quiz & Get Your Toolkit</span>
              </div>
              <Button 
                onClick={() => {
                  scrollToQuiz();
                  setShowFloatingCTA(false);
                }}
                size="sm"
                variant="secondary"
              >
                Start
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Exit Intent Modal */}
      {showExitIntent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Wait!</h3>
              <p className="text-muted-foreground mb-6">
                Want your free parenting toolkit? Just 3 minutes to get started.
              </p>
              <div className="flex gap-3">
                <Button 
                  onClick={() => {
                    scrollToQuiz();
                    setShowExitIntent(false);
                  }}
                  className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Take the Quiz Now
                </Button>
                <Button 
                  onClick={() => setShowExitIntent(false)}
                  variant="outline"
                  className="flex-1"
                >
                  No Thanks
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Landing;