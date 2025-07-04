import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ContentTypesGrid = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Summary Content Types</CardTitle>
        <CardDescription>
          Manage different types of content for book summaries
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Central Messages</h3>
            <p className="text-sm text-muted-foreground mb-3">Main thesis and key takeaways</p>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Core Concepts</h3>
            <p className="text-sm text-muted-foreground mb-3">Key concepts and practical applications</p>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Chapters</h3>
            <p className="text-sm text-muted-foreground mb-3">Chapter summaries and key points</p>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Age Applications</h3>
            <p className="text-sm text-muted-foreground mb-3">Age-specific strategies and examples</p>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Implementation Guide</h3>
            <p className="text-sm text-muted-foreground mb-3">Getting started and success metrics</p>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Expert Reflections</h3>
            <p className="text-sm text-muted-foreground mb-3">Expert assessments and recommendations</p>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};