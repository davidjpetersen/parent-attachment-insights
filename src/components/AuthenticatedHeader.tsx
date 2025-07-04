import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { User, Menu, LogOut, BookOpen, Users, FileText, Settings, ChevronDown, CreditCard, Star } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const AuthenticatedHeader = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Account';
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
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  (location.pathname === "/resources" || location.pathname === "/bookshelf") && "bg-accent text-accent-foreground"
                )}
              >
                <Link to="/resources" className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  My Toolkit
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Account and Admin Dropdown */}
        <div className="flex items-center space-x-3">
          {/* Admin Dropdown - Hidden on mobile */}
          {isAdmin && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/admin/users" className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/content" className="flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Manage Content
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin/settings" className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    System Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Account Dropdown - Hidden on mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="w-4 h-4 mr-2" />
                {getUserDisplayName()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/resources" className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  My Toolkit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/subscription" className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Subscription
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/billing" className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Billing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden p-3 min-h-[44px] min-w-[44px]">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full h-auto">
              <div className="flex flex-col space-y-6 mt-4">
                {/* User Info */}
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{getUserDisplayName()}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Link 
                    to="/resources" 
                    className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary transition-colors py-3 min-h-[44px]"
                    onClick={() => setIsOpen(false)}
                  >
                    <BookOpen className="w-6 h-6" />
                    <span>My Toolkit</span>
                  </Link>

                  <Link 
                    to="/subscription" 
                    className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary transition-colors py-3 min-h-[44px]"
                    onClick={() => setIsOpen(false)}
                  >
                    <Star className="w-6 h-6" />
                    <span>Subscription</span>
                  </Link>

                  <Link 
                    to="/billing" 
                    className="flex items-center space-x-3 text-lg font-medium text-foreground hover:text-primary transition-colors py-3 min-h-[44px]"
                    onClick={() => setIsOpen(false)}
                  >
                    <CreditCard className="w-6 h-6" />
                    <span>Billing</span>
                  </Link>

                  {isAdmin && (
                    <>
                      <div className="border-t pt-4">
                        <p className="text-sm font-medium text-muted-foreground mb-2">Admin Tools</p>
                        <div className="space-y-2">
                          <Link 
                            to="/admin/users" 
                            className="flex items-center space-x-3 text-base font-medium text-foreground hover:text-primary transition-colors py-2 min-h-[40px]"
                            onClick={() => setIsOpen(false)}
                          >
                            <Users className="w-5 h-5" />
                            <span>Manage Users</span>
                          </Link>
                          
                          <Link 
                            to="/admin/content" 
                            className="flex items-center space-x-3 text-base font-medium text-foreground hover:text-primary transition-colors py-2 min-h-[40px]"
                            onClick={() => setIsOpen(false)}
                          >
                            <FileText className="w-5 h-5" />
                            <span>Manage Content</span>
                          </Link>
                          
                          <Link 
                            to="/admin/settings" 
                            className="flex items-center space-x-3 text-base font-medium text-foreground hover:text-primary transition-colors py-2 min-h-[40px]"
                            onClick={() => setIsOpen(false)}
                          >
                            <Settings className="w-5 h-5" />
                            <span>System Settings</span>
                          </Link>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="border-t pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default AuthenticatedHeader;
