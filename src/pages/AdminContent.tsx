import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  BookOpen, 
  Headphones, 
  Mic, 
  MessageCircle, 
  Moon, 
  FileQuestion, 
  Video, 
  Star, 
  Image,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminContent = () => {
  const featuredContent = [
    {
      title: "Book Summaries",
      description: "Create and edit book summaries for users",
      icon: BookOpen,
      href: "/admin/book-summaries",
      available: true,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Blog & Articles",
      description: "Manage blog posts and educational content",
      icon: FileText,
      href: "#",
      available: false,
      gradient: "from-green-500 to-teal-600"
    }
  ];

  const contentTypes = [
    {
      title: "White Noise Files",
      description: "Upload and manage white noise audio files",
      icon: Headphones,
      href: "#",
      available: false,
      color: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      title: "Podcasts",
      description: "Manage podcast episodes and content",
      icon: Mic,
      href: "#",
      available: false,
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Conversation Prompts",
      description: "Create discussion starters and conversation guides",
      icon: MessageCircle,
      href: "#",
      available: false,
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Bedtime Stories",
      description: "Manage bedtime stories and sleep content",
      icon: Moon,
      href: "#",
      available: false,
      color: "bg-indigo-100",
      iconColor: "text-indigo-600"
    },
    {
      title: "How-To Guides",
      description: "Create and edit how-to guides and tutorials",
      icon: FileQuestion,
      href: "#",
      available: false,
      color: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Videos",
      description: "Manage video content and tutorials",
      icon: Video,
      href: "#",
      available: false,
      color: "bg-red-100",
      iconColor: "text-red-600"
    },
    {
      title: "User Spotlights",
      description: "Feature content and user success stories",
      icon: Star,
      href: "#",
      available: false,
      color: "bg-yellow-100",
      iconColor: "text-yellow-600"
    },
    {
      title: "Media Gallery",
      description: "Manage image gallery and media assets",
      icon: Image,
      href: "#",
      available: false,
      color: "bg-pink-100",
      iconColor: "text-pink-600"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Admin
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
            <p className="text-muted-foreground mt-1">Create, edit, and manage all content across the platform</p>
          </div>
        </div>
      </div>

      {/* Start with the basics */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Start with the basics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {featuredContent.map((content) => {
            const IconComponent = content.icon;
            
            return (
              <div key={content.title} className="group cursor-pointer">
                {content.available ? (
                  <Link to={content.href}>
                    <Card className={`h-48 overflow-hidden bg-gradient-to-br ${content.gradient} text-white hover:shadow-lg transition-all duration-200 border-0`}>
                      <CardContent className="p-8 h-full flex flex-col justify-between">
                        <div>
                          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{content.title}</h3>
                          <p className="text-white/90 text-sm">{content.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all self-start" />
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card className={`h-48 overflow-hidden bg-gradient-to-br ${content.gradient} text-white opacity-60 border-0`}>
                    <CardContent className="p-8 h-full flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{content.title}</h3>
                        <p className="text-white/90 text-sm">{content.description}</p>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 self-start">
                        Coming Soon
                      </Badge>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Build content types */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Manage content types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {contentTypes.map((contentType) => {
            const IconComponent = contentType.icon;
            
            return (
              <div key={contentType.title} className="group cursor-pointer">
                {contentType.available ? (
                  <Link to={contentType.href}>
                    <Card className="hover:shadow-md transition-shadow border border-gray-200 hover:border-gray-300">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg ${contentType.color} flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className={`w-5 h-5 ${contentType.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {contentType.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {contentType.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card className="border border-gray-200 opacity-60">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${contentType.color} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className={`w-5 h-5 ${contentType.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground">
                            {contentType.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {contentType.description}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          Beta
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Statistics */}
      <div className="max-w-4xl">
        <h3 className="text-xl font-semibold mb-4">Content Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-foreground">24</div>
              <p className="text-sm text-muted-foreground mt-1">Total Content Items</p>
              <p className="text-xs text-muted-foreground">Across all content types</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">3</div>
              <p className="text-sm text-muted-foreground mt-1">Published This Week</p>
              <p className="text-xs text-muted-foreground">New content items</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600">1</div>
              <p className="text-sm text-muted-foreground mt-1">Pending Review</p>
              <p className="text-xs text-muted-foreground">Items awaiting approval</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
