import { useEffect, useState } from 'react';
import { useStripe } from '@/hooks/useStripe';
import { useAuth } from '@/hooks/useAuth';
import BillingHeader from '@/components/billing/BillingHeader';
import CurrentPlanCard from '@/components/billing/CurrentPlanCard';
import ManageSubscriptionCard from '@/components/billing/ManageSubscriptionCard';
import PlanFeaturesCard from '@/components/billing/PlanFeaturesCard';

import BillingSupportCard from '@/components/billing/BillingSupportCard';

const Billing = () => {
  const { user } = useAuth();
  const { subscription, fetchSubscription, createCustomerPortalSession, isProcessing } = useStripe();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubscription = async () => {
      await fetchSubscription();
      setLoading(false);
    };
    loadSubscription();
  }, [fetchSubscription]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading billing information...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-8">
        <BillingHeader />
        
        <div className="space-y-6">
          <CurrentPlanCard subscription={subscription} />
          
          <ManageSubscriptionCard 
            subscription={subscription}
            onManageBilling={createCustomerPortalSession}
            isProcessing={isProcessing}
          />
          
          <PlanFeaturesCard subscription={subscription} />
          
          <BillingSupportCard />
        </div>
      </div>
    </div>
  );
};

export default Billing;
