import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const BillingHeader = () => {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground font-medium">Billing</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground text-sm md:text-base">Manage your subscription and billing information</p>
      </div>
    </>
  );
};

export default BillingHeader;