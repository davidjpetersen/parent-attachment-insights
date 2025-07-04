import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Users, Shield, BarChart3, FileText, Settings, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [userStats, setUserStats] = useState({ total: 0, admins: 0, newThisWeek: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('user_profiles')
        .select('created_at');

      if (error) {
        console.error('Error fetching user stats:', error);
        return;
      }

      const total = profiles?.length || 0;
      
      // Count new users this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const newThisWeek = profiles?.filter(p => 
        new Date(p.created_at) > oneWeekAgo
      ).length || 0;

      // Count admins
      const { data: adminRoles } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      const admins = adminRoles?.length || 0;

      setUserStats({ total, admins, newThisWeek });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const adminTools = [
    {
      title: "Manage Users",
      description: "Assign roles and manage user accounts",
      icon: Users,
      href: "/admin/users",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Manage Content",
      description: "Review and update site content",
      icon: FileText,
      href: "/admin/content",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "System Settings",
      description: "Configure global site preferences",
      icon: Settings,
      href: "/admin/settings",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading admin dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! What would you like to manage today?</p>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          <Shield className="w-4 h-4 mr-2" />
          Administrator
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.total}</div>
            <p className="text-xs text-muted-foreground">
              +{userStats.newThisWeek} new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.admins}</div>
            <p className="text-xs text-muted-foreground">
              Admin users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">
              Coming soon
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Tools Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Admin Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adminTools.map((tool) => {
            const IconComponent = tool.icon;
            
            return (
              <Link key={tool.title} to={tool.href}>
                <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg ${tool.bgColor} flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${tool.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {tool.title}
                        </CardTitle>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-base">
                      {tool.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/admin/users" className="text-sm text-primary hover:underline">
            → View all users and assign roles
          </Link>
          <Link to="/admin/content" className="text-sm text-primary hover:underline">
            → Manage book summaries and content
          </Link>
          <Link to="/admin/settings" className="text-sm text-primary hover:underline">
            → Configure system settings
          </Link>
          <Link to="/admin/book-summaries" className="text-sm text-primary hover:underline">
            → Edit book summaries directly
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;