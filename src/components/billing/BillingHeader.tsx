import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const BillingHeader = () => {
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
        <Link to="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Billing</span>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Billing</h1>
      </div>
    </>
  );
};

export default BillingHeader;