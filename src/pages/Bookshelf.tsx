import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Sample books data - in a real app this would come from an API
const booksData = [
  {
    id: "attached",
    title: "Attached: The New Science of Adult Attachment",
    author: "Amir Levine, M.D.",
    genre: "Psychology, Relationships",
    pages: 300,
    year: 2010,
    rating: 4.5,
    readingTime: "6 hours",
    color: "bg-gradient-primary",
    description: "Understanding adult attachment styles for better relationships"
  },
  {
    id: "whole-brain-child",
    title: "The Whole-Brain Child",
    author: "Daniel J. Siegel",
    genre: "Child Development",
    pages: 224,
    year: 2011,
    rating: 4.7,
    readingTime: "4 hours",
    color: "bg-gradient-secondary",
    description: "12 revolutionary strategies to nurture your child's developing mind"
  },
  {
    id: "mindful-parenting",
    title: "Mindful Parenting",
    author: "Jon Kabat-Zinn",
    genre: "Mindfulness, Parenting",
    pages: 352,
    year: 1997,
    rating: 4.6,
    readingTime: "7 hours",
    color: "bg-gradient-accent",
    description: "Bringing mindfulness to the challenges of raising children"
  },
  {
    id: "peaceful-parent",
    title: "Peaceful Parent, Happy Kids",
    author: "Dr. Laura Markham",
    genre: "Positive Parenting",
    pages: 288,
    year: 2012,
    rating: 4.4,
    readingTime: "5 hours",
    color: "bg-gradient-subtle",
    description: "How to stop yelling and start connecting"
  }
];

const Bookshelf = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Bookshelf</h1>
          <p className="text-muted-foreground">Discover evidence-based parenting insights</p>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {booksData.map((book) => (
            <Card 
              key={book.id} 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 overflow-hidden"
            >
              <div className={`h-32 ${book.color} relative`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {book.genre.split(',')[0]}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground">by {book.author}</p>
              </CardHeader>
              
              <CardContent className="pt-0 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {book.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{book.readingTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span>{book.rating}</span>
                  </div>
                  <span>{book.pages} pages</span>
                </div>
                
                <Button 
                  asChild 
                  className="w-full mt-4 group-hover:bg-primary-soft group-hover:text-primary"
                  variant="outline"
                >
                  <Link to={`/book/${book.id}`}>
                    Read Summary
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State for More Books */}
        <Card className="mt-8 border-dashed border-2 border-muted">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">More Books Coming Soon</h3>
            <p className="text-muted-foreground mb-4">
              We're constantly adding new parenting insights to help you on your journey
            </p>
            <Button variant="outline" disabled>
              Browse Catalog
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Bookshelf;