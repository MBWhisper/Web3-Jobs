import { SpeedInsights } from '@vercel/speed-insights/react';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { PartnersAndAgents } from '@/sections/PartnersAndAgents';
import { JobListings } from '@/sections/JobListings';
import { Monetization } from '@/sections/Monetization';

function App() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <NavBar />
      <main>
        <Hero />
        <Monetization />
        <PartnersAndAgents />
        <JobListings />
      </main>
      <Footer />
      <SpeedInsights />
    </div>
  );
}

export default App;
