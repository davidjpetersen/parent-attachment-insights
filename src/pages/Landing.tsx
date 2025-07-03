import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ArrowRight, Star, Users, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <div className="text-center text-white py-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <BookOpen className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your
            <span className="text-accent"> Parenting Journey</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover evidence-based insights from the world's best parenting books. 
            Get actionable strategies tailored to your child's developmental stage.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/bookshelf">
                Explore Books <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 py-16">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center text-white">
              <div className="p-3 bg-accent/20 rounded-lg w-fit mx-auto mb-4">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">Evidence-Based</h3>
              <p className="text-white/80">
                Every insight is backed by research and expert analysis
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center text-white">
              <div className="p-3 bg-secondary/20 rounded-lg w-fit mx-auto mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Age-Specific</h3>
              <p className="text-white/80">
                Strategies tailored to each developmental stage
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6 text-center text-white">
              <div className="p-3 bg-success/20 rounded-lg w-fit mx-auto mb-4">
                <Star className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-bold mb-3">Actionable</h3>
              <p className="text-white/80">
                Clear, practical steps you can implement today
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center py-16">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Begin?</h2>
              <p className="text-white/90 mb-6">
                Join thousands of parents who are transforming their families with evidence-based insights
              </p>
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/bookshelf">
                  Start Reading <BookOpen className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Landing;