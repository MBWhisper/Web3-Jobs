import { useState } from 'react';
import { Globe3D } from '@/components/Globe3D';
import { GridWave } from '@/components/GridWave';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const companyLogos = [
  { name: 'unicef', x: 20, y: 70 },
  { name: 'polygon', x: 35, y: 85 },
  { name: 'stripe', x: 55, y: 80 },
  { name: 'buildspace', x: 75, y: 70 },
  { name: 'ethereum', x: 15, y: 50 },
  { name: 'solana', x: 80, y: 50 },
];

export function Hero() {
  const [email, setEmail] = useState('');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-pink-500/10 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-bold text-white mb-6 animate-glow-pulse animate-fade-in-up">
          WEB3 IS <span className="text-accent-pink">ALIVE</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 text-lg mb-4 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
          Browse 71,610 blockchain jobs in web3 at 7,112 projects. Filter the best remote crypto jobs by salary, location, and skills.
        </p>

        {/* Ecosystem badge */}
        <div className="flex items-center justify-center gap-2 mb-8 animate-fade-in-up animation-delay-200">
          <span className="text-gray-500">web3.career is now part of the</span>
          <a href="#" className="flex items-center gap-1.5 text-accent-pink hover:underline">
            <span className="w-5 h-5 rounded-full bg-accent-pink/20 flex items-center justify-center text-xs">B</span>
            Bondex Ecosystem
          </a>
        </div>

        {/* Email subscription */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 animate-fade-in-up animation-delay-300">
          <span className="text-gray-500 text-sm">Receive emails of new Web3 Jobs</span>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-64 bg-black/50 border-gray-700 text-white placeholder:text-gray-600 focus:border-accent-pink"
            />
            <Button className="bg-accent-pink hover:bg-accent-pink-dark text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      {/* 3D Globe and Grid Wave */}
      <div className="relative w-full max-w-3xl mx-auto mt-8 animate-fade-in animation-delay-500">
        {/* Globe container */}
        <div className="relative h-64 sm:h-80">
          {/* Globe */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64">
              <Globe3D />
            </div>
          </div>

          {/* Floating company logos */}
          {companyLogos.map((logo, index) => (
            <div
              key={logo.name}
              className="absolute animate-fade-in"
              style={{
                left: `${logo.x}%`,
                top: `${logo.y}%`,
                animationDelay: `${0.8 + index * 0.1}s`,
              }}
            >
              <div
                className="text-gray-500 text-xs sm:text-sm font-medium opacity-60 hover:opacity-100 transition-opacity cursor-pointer animate-float"
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
    </section>
  );
}
