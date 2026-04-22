import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import supabase from '@/lib/supabase';
import type { Job } from '@/types';
import {
  Briefcase, Bell, Star, TrendingUp, Zap, Globe, ChevronRight,
  BookmarkCheck, Clock, MapPin, DollarSign, User, LogOut,
  BarChart3, Target, Flame, Award, Search, Plus, ExternalLink
} from 'lucide-react';

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: string; sub: string; color: string;
}) => (
  <div className={`relative overflow-hidden rounded-2xl p-5 border border-white/5 bg-gradient-to-br ${color} group hover:scale-[1.02] transition-all duration-300`}>
    <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 bg-white translate-x-8 -translate-y-8" />
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs text-white/60 font-medium tracking-wider uppercase">{label}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
        <p className="text-xs text-white/50 mt-1">{sub}</p>
      </div>
      <div className="p-2 rounded-xl bg-white/10">
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
  </div>
);

// ─── Job Card ─────────────────────────────────────────────────────────────────
const JobCard = ({ job }: { job: Job }) => {
  const typeColors: Record<string, string> = {
    purple: 'from-purple-900/40 to-purple-800/20 border-purple-500/20',
    teal:   'from-teal-900/40 to-teal-800/20 border-teal-500/20',
    yellow: 'from-yellow-900/40 to-yellow-800/20 border-yellow-500/20',
    default:'from-gray-900/60 to-gray-800/30 border-white/5',
  };
  const color = typeColors[job.cardType || 'default'];
  const tagColors = ['bg-accent-pink/15 text-accent-pink', 'bg-cyan-500/15 text-cyan-400', 'bg-purple-500/15 text-purple-400', 'bg-yellow-500/15 text-yellow-400'];

  return (
    <div className={`relative group rounded-2xl p-5 bg-gradient-to-br border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-black/40 cursor-pointer ${color}`}>
      {job.isFeatured && (
        <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-pink/20 border border-accent-pink/30 text-accent-pink text-xs font-medium">
          <Flame className="w-3 h-3" /> Featured
        </span>
      )}
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-white shrink-0">
          {job.companyLogo
            ? <img src={job.companyLogo} alt={job.company} className="w-full h-full object-contain rounded-xl" />
            : job.company?.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm truncate group-hover:text-accent-pink transition-colors">{job.title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{job.company}</p>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">
            {job.location && (
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
            )}
            {job.salary && (
              <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{job.salary}</span>
            )}
            {job.isRemote && (
              <span className="flex items-center gap-1 text-cyan-400"><Globe className="w-3 h-3" />Remote</span>
            )}
          </div>
        </div>
      </div>
      {/* Tags */}
      {job.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {job.tags.slice(0, 4).map((tag, i) => (
            <span key={i} className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColors[i % tagColors.length]}`}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
        <span className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />{job.postedAt}
        </span>
        <span className="flex items-center gap-1 text-xs text-accent-pink opacity-0 group-hover:opacity-100 transition-opacity">
          View Job <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};

// ─── Activity Item ─────────────────────────────────────────────────────────────
const ActivityItem = ({ icon: Icon, text, time, color }: {
  icon: React.ElementType; text: string; time: string; color: string;
}) => (
  <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
    <div className={`p-2 rounded-lg ${color}`}>
      <Icon className="w-3.5 h-3.5" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-300 leading-relaxed">{text}</p>
      <p className="text-xs text-gray-600 mt-0.5">{time}</p>
    </div>
  </div>
);

// ─── Main Dashboard ────────────────────────────────────────────────────────────
export const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [jobs, setJobs]           = useState<Job[]>([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState<'saved' | 'recommended' | 'applied'>('saved');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await supabase.from('jobs').select('*').limit(6);
        setJobs(data || []);
      } catch (_) {
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchJobs();
  }, [user]);

  const filtered = jobs.filter(j =>
    !searchQuery ||
    j.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-accent-pink/10 border border-accent-pink/20 flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-accent-pink" />
          </div>
          <h2 className="text-xl font-bold text-white">Access Restricted</h2>
          <p className="text-gray-400 mt-2">Please sign in to view your dashboard.</p>
        </div>
      </div>
    );
  }

  const username = user.email?.split('@')[0] || 'Web3 Builder';
  const initials = username.slice(0, 2).toUpperCase();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="min-h-screen bg-bg-primary pt-20">

      {/* ── Hero Banner ─────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/5 via-purple-900/10 to-cyan-900/10" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Left — user info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-pink to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-accent-pink/30">
                  {initials}
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-bg-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">{greeting} 👋</p>
                <h1 className="text-2xl font-orbitron font-bold text-white mt-0.5">{username}</h1>
                <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
              </div>
            </div>

            {/* Right — quick actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={signOut}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
              <button className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-accent-pink hover:bg-accent-pink/90 text-white shadow-lg shadow-accent-pink/30 transition-all hover:scale-[1.02]">
                <Plus className="w-4 h-4" /> Post a Job
              </button>
            </div>
          </div>

          {/* ── Stats Row ─────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <StatCard icon={BookmarkCheck} label="Saved Jobs"    value="12"  sub="+3 this week"    color="from-accent-pink/30 to-pink-900/20" />
            <StatCard icon={Target}        label="Applications"  value="5"   sub="2 in review"     color="from-purple-600/30 to-purple-900/20" />
            <StatCard icon={TrendingUp}    label="Profile Views" value="248" sub="↑ 18% vs last week" color="from-cyan-600/30 to-cyan-900/20" />
            <StatCard icon={Award}         label="Match Score"   value="94%" sub="Top 6% talent"   color="from-yellow-600/30 to-yellow-900/20" />
          </div>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left Column — Jobs ──────────────────────── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Tabs + Search */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/5">
                {(['saved', 'recommended', 'applied'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                      activeTab === tab
                        ? 'bg-accent-pink text-white shadow-md shadow-accent-pink/30'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search jobs..."
                  className="pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-pink/50 transition-all w-48"
                />
              </div>
            </div>

            {/* Jobs Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="rounded-2xl bg-white/5 border border-white/5 p-5 animate-pulse">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-white/10 rounded w-3/4" />
                        <div className="h-2 bg-white/10 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <div className="h-5 w-16 bg-white/10 rounded-full" />
                      <div className="h-5 w-14 bg-white/10 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filtered.map(job => <JobCard key={job.id} job={job} />)}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-white/10 p-14 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent-pink/10 border border-accent-pink/20 flex items-center justify-center mb-4">
                  <Briefcase className="w-7 h-7 text-accent-pink" />
                </div>
                <h3 className="text-white font-semibold">No Jobs Found</h3>
                <p className="text-gray-500 text-sm mt-1 max-w-xs">
                  {searchQuery ? `No results for "${searchQuery}"` : 'Start exploring Web3 opportunities and save jobs you love.'}
                </p>
                <button className="mt-5 px-5 py-2 rounded-xl bg-accent-pink/10 border border-accent-pink/30 text-accent-pink text-sm font-medium hover:bg-accent-pink/20 transition-all">
                  Browse All Jobs
                </button>
              </div>
            )}
          </div>

          {/* ── Right Column — Sidebar ───────────────────── */}
          <div className="space-y-5">

            {/* Profile Completion */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-500/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Profile Strength</h3>
                <span className="text-xs text-purple-400 font-medium">72%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-accent-pink transition-all duration-1000"
                  style={{ width: '72%' }}
                />
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { label: 'Add skills',       done: true  },
                  { label: 'Upload resume',    done: true  },
                  { label: 'Add portfolio',    done: false },
                  { label: 'Verify identity',  done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      item.done ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-600'
                    }`}>
                      {item.done ? '✓' : '·'}
                    </div>
                    <span className={item.done ? 'text-gray-400 line-through' : 'text-gray-300'}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Skills */}
            <div className="rounded-2xl p-5 bg-white/5 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Your Top Skills</h3>
                <Zap className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="space-y-3">
                {[
                  { skill: 'Solidity',   level: 90, color: 'bg-accent-pink' },
                  { skill: 'React',      level: 78, color: 'bg-cyan-500' },
                  { skill: 'Web3.js',    level: 65, color: 'bg-purple-500' },
                  { skill: 'TypeScript', level: 55, color: 'bg-yellow-500' },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300">{s.skill}</span>
                      <span className="text-gray-500">{s.level}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.color} transition-all duration-1000`} style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl p-5 bg-white/5 border border-white/5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
                <Bell className="w-4 h-4 text-gray-500" />
              </div>
              <ActivityItem icon={Star}     text="You saved Senior Solidity Dev at Ethereum Foundation" time="2 hours ago"  color="bg-yellow-500/15 text-yellow-400" />
              <ActivityItem icon={BarChart3} text="Profile viewed by Chainlink recruiter"                time="5 hours ago"  color="bg-cyan-500/15 text-cyan-400" />
              <ActivityItem icon={Briefcase} text="Applied to Web3 Frontend Engineer at OpenSea"         time="1 day ago"    color="bg-accent-pink/15 text-accent-pink" />
              <ActivityItem icon={Globe}    text="New job match: DeFi Protocol Engineer (95% match)"    time="2 days ago"   color="bg-purple-500/15 text-purple-400" />
              <div className="mt-3">
                <button className="w-full py-2 rounded-xl text-xs text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all flex items-center justify-center gap-1">
                  View all activity <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Web3 Market Pulse */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-cyan-900/30 to-cyan-800/10 border border-cyan-500/15">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Web3 Market Pulse</h3>
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="space-y-2">
                {[
                  { role: 'Solidity Dev',   delta: '+24%', up: true  },
                  { role: 'ZK Engineer',    delta: '+41%', up: true  },
                  { role: 'NFT Designer',   delta: '-8%',  up: false },
                  { role: 'Smart Contract', delta: '+18%', up: true  },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{row.role}</span>
                    <span className={`font-semibold ${row.up ? 'text-green-400' : 'text-red-400'}`}>{row.delta}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
