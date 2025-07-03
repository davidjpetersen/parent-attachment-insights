import { useAuth } from "@/hooks/useAuth";
import Landing from "./Landing";
import MembersDashboard from "./MembersDashboard";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Redirect authenticated users to members dashboard
  if (user) {
    return <MembersDashboard />;
  }

  // Show landing page for non-authenticated users
  return <Landing />;
};

export default Index;