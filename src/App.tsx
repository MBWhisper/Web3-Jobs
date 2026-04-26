import { useEffect, lazy, Suspense } from 'react';
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

// Lazy-loaded pages — loaded only when the user navigates to them
const SalariesPage     = lazy(() => import('@/pages/SalariesPage').then(m => ({ default: m.SalariesPage })));
const InternshipsPage  = lazy(() => import('@/pages/InternshipsPage').then(m => ({ default: m.InternshipsPage })));
const LearnPage        = lazy(() => import('@/pages/LearnPage').then(m => ({ default: m.LearnPage })));
const PartnershipsPage = lazy(() => import('@/pages/PartnershipsPage').then(m => ({ default: m.PartnershipsPage })));
const AgentsPage       = lazy(() => import('@/pages/AgentsPage').then(m => ({ default: m.AgentsPage })));
const TopJobsPage      = lazy(() => import('@/pages/TopJobsPage').then(m => ({ default: m.TopJobsPage })));

// Minimal loading spinner shown while lazy pages load
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg-primary">
    <div className="w-8 h-8 border-2 border-accent-pink border-t-transparent rounded-full animate-spin" />
  </div>
);

function AuthRedirectHandler() {
  useAuth();
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
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/salaries"      element={<SalariesPage />} />
              <Route path="/internships"   element={<InternshipsPage />} />
              <Route path="/learn"         element={<LearnPage />} />
              <Route path="/partnerships"  element={<PartnershipsPage />} />
              <Route path="/agents"        element={<AgentsPage />} />
              <Route path="/top-jobs"      element={<TopJobsPage />} />
              <Route path="*"              element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
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
