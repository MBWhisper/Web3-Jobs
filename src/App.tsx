import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { JobListings } from '@/sections/JobListings';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <NavBar />
      <main>
        <Hero />
        <JobListings />
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
}

export default App;
