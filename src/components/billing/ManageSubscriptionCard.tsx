import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, ExternalLink, Download } from 'lucide-react';

interface ManageSubscriptionCardProps {
  subscription: any;
  onManageBilling: () => void;
  isProcessing: boolean;
}

const ManageSubscriptionCard = ({ subscription, onManageBilling, isProcessing }: ManageSubscriptionCardProps) => {
  if (!subscription) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Manage Subscription
        </CardTitle>
        <CardDescription>
          Update payment method, view invoices, or cancel subscription
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={onManageBilling}
            disabled={isProcessing}
            className="flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            {isProcessing ? 'Loading...' : 'Manage Billing'}
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Receipts
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          The billing portal allows you to update payment methods, view invoices, 
          and manage your subscription settings securely.
        </p>
      </CardContent>
    </Card>
  );
};

export default ManageSubscriptionCard;