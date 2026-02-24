import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { navItems } from '@/lib/data';

type AuthMode = 'login' | 'signup';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
    setMobileMenuOpen(false);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    alert(authMode === 'login' ? 'Login request sent successfully ✅' : 'Sign up request sent successfully ✅');
    setEmail('');
    setPassword('');
    setAuthOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down ${
          scrolled ? 'bg-bg-primary/90 backdrop-blur-md border-b border-accent-pink/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2 hover:scale-[1.02] transition-transform">
              <span className="text-xl font-orbitron font-bold text-white">
                <span className="text-accent-pink">Web3</span> Jobs
              </span>
            </a>

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

            <div className="hidden lg:flex items-center gap-3">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10" onClick={() => openAuth('login')}>
                Login
              </Button>
              <Button className="bg-accent-pink hover:bg-accent-pink-dark text-white px-6" onClick={() => openAuth('signup')}>
                Sign Up
              </Button>
            </div>

            <button className="lg:hidden p-2 text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-bg-primary/95 backdrop-blur-md border-b border-accent-pink/20 animate-fade-in">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 text-gray-300 hover:text-accent-pink hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-800 space-y-2">
                <Button variant="ghost" className="w-full text-gray-300 hover:text-white" onClick={() => openAuth('login')}>
                  Login
                </Button>
                <Button className="w-full bg-accent-pink hover:bg-accent-pink-dark text-white" onClick={() => openAuth('signup')}>
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {authOpen && (
        <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-bg-secondary border border-accent-pink/30 rounded-lg p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-white mb-4">{authMode === 'login' ? 'Login' : 'Create Account'}</h2>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="bg-black/40 border-gray-700 text-white" />
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="bg-black/40 border-gray-700 text-white" />
              <div className="flex gap-3">
                <Button type="submit" className="flex-1 bg-accent-pink hover:bg-accent-pink-dark text-white">
                  {authMode === 'login' ? 'Login' : 'Sign Up'}
                </Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setAuthOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
