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
import { SalariesPage } from '@/pages/SalariesPage';
import { InternshipsPage } from '@/pages/InternshipsPage';
import { LearnPage } from '@/pages/LearnPage';
import { PartnershipsPage } from '@/pages/PartnershipsPage';
import { AgentsPage } from '@/pages/AgentsPage';
import { TopJobsPage } from '@/pages/TopJobsPage';
import supabase from '@/lib/supabase';

function AuthRedirectHandler() {
  const { } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/dashboard');
      } else if (event === 'SIGNED_OUT') {
        if (location.pathname.startsWith('/dashboard')) {
          navigate('/');
        }
      }
    });
    return () => { subscription.unsubscribe(); };
  }, [navigate, location]);

  return null;
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
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/salaries" element={<SalariesPage />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/partnerships" element={<PartnershipsPage />} />
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/top-jobs" element={<TopJobsPage />} />
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
