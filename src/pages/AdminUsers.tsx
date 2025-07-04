import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users, Shield, UserPlus, Database, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
  roles?: string[];
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<'user' | 'admin' | 'moderator'>('user');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: profilesData, error: profilesError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        return;
      }

      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
        return;
      }

      // Combine user profiles with roles
      const usersWithRoles = profilesData?.map(profile => ({
        id: profile.id,
        email: profile.id, // This would be the user's email from auth.users if we could access it
        full_name: profile.full_name,
        created_at: profile.created_at,
        roles: rolesData?.filter(role => role.user_id === profile.id).map(r => r.role) || []
      })) || [];

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const assignRole = async (userId: string, role: 'user' | 'admin' | 'moderator') => {
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

      fetchUsers(); // Refresh the list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to assign role",
        variant: "destructive",
      });
    }
  };

  const removeRole = async (userId: string, role: 'user' | 'admin' | 'moderator') => {
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

      fetchUsers(); // Refresh the list
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
          <div className="text-muted-foreground">Loading users...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
            <p className="text-muted-foreground">Assign roles and manage user accounts</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          <Users className="w-4 h-4 mr-2" />
          {users.length} Users
        </Badge>
      </div>

      {/* Role Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Assign User Role
          </CardTitle>
          <CardDescription>
            Assign roles to existing users in the system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="userEmail">User Email</Label>
              <Input
                id="userEmail"
                placeholder="Enter user email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={newUserRole} onValueChange={(value) => {
                if (value === 'user' || value === 'admin' || value === 'moderator') {
                  setNewUserRole(value);
                }
              }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={() => {
              const user = users.find(u => u.email === newUserEmail);
              if (user) {
                assignRole(user.id, newUserRole);
                setNewUserEmail("");
              } else {
                toast({
                  title: "Error",
                  description: "User not found",
                  variant: "destructive",
                });
              }
            }}
            disabled={!newUserEmail}
            className="w-full md:w-auto"
          >
            Assign Role
          </Button>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            All Users
          </CardTitle>
          <CardDescription>
            View and manage all registered users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.full_name || 'No name'}</div>
                      <div className="text-sm text-muted-foreground">ID: {user.id.slice(0, 8)}...</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((role) => (
                          <Badge 
                            key={role} 
                            variant={role === 'admin' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {role}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="outline" className="text-xs">user</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Select onValueChange={(role) => {
                        if (role === 'user' || role === 'admin' || role === 'moderator') {
                          assignRole(user.id, role);
                        }
                      }}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Add role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;
