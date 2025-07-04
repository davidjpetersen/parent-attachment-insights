import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { User, Menu, LogOut, Home, HelpCircle, Info } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToQuiz = () => {
    const element = document.getElementById('quiz-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/quiz';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-xl text-foreground">Familying.org</span>
          </div>
        </Link>

        {/* Secondary Navigation - Hidden on mobile */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn(navigationMenuTriggerStyle(), "text-muted-foreground hover:text-foreground")}
                href="#how-it-works"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                How It Works
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn(navigationMenuTriggerStyle(), "text-muted-foreground hover:text-foreground")}
                href="#why-free"
              >
                <Info className="w-4 h-4 mr-2" />
                Why It's Free
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            {user && (
              <NavigationMenuItem>
                <NavigationMenuLink 
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname === "/resources" && "bg-accent text-accent-foreground"
                  )}
                >
                  <Link to="/resources">My Toolkit</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Primary CTA and Account */}
        <div className="flex items-center space-x-3">
          {/* Primary CTA Button - Hidden on mobile */}
          <Button 
            onClick={scrollToQuiz}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold hidden sm:flex"
            size="sm"
          >
            Take the 3-Minute Quiz
          </Button>

          {/* Account/Login */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <User className="w-4 h-4 mr-2" />
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Account'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
              <Link to="/auth">
                Login
              </Link>
            </Button>
          )}
          
          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden p-3 min-h-[44px] min-w-[44px]">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full h-auto">
              <div className="flex flex-col space-y-6 mt-4">
                {/* Mobile Primary CTA */}
                <Button 
                  onClick={() => {
                    scrollToQuiz();
                    setIsOpen(false);
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold w-full"
                >
                  Take the 3-Minute Quiz
                </Button>
                
                <div className="border-t pt-4 space-y-4">
                  <button 
                    className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary transition-colors w-full text-left py-3 min-h-[44px]"
                    onClick={() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                  >
                    <HelpCircle className="w-6 h-6" />
                    <span>How It Works</span>
                  </button>
                  
                  <button 
                    className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary transition-colors w-full text-left py-3 min-h-[44px]"
                    onClick={() => {
                      document.getElementById('why-free')?.scrollIntoView({ behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                  >
                    <Info className="w-6 h-6" />
                    <span>Why It's Free</span>
                  </button>

                  {user ? (
                    <>
                      <Link 
                        to="/resources" 
                        className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="w-5 h-5" />
                        <span>My Toolkit</span>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      asChild
                    >
                      <Link to="/auth" onClick={() => setIsOpen(false)}>
                        <User className="w-4 h-4 mr-2" />
                        Login
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;