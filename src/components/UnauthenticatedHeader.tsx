import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, HelpCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const UnauthenticatedHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToQuiz = () => {
    const element = document.getElementById('quiz-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/quiz';
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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

        {/* Navigation Menu - Hidden on mobile */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn(navigationMenuTriggerStyle(), "text-muted-foreground hover:text-foreground cursor-pointer")}
                onClick={() => scrollToSection('how-it-works')}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                How It Works
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink 
                className={cn(navigationMenuTriggerStyle(), "text-muted-foreground hover:text-foreground cursor-pointer")}
                onClick={() => scrollToSection('why-free')}
              >
                <Info className="w-4 h-4 mr-2" />
                Why It's Free
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA and Auth */}
        <div className="flex items-center space-x-3">
          {/* Primary CTA Button - Hidden on mobile */}
          <Button 
            onClick={scrollToQuiz}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-semibold hidden sm:flex"
            size="sm"
          >
            Take the Quiz
          </Button>

          {/* Login Button - Hidden on mobile */}
          <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
            <Link to="/auth">
              Login
            </Link>
          </Button>
          
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
                  Take the Quiz
                </Button>
                
                <div className="border-t pt-4 space-y-4">
                  <button 
                    className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary transition-colors w-full text-left py-3 min-h-[44px]"
                    onClick={() => {
                      scrollToSection('how-it-works');
                      setIsOpen(false);
                    }}
                  >
                    <HelpCircle className="w-6 h-6" />
                    <span>How It Works</span>
                  </button>
                  
                  <button 
                    className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary transition-colors w-full text-left py-3 min-h-[44px]"
                    onClick={() => {
                      scrollToSection('why-free');
                      setIsOpen(false);
                    }}
                  >
                    <Info className="w-6 h-6" />
                    <span>Why It's Free</span>
                  </button>

                  <Button 
                    variant="outline" 
                    className="w-full" 
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/auth">
                      Login
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default UnauthenticatedHeader;
