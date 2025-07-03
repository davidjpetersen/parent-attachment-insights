import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CallToAction = () => {
  return (
    <Card className="shadow-md border-0 bg-gradient-primary text-white">
      <CardContent className="p-6 text-center">
        <h3 className="text-xl font-bold mb-2">Ready to Apply These Insights?</h3>
        <p className="text-primary-foreground/90 mb-4">
          Start implementing these evidence-based strategies in your daily parenting.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="secondary" size="sm">
            Save Summary
          </Button>
          <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-primary">
            Share Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallToAction;