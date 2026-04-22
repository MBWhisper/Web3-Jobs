import { useState } from 'react';
import { Flame, TrendingUp, Star, Clock, MapPin, DollarSign, Globe, ExternalLink, Filter } from 'lucide-react';

const topJobs = [
  { id: 1, title: 'Senior ZK Engineer', company: 'StarkWare', logo: 'SW', location: 'Remote', salary: '$200k–$280k', tags: ['ZK', 'Cairo', 'Rust'], isRemote: true, category: 'best-paid', trending: true, postedAt: '1 day ago', views: 4200 },
  { id: 2, title: 'DeFi Protocol Lead', company: 'Aave', logo: 'AV', location: 'Remote', salary: '$180k–$240k', tags: ['DeFi', 'Solidity', 'Go'], isRemote: true, category: 'trending', trending: true, postedAt: '2 days ago', views: 3800 },
  { id: 3, title: 'Blockchain Architect', company: 'Chainlink', logo: 'CL', location: 'New York', salary: '$220k–$300k', tags: ['Architecture', 'Rust', 'Oracle'], isRemote: false, category: 'best-paid', trending: false, postedAt: '3 days ago', views: 3100 },
  { id: 4, title: 'Smart Contract Auditor', company: 'Trail of Bits', logo: 'TB', location: 'Remote', salary: '$160k–$220k', tags: ['Security', 'Solidity', 'Audit'], isRemote: true, category: 'trending', trending: true, postedAt: '1 day ago', views: 5100 },
  { id: 5, title: 'Layer2 Core Dev', company: 'Optimism', logo: 'OP', location: 'Remote', salary: '$170k–$230k', tags: ['L2', 'Go', 'Rollups'], isRemote: true, category: 'new', trending: false, postedAt: '12 hours ago', views: 2900 },
  { id: 6, title: 'Web3 Product Manager', company: 'Uniswap', logo: 'UNI', location: 'San Francisco', salary: '$150k–$200k', tags: ['Product', 'DeFi', 'Strategy'], isRemote: false, category: 'new', trending: false, postedAt: '8 hours ago', views: 1800 },
  { id: 7, title: 'Cryptography Researcher', company: 'Ethereum Foundation', logo: 'EF', location: 'Remote', salary: '$180k–$260k', tags: ['Cryptography', 'Research', 'ZK'], isRemote: true, category: 'best-paid', trending: true, postedAt: '4 days ago', views: 6200 },
  { id: 8, title: 'NFT Platform Engineer', company: 'OpenSea', logo: 'OS', location: 'Remote', salary: '$130k–$180k', tags: ['NFT', 'React', 'Node.js'], isRemote: true, category: 'new', trending: false, postedAt: '6 hours ago', views: 1200 },
];

const categories = [
  { id: 'all', label: 'All Top Jobs', icon: Star },
  { id: 'trending', label: 'Trending 🔥', icon: Flame },
  { id: 'best-paid', label: 'Best Paid 💰', icon: TrendingUp },
  { id: 'new', label: 'New Today ⚡', icon: Clock },
];

const tagColors = [
  'bg-accent-pink/15 text-accent-pink',
  'bg-cyan-500/15 text-cyan-400',
  'bg-purple-500/15 text-purple-400',
];

export function TopJobsPage() {
  const [active, setActive] = useState('all');

  const filtered = topJobs
    .filter(j => active === 'all' || j.category === active)
    .sort((a, b) => b.views - a.views);

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-4">
            <Flame className="w-4 h-4" /> Curated Top Opportunities
          </span>
          <h1 className="text-4xl font-orbitron font-bold text-white mt-2">
            TOP Web3 <span className="text-accent-pink">Jobs</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Hand-picked elite Web3 positions. The best-paying, most-viewed, and newest opportunities updated daily.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActive(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                active === cat.id
                  ? 'bg-accent-pink text-white border-accent-pink shadow-lg shadow-accent-pink/30'
                  : 'text-gray-400 border-white/10 hover:border-white/20 hover:text-white bg-white/5'
              }`}>
              <cat.icon className="w-4 h-4" />{cat.label}
            </button>
          ))}
        </div>

        {/* Job List */}
        <div className="space-y-3">
          {filtered.map((job, idx) => (
            <div key={job.id}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all cursor-pointer group">
              {/* Rank */}
              <div className={`text-sm font-bold w-7 shrink-0 ${
                idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-orange-400' : 'text-gray-600'
              }`}>#{idx + 1}</div>

              {/* Logo */}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
                {job.logo}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white text-sm group-hover:text-accent-pink transition-colors truncate">{job.title}</h3>
                  {job.trending && (
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-xs shrink-0">
                      <Flame className="w-2.5 h-2.5" /> Hot
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{job.company}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {job.tags.map((tag, i) => (
                    <span key={i} className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColors[i % tagColors.length]}`}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="hidden sm:flex flex-col items-end gap-1.5 shrink-0">
                <span className="text-sm font-bold text-green-400">{job.salary}</span>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {job.isRemote && <span className="flex items-center gap-0.5 text-cyan-400"><Globe className="w-3 h-3" />Remote</span>}
                  {!job.isRemote && <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{job.location}</span>}
                  <span>{job.views.toLocaleString()} views</span>
                </div>
                <span className="text-xs text-gray-600">{job.postedAt}</span>
              </div>

              <ExternalLink className="w-4 h-4 text-gray-700 group-hover:text-accent-pink transition-colors shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
