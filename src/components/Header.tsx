import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { User, Menu, LogOut, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
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
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

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

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  location.pathname === "/" && "bg-accent text-accent-foreground"
                )}
              >
                <Link to="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink 
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  location.pathname === "/quiz" && "bg-accent text-accent-foreground"
                )}
              >
                <Link to="/quiz">Quiz</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink 
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  location.pathname === "/resources" && "bg-accent text-accent-foreground"
                )}
              >
                <Link to="/resources">Resources</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Login/Account Button */}
        <div className="flex items-center space-x-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <User className="w-4 h-4 mr-2" />
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Account'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
              <Link to="/auth">
                <User className="w-4 h-4 mr-2" />
                Login
              </Link>
            </Button>
          )}
          
          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full bg-peach">
              <div className="flex flex-col space-y-6 mt-8">
                <Link 
                  to="/" 
                  className="flex items-center space-x-3 text-lg font-medium text-peach-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Link>
                
                <Link 
                  to="/quiz" 
                  className="flex items-center space-x-3 text-lg font-medium text-peach-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-5 h-5 flex items-center justify-center text-sm font-bold bg-accent text-accent-foreground rounded">Q</span>
                  <span>Quiz</span>
                </Link>
                
                <Link 
                  to="/resources" 
                  className="flex items-center space-x-3 text-lg font-medium text-peach-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="w-5 h-5 flex items-center justify-center text-sm font-bold bg-accent text-accent-foreground rounded">R</span>
                  <span>Resources</span>
                </Link>

                {user ? (
                  <Button 
                    variant="secondary" 
                    className="w-fit" 
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <Button 
                    variant="secondary" 
                    className="w-fit" 
                    asChild
                  >
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;