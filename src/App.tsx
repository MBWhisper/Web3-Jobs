import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { JobListings } from '@/sections/JobListings';
import { Monetization } from '@/sections/Monetization';

function App() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <NavBar />
      <main>
        <Hero />
        <Monetization />
        <JobListings />
      </main>
      <Footer />
    </div>
  );
}

export default App;
