import { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { navItems } from '@/lib/data';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down ${
        scrolled 
          ? 'bg-bg-primary/90 backdrop-blur-md border-b border-accent-pink/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 hover:scale-[1.02] transition-transform">
            <span className="text-xl font-orbitron font-bold text-white">
              <span className="text-accent-pink">Web3</span> Jobs
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-sm text-gray-300 hover:text-accent-pink transition-colors relative group"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent-pink scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white hover:bg-white/10"
            >
              Login
            </Button>
            <Button 
              className="bg-accent-pink hover:bg-accent-pink-dark text-white px-6"
            >
              Post a Job
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-bg-primary/95 backdrop-blur-md border-b border-accent-pink/20 animate-fade-in">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center justify-between px-4 py-3 text-gray-300 hover:text-accent-pink hover:bg-white/5 rounded-lg transition-colors"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-800 space-y-2">
              <Button 
                variant="ghost" 
                className="w-full text-gray-300 hover:text-white"
              >
                Login
              </Button>
              <Button 
                className="w-full bg-accent-pink hover:bg-accent-pink-dark text-white"
              >
                Post a Job
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
