import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  ArrowLeft, 
  ChevronRight, 
  User, 
  Shield, 
  Calendar, 
  Activity, 
  BookOpen, 
  Settings,
  AlertTriangle,
  Clock,
  UserX,
  UserCheck,
  Mail,
  Eye,
  Edit
} from "lucide-react";

interface UserProfile {
  id: string;
  full_name?: string;
  created_at: string;
  member_since: string;
  parenting_style: string;
  quiz_completed: boolean;
  subscription_status: string;
  is_admin: boolean;
  roles?: string[];
}

interface UserActivity {
  id: string;
  action: string;
  timestamp: string;
  details?: string;
}

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
      fetchUserActivity();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        return;
      }

      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (rolesError) {
        console.error('Error fetching user roles:', rolesError);
        return;
      }

      setUser({
        ...profileData,
        roles: rolesData?.map(r => r.role) || []
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserActivity = async () => {
    try {
      // Mock activity data - in a real app, you'd have an activity log table
      const mockActivity: UserActivity[] = [
        {
          id: '1',
          action: 'Profile Updated',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          details: 'Updated parenting style preferences'
        },
        {
          id: '2',
          action: 'Book Summary Viewed',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          details: 'Viewed "The Whole-Brain Child"'
        },
        {
          id: '3',
          action: 'Quiz Completed',
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          details: 'Completed parenting style assessment'
        }
      ];
      setUserActivity(mockActivity);
    } catch (error) {
      console.error('Error fetching user activity:', error);
    }
  };

  const assignRole = async (role: 'user' | 'admin' | 'moderator') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ 
          user_id: userId, 
          role: role 
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Role ${role} assigned successfully`,
      });

      fetchUserDetails(); // Refresh user data
      setIsRoleDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to assign role",
        variant: "destructive",
      });
    }
  };

  const removeRole = async (role: 'user' | 'admin' | 'moderator') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId)
        .eq('role', role);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Role ${role} removed successfully`,
      });

      fetchUserDetails(); // Refresh user data
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove role",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading user details...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">User Not Found</h3>
            <p className="text-muted-foreground mb-4">The requested user could not be found.</p>
            <Button asChild>
              <Link to="/admin/users">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Users
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Link to="/admin" className="hover:text-foreground transition-colors">
            Admin
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/admin/users" className="hover:text-foreground transition-colors">
            Manage Users
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{user.full_name || 'User Details'}</span>
        </nav>

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/users" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Users
              </Link>
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {user.full_name || 'Unnamed User'}
              </h1>
              <p className="text-lg text-muted-foreground">
                User ID: {user.id.slice(0, 8)}...
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600">Active</span>
            </div>
            <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Manage Roles
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Manage User Roles</DialogTitle>
                  <DialogDescription>
                    Assign or remove roles for this user.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Current Roles</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((role) => (
                          <Badge 
                            key={role} 
                            variant={role === 'admin' ? 'default' : 'secondary'}
                            className="flex items-center gap-2"
                          >
                            {role}
                            <button
                              onClick={() => removeRole(role as 'user' | 'admin' | 'moderator')}
                              className="ml-1 hover:bg-black/20 rounded-full p-0.5"
                            >
                              <UserX className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="outline">No roles assigned</Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Assign New Role</h4>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => assignRole('user')}
                        disabled={user.roles?.includes('user')}
                      >
                        User
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => assignRole('moderator')}
                        disabled={user.roles?.includes('moderator')}
                      >
                        Moderator
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => assignRole('admin')}
                        disabled={user.roles?.includes('admin')}
                      >
                        Admin
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Info */}
              <div className="bg-card rounded-lg border-0 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">User Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-sm">{user.full_name || 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">User ID</label>
                    <p className="text-sm font-mono">{user.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                    <p className="text-sm">{new Date(user.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Subscription Status</label>
                    <Badge variant={user.subscription_status === 'active' ? 'default' : 'secondary'}>
                      {user.subscription_status}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* User Preferences */}
              <div className="bg-card rounded-lg border-0 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-lg font-semibold">Preferences</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Parenting Style</label>
                    <p className="text-sm">{user.parenting_style || 'Not specified'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Quiz Completed</label>
                    <div className="flex items-center gap-2">
                      {user.quiz_completed ? (
                        <UserCheck className="w-4 h-4 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-500" />
                      )}
                      <span className="text-sm">
                        {user.quiz_completed ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Admin Status</label>
                    <div className="flex items-center gap-2">
                      {user.is_admin ? (
                        <Shield className="w-4 h-4 text-blue-500" />
                      ) : (
                        <User className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-sm">
                        {user.is_admin ? 'Administrator' : 'Regular User'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Roles */}
            <div className="bg-card rounded-lg border-0 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Current Roles</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.roles && user.roles.length > 0 ? (
                  user.roles.map((role) => (
                    <Badge 
                      key={role} 
                      variant={role === 'admin' ? 'default' : 'secondary'}
                      className="flex items-center gap-2"
                    >
                      <Shield className="w-3 h-3" />
                      {role}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline" className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    user (default)
                  </Badge>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="bg-card rounded-lg border-0 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Recent Activity</h3>
              </div>
              {userActivity.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent activity</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{activity.action}</h4>
                          <span className="text-sm text-muted-foreground">
                            {new Date(activity.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        {activity.details && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {activity.details}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4">
            <div className="bg-card rounded-lg border-0 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Role Permissions</h3>
              </div>
              <div className="space-y-6">
                {user.roles?.map((role) => (
                  <div key={role} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
                        {role}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeRole(role as 'user' | 'admin' | 'moderator')}
                        className="text-destructive hover:text-destructive"
                      >
                        <UserX className="w-4 h-4 mr-2" />
                        Remove Role
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {role === 'admin' && (
                        <ul className="list-disc list-inside space-y-1">
                          <li>Full system access</li>
                          <li>User management</li>
                          <li>Content management</li>
                          <li>System settings</li>
                        </ul>
                      )}
                      {role === 'moderator' && (
                        <ul className="list-disc list-inside space-y-1">
                          <li>Content moderation</li>
                          <li>User support</li>
                          <li>Limited user management</li>
                        </ul>
                      )}
                      {role === 'user' && (
                        <ul className="list-disc list-inside space-y-1">
                          <li>Access to content</li>
                          <li>Profile management</li>
                          <li>Basic platform features</li>
                        </ul>
                      )}
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8 text-muted-foreground">
                    <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No roles assigned</p>
                    <p className="text-sm">User has default permissions only</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDetail;
