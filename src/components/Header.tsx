import { useAuth } from "@/hooks/useAuth";
import AuthenticatedHeader from "./AuthenticatedHeader";
import UnauthenticatedHeader from "./UnauthenticatedHeader";

const Header = () => {
  const { user, loading } = useAuth();

  // Debug logging
  console.log('Header rendering:', { user: !!user, loading, userEmail: user?.email });

  // Show loading state or return early if still loading
  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-xl text-foreground">Familying.org</span>
          </div>
        </div>
      </header>
    );
  }

  // Render the appropriate header based on authentication status
  return user ? <AuthenticatedHeader /> : <UnauthenticatedHeader />;
};

export default Header;