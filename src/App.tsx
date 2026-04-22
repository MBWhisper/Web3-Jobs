import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { PartnersAndAgents } from '@/sections/PartnersAndAgents';
import { JobListings } from '@/sections/JobListings';
import { Monetization } from '@/sections/Monetization';
import { Dashboard } from '@/components/Dashboard';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import supabase from '@/lib/supabase';

// Component to handle redirects after auth state changes
function AuthRedirectHandler() {
  const { } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle auth state changes and redirect accordingly
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Redirect to dashboard after successful sign in (including magic link)
        navigate('/dashboard');
      } else if (event === 'SIGNED_OUT') {
        // Optionally redirect to home after logout
        if (location.pathname.startsWith('/dashboard')) {
          navigate('/');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location]);

  return null; // This component doesn't render anything
}

function AppContent() {
  return (
    <>
      <AuthRedirectHandler />
      <div className="min-h-screen bg-bg-primary">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Monetization />
                <PartnersAndAgents />
                <JobListings />
              </>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;