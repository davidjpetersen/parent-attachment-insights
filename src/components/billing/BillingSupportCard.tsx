import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BillingSupportCard = () => {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="px-0 pb-3">
        <CardTitle className="text-lg font-medium">Support</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex gap-3">
          <Button variant="outline" size="sm" asChild>
            <a href="mailto:support@familying.org">
              Contact
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/help">
              Help
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingSupportCard;