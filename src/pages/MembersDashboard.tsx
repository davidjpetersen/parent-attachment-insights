import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Star, 
  TrendingUp, 
  Users, 
  Brain,
  ArrowRight,
  PlayCircle
} from "lucide-react";

interface UserProfile {
  full_name?: string;
  quiz_completed?: boolean;
  parenting_style?: string;
  member_since?: string;
}

const MembersDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [quizProgress, setQuizProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data || {});
      setQuizProgress(data?.quiz_completed ? 100 : 0);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-muted-foreground">Loading your dashboard...</div>
      </div>
    );
  }

  const userName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Friend';
  const isQuizCompleted = profile?.quiz_completed || false;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Main Container */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Your personalized parenting journey continues here
          </p>
        </div>

        {/* Single Column Layout */}
        <div className="space-y-8">
          {/* Quick Stats - Half-width cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quiz Progress</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{quizProgress}%</div>
                <Progress value={quizProgress} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {isQuizCompleted ? "Complete! 🎉" : "Complete your assessment"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {profile?.member_since 
                    ? new Date(profile.member_since).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                    : 'Today'
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  Part of the Familying community
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Style</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {profile?.parenting_style || "Discovering"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {profile?.parenting_style ? "Based on your quiz" : "Complete quiz to discover"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Full-width */}
          {!isQuizCompleted ? (
            <Card className="bg-gradient-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Brain className="h-6 w-6" />
                  Complete Your Family Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary-foreground/90 mb-6 text-lg">
                  Get your personalized parenting toolkit with strategies tailored to your family's unique needs, values, and situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    asChild 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <Link to="/quiz">
                      <PlayCircle className="w-5 h-5 mr-2" />
                      Take the 3-Minute Quiz
                    </Link>
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-primary-foreground/80">
                    <CheckCircle className="w-4 h-4" />
                    <span>Free forever • No email required</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Your Personalized Toolkit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-accent-soft rounded-lg">
                    <div>
                      <h4 className="font-medium">Custom Resources</h4>
                      <p className="text-sm text-muted-foreground">Tailored to your parenting style</p>
                    </div>
                    <Badge variant="secondary">Ready</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-secondary-soft rounded-lg">
                    <div>
                      <h4 className="font-medium">Age-Specific Strategies</h4>
                      <p className="text-sm text-muted-foreground">For your children's developmental stages</p>
                    </div>
                    <Badge variant="secondary">Available</Badge>
                  </div>

                  <Button asChild className="w-full">
                    <Link to="/resources">
                      Explore Your Toolkit
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content Grid - Half-width cards when needed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-medium">Managing Bedtime Battles</h4>
                    <p className="text-sm text-muted-foreground">Gentle strategies for peaceful nights</p>
                  </div>
                  
                  <div className="border-l-4 border-accent pl-4">
                    <h4 className="font-medium">Sibling Rivalry Solutions</h4>
                    <p className="text-sm text-muted-foreground">Building cooperation, not competition</p>
                  </div>
                  
                  <div className="border-l-4 border-secondary pl-4">
                    <h4 className="font-medium">Screen Time Balance</h4>
                    <p className="text-sm text-muted-foreground">Healthy boundaries in a digital world</p>
                  </div>

                  <Button variant="outline" asChild className="w-full">
                    <Link to="/resources">
                      Browse All Resources
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-medium mb-2">Join the Community</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect with other parents on similar journeys
                    </p>
                    <Badge variant="outline">Coming Soon</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Tools - Full-width */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" asChild>
                  <Link to="/quiz">
                    <Brain className="w-4 h-4 mr-2" />
                    Retake Quiz
                  </Link>
                </Button>
                
                <Button variant="outline" asChild>
                  <Link to="/resources">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Resources
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

export default MembersDashboard;