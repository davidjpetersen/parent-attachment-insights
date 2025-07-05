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
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pb-3">
        <CardTitle className="text-lg font-medium">Manage</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex gap-3">
          <Button
            onClick={onManageBilling}
            disabled={isProcessing}
            size="sm"
            variant="outline"
          >
            {isProcessing ? 'Loading...' : 'Billing Portal'}
          </Button>
          <Button variant="outline" size="sm">
            Receipts
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageSubscriptionCard;