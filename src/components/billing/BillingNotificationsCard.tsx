import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

const BillingNotificationsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Billing Notifications
        </CardTitle>
        <CardDescription>Manage how you receive billing updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Receipts</p>
              <p className="text-sm text-muted-foreground">Get receipts sent to your email</p>
            </div>
            <Badge variant="outline">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Payment Reminders</p>
              <p className="text-sm text-muted-foreground">Reminders before charges</p>
            </div>
            <Badge variant="outline">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Billing Updates</p>
              <p className="text-sm text-muted-foreground">Important billing changes</p>
            </div>
            <Badge variant="outline">Enabled</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingNotificationsCard;