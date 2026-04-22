import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, Sun, Moon, Search, Bell, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { navItems } from '@/lib/data';
import { useAuth } from '@/hooks/useAuth';

type AuthMode = 'login' | 'signup';

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();

  // Sample notifications
  const notifications = [
    { id: 1, title: 'New job matching your skills', message: 'Senior Solidity Developer at Ethereum Foundation', time: '2h ago', unread: true },
    { id: 2, title: 'Application update', message: 'Your application to Lemon.io was viewed', time: '1d ago', unread: true },
    { id: 3, title: 'New message', message: 'You have a new message from Hashgraph HR', time: '2d ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    // If user is already logged in, close auth modal
    if (user) {
      setAuthOpen(false);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  const openAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthOpen(true);
    setMobileMenuOpen(false);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    try {
      if (authMode === 'login') {
        const { data, error } = await signIn(email, password);
        
        if (error) {
          alert(`Login failed: ${error.message}`);
          return;
        }

        if (data.user) {
          // Redirect to dashboard after successful login
          navigate('/dashboard');
          setAuthOpen(false);
        }
      } else {
        const { error } = await signUp(email, password);
        
        if (error) {
          alert(`Sign up failed: ${error.message}`);
          return;
        }

        alert('Account created successfully! Please check your email to verify your account.');
        setAuthMode('login'); // Switch to login after successful signup
      }
      
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Authentication error:', err);
      alert(`Authentication error: ${(err as Error).message}`);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 animate-slide-down ${
          scrolled 
            ? 'bg-bg-primary/90 dark:bg-bg-primary/90 backdrop-blur-md border-b border-accent-pink/20 shadow-lg shadow-accent-pink/5' 
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a 
              href="#home" 
              className="flex items-center gap-2 hover:scale-[1.02] transition-transform group"
              aria-label="Web3 Jobs Home"
            >
              <div className="relative">
                <span className="text-xl lg:text-2xl font-orbitron font-bold text-white group-hover:text-accent-pink transition-colors">
                  <span className="text-accent-pink">Web3</span> Jobs
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-pink to-cyan-400 group-hover:w-full transition-all duration-300" />
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex bg-accent-pink/20 text-accent-pink text-xs">
                {jobs.length.toLocaleString()}+ Jobs
              </Badge>
            </a>

            {/* Desktop Navigation */}
            <nav 
              className="hidden lg:flex items-center gap-1" 
              role="navigation" 
              aria-label="Main navigation"
            >
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm text-gray-300 hover:text-accent-pink transition-all duration-200 relative group"
                  aria-label={item.label}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent-pink scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              {/* Search Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-white hover:bg-white/10"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search jobs"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Notifications */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-300 hover:text-white hover:bg-white/10 relative"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  aria-label="Notifications"
                  aria-expanded={notificationsOpen}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-pink text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-bg-secondary border border-gray-800 rounded-lg shadow-xl animate-fade-in-up overflow-hidden">
                    <div className="p-3 border-b border-gray-800">
                      <h3 className="font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id} 
                          className={`p-3 border-b border-gray-800/50 hover:bg-white/5 cursor-pointer transition-colors ${notif.unread ? 'bg-accent-pink/5' : ''}`}
                        >
                          <div className="flex items-start gap-3">
                            {notif.unread && (
                              <span className="w-2 h-2 bg-accent-pink rounded-full mt-2 flex-shrink-0" />
                            )}
                            <div className={notif.unread ? '' : 'ml-5'}>
                              <p className="text-sm font-medium text-white">{notif.title}</p>
                              <p className="text-xs text-gray-400 mt-1">{notif.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t border-gray-800">
                      <Button variant="ghost" className="w-full text-sm text-accent-pink hover:text-accent-pink-dark">
                        View all notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Dark/Light Mode Toggle */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-white hover:bg-white/10"
                onClick={() => setDarkMode(!darkMode)}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              {/* Post Job Button */}
              <Button 
                variant="outline" 
                className="border-accent-pink/50 text-accent-pink hover:bg-accent-pink hover:text-white"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Post a Job
              </Button>

              {/* Auth Buttons */}
              {user ? (
                <Button 
                  className="bg-accent-pink hover:bg-accent-pink-dark text-white px-6 shadow-lg shadow-accent-pink/25" 
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-white hover:bg-white/10" 
                    onClick={() => openAuth('login')}
                  >
                    Login
                  </Button>
                  <Button 
                    className="bg-accent-pink hover:bg-accent-pink-dark text-white px-6 shadow-lg shadow-accent-pink/25" 
                    onClick={() => openAuth('signup')}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-gray-300 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            className="lg:hidden bg-bg-primary/95 backdrop-blur-md border-b border-accent-pink/20 animate-fade-in"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  type="search" 
                  placeholder="Search jobs..." 
                  className="pl-10 bg-black/40 border-gray-700 text-white placeholder:text-gray-500"
                />
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col space-y-1">
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
              </nav>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-gray-800 space-y-2">
                <div className="flex items-center gap-2 px-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-300"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-gray-300 relative"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-pink text-white text-xs rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-accent-pink/50 text-accent-pink hover:bg-accent-pink hover:text-white"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Post a Job
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  {user ? (
                    <Button 
                      className="col-span-2 bg-accent-pink hover:bg-accent-pink-dark text-white" 
                      onClick={() => {
                        navigate('/dashboard');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Dashboard
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="ghost" 
                        className="text-gray-300 hover:text-white" 
                        onClick={() => {
                          openAuth('login');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                      <Button 
                        className="bg-accent-pink hover:bg-accent-pink-dark text-white" 
                        onClick={() => {
                          openAuth('signup');
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 p-4"
          onClick={() => setSearchOpen(false)}
        >
          <div 
            className="w-full max-w-2xl bg-bg-secondary border border-accent-pink/30 rounded-xl overflow-hidden animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                  type="search" 
                  placeholder="Search jobs, companies, skills..." 
                  className="pl-12 bg-black/40 border-gray-700 text-white placeholder:text-gray-500 text-lg h-14"
                  autoFocus
                />
              </div>
            </div>
            <div className="border-t border-gray-800 p-4">
              <p className="text-sm text-gray-400 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {['Solidity', 'Remote', 'Senior', 'DeFi', 'NFT', 'Rust'].map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-accent-pink/20 hover:border-accent-pink transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {authOpen && (
        <div 
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setAuthOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-title"
        >
          <div 
            className="w-full max-w-md bg-bg-secondary border border-accent-pink/30 rounded-xl p-6 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent-pink to-purple-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 id="auth-title" className="text-2xl font-orbitron font-bold text-white">
                {authMode === 'login' ? 'Welcome Back' : 'Join Web3 Jobs'}
              </h2>
              <p className="text-gray-400 mt-2">
                {authMode === 'login' 
                  ? 'Sign in to access your saved jobs and applications' 
                  : 'Create an account to start your Web3 career journey'}
              </p>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Email address" 
                  className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 h-12"
                  aria-label="Email address"
                />
              </div>
              <div>
                <Input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="Password" 
                  className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500 h-12"
                  aria-label="Password"
                />
              </div>
              
              {authMode === 'login' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-400">
                    <input type="checkbox" className="rounded border-gray-600 bg-black/40" />
                    Remember me
                  </label>
                  <a href="#" className="text-accent-pink hover:underline">Forgot password?</a>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-accent-pink hover:bg-accent-pink-dark text-white h-12 text-lg font-semibold"
              >
                {authMode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-800" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-bg-secondary text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-gray-700 hover:bg-white/10">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-white/10">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </Button>
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-gray-400">
              {authMode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    className="text-accent-pink hover:underline font-medium"
                    onClick={() => setAuthMode('signup')}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button 
                    type="button"
                    className="text-accent-pink hover:underline font-medium"
                    onClick={() => setAuthMode('login')}
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>

            <Button 
              type="button" 
              variant="ghost" 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setAuthOpen(false)}
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

// Sample jobs count for badge - this would normally come from props or context
const jobs = [
  { id: '1', title: 'Senior Blockchain Developer' },
  { id: '2', title: 'Web3 Solidity Bootcamp' },
];