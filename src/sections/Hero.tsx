import { useState, useEffect } from 'react';
import { Globe3D } from '@/components/Globe3D';
import { GridWave } from '@/components/GridWave';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, TrendingUp, Users, Zap } from 'lucide-react';

const companyLogos = [
  { name: 'unicef', x: 20, y: 70 },
  { name: 'polygon', x: 35, y: 85 },
  { name: 'stripe', x: 55, y: 80 },
  { name: 'buildspace', x: 75, y: 70 },
  { name: 'ethereum', x: 15, y: 50 },
  { name: 'solana', x: 80, y: 50 },
];

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  return count;
}

export function Hero() {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  const jobsCount = useAnimatedCounter(71610);
  const companiesCount = useAnimatedCounter(7112);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubscribe = () => {
    if (!email) {
      alert('Please enter your email first.');
      return;
    }

    alert('Subscription request submitted ✅');
    setEmail('');
  };

  const scrollToJobs = () => {
    const element = document.getElementById('job-listings');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 lg:pt-20"
      role="region"
      aria-label="Hero section"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Radial gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-pink-500/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent-pink/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full blur-[150px]" />
      
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent-pink/30 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-500/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div 
          className={`flex justify-center mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <Badge 
            variant="secondary" 
            className="px-4 py-1.5 bg-accent-pink/10 border-accent-pink/30 text-accent-pink hover:bg-accent-pink/20"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Trusted by 7,000+ Web3 Companies
          </Badge>
        </div>

        {/* Headline */}
        <h1 
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          WEB3 IS <span className="text-gradient-animated">ALIVE</span>
        </h1>

        {/* Subtext */}
        <p 
          className={`text-gray-400 text-lg md:text-xl mb-6 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Browse <span className="text-white font-semibold">{jobsCount.toLocaleString()}+</span> blockchain jobs at{' '}
          <span className="text-white font-semibold">{companiesCount.toLocaleString()}</span> projects. 
          Filter the best remote crypto jobs by salary, location, and skills.
        </p>

        {/* Stats Row */}
        <div 
          className={`flex flex-wrap items-center justify-center gap-6 mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="flex items-center gap-2 text-gray-400">
            <TrendingUp className="w-4 h-4 text-accent-pink" />
            <span className="text-sm">High Salaries</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Users className="w-4 h-4 text-cyan-400" />
            <span className="text-sm">Remote First</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Zap className="w-4 h-4 text-lime-400" />
            <span className="text-sm">Fast Growth</span>
          </div>
        </div>

        {/* Ecosystem badge */}
        <div 
          className={`flex items-center justify-center gap-2 mb-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span className="text-gray-500">web3.career is now part of the</span>
          <a 
            href="#" 
            className="flex items-center gap-1.5 text-accent-pink hover:underline group"
          >
            <span className="w-5 h-5 rounded-full bg-accent-pink/20 flex items-center justify-center text-xs group-hover:bg-accent-pink/30 transition-colors">B</span>
            Bondex Ecosystem
          </a>
        </div>

        {/* Email subscription */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span className="text-gray-500 text-sm">Receive emails of new Web3 Jobs</span>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-64 bg-black/50 border-gray-700 text-white placeholder:text-gray-600 focus:border-accent-pink focus:ring-1 focus:ring-accent-pink/50"
              aria-label="Email subscription"
            />
            <Button 
              className="bg-accent-pink hover:bg-accent-pink-dark text-white shadow-lg shadow-accent-pink/25 hover:shadow-accent-pink/40 transition-all"
              onClick={handleSubscribe}
            >
              Subscribe
            </Button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <Button 
            size="lg" 
            className="bg-accent-pink hover:bg-accent-pink-dark text-white px-8 py-6 text-lg shadow-lg shadow-accent-pink/25 hover:shadow-accent-pink/40 transition-all group"
            onClick={scrollToJobs}
          >
            Browse Jobs
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:bg-white/10 hover:text-white px-8 py-6 text-lg"
          >
            Post a Job
          </Button>
        </div>
      </div>

      {/* 3D Globe and Grid Wave */}
      <div 
        className={`relative w-full max-w-3xl mx-auto mt-8 lg:mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Globe container */}
        <div className="relative h-64 sm:h-80 lg:h-96">
          {/* Globe */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
              <Globe3D />
            </div>
          </div>

          {/* Floating company logos */}
          {companyLogos.map((logo, index) => (
            <div
              key={logo.name}
              className="absolute animate-fade-in opacity-0"
              style={{
                left: `${logo.x}%`,
                top: `${logo.y}%`,
                animationDelay: `${0.8 + index * 0.1}s`,
                animationFillMode: 'forwards',
              }}
            >
              <div
                className="text-gray-500 text-xs sm:text-sm font-medium opacity-60 hover:opacity-100 transition-all cursor-pointer animate-float hover:text-accent-pink"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                {logo.name}
              </div>
            </div>
          ))}
        </div>

        {/* Grid Wave */}
        <div className="h-32 sm:h-40 mt-4">
          <GridWave />
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col items-center gap-2 text-gray-500 animate-bounce-slow">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-accent-pink rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
