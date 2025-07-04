import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { useUserRole } from "./hooks/useUserRole";
import Header from "./components/Header";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Bookshelf from "./pages/Bookshelf";
import BookDetail from "./pages/BookDetail";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminContent from "./pages/AdminContent";
import AdminSettings from "./pages/AdminSettings";
import AdminBookSummaries from "./pages/AdminBookSummaries";
import EditBookSummary from "./pages/EditBookSummary";
import MembersDashboard from "./pages/MembersDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  
  if (loading || roleLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const AppContent = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/bookshelf" element={
          <ProtectedRoute>
            <Bookshelf />
          </ProtectedRoute>
        } />
        <Route path="/book/:bookId" element={
          <ProtectedRoute>
            <BookDetail />
          </ProtectedRoute>
        } />
        <Route path="/quiz" element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        } />
        <Route path="/resources" element={
          <ProtectedRoute>
            <Bookshelf />
          </ProtectedRoute>
        } />
        <Route path="/auth" element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        } />
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/users" element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        } />
        <Route path="/admin/content" element={
          <AdminRoute>
            <AdminContent />
          </AdminRoute>
        } />
        <Route path="/admin/settings" element={
          <AdminRoute>
            <AdminSettings />
          </AdminRoute>
        } />
        <Route path="/admin/book-summaries" element={
          <AdminRoute>
            <AdminBookSummaries />
          </AdminRoute>
        } />
        <Route path="/admin/book-summaries/edit/:bookId" element={
          <AdminRoute>
            <EditBookSummary />
          </AdminRoute>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
