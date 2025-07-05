import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BillingSupportCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Need Help?</CardTitle>
        <CardDescription>Contact our support team for billing questions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" asChild>
            <a href="mailto:support@familying.org">
              Contact Support
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/help">
              View Help Center
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingSupportCard;