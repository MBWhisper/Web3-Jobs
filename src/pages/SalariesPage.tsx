import { useState } from 'react';
import { TrendingUp, DollarSign, MapPin, Briefcase, ChevronDown } from 'lucide-react';

const salaryData = [
  { role: 'Smart Contract Developer', min: 80000, max: 180000, avg: 130000, demand: 'Very High', trend: '+24%', color: 'text-green-400' },
  { role: 'ZK Engineer', min: 120000, max: 250000, avg: 185000, demand: 'Extreme', trend: '+41%', color: 'text-green-400' },
  { role: 'DeFi Protocol Engineer', min: 100000, max: 220000, avg: 160000, demand: 'High', trend: '+31%', color: 'text-green-400' },
  { role: 'Web3 Frontend Engineer', min: 70000, max: 150000, avg: 110000, demand: 'High', trend: '+18%', color: 'text-green-400' },
  { role: 'Blockchain Architect', min: 140000, max: 280000, avg: 210000, demand: 'Very High', trend: '+22%', color: 'text-green-400' },
  { role: 'NFT Designer', min: 40000, max: 120000, avg: 80000, demand: 'Medium', trend: '-8%', color: 'text-red-400' },
  { role: 'Crypto Analyst', min: 60000, max: 130000, avg: 95000, demand: 'Medium', trend: '+5%', color: 'text-green-400' },
  { role: 'Web3 Security Auditor', min: 110000, max: 260000, avg: 185000, demand: 'Extreme', trend: '+38%', color: 'text-green-400' },
  { role: 'DAO Developer', min: 90000, max: 170000, avg: 130000, demand: 'High', trend: '+15%', color: 'text-green-400' },
  { role: 'Layer2 Engineer', min: 130000, max: 240000, avg: 185000, demand: 'Very High', trend: '+45%', color: 'text-green-400' },
];

const regions = ['Global', 'North America', 'Europe', 'Asia', 'Remote'];
const experiences = ['All Levels', 'Junior (0-2y)', 'Mid (2-5y)', 'Senior (5y+)'];

export function SalariesPage() {
  const [region, setRegion] = useState('Global');
  const [experience, setExperience] = useState('All Levels');
  const [sort, setSort] = useState<'avg' | 'trend'>('avg');

  const sorted = [...salaryData].sort((a, b) =>
    sort === 'avg' ? b.avg - a.avg : parseFloat(b.trend) - parseFloat(a.trend)
  );

  const fmt = (n: number) => `$${(n / 1000).toFixed(0)}k`;

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-pink/10 border border-accent-pink/20 text-accent-pink text-sm font-medium mb-4">
            <DollarSign className="w-4 h-4" /> Web3 Salary Index 2025
          </span>
          <h1 className="text-4xl font-orbitron font-bold text-white mt-2">
            Web3 <span className="text-accent-pink">Salaries</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Real-time salary data across Web3 roles. Updated weekly from 2,400+ job postings.
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Avg Web3 Salary', value: '$148k', sub: 'vs $92k traditional', icon: DollarSign, color: 'from-accent-pink/20 to-pink-900/10 border-accent-pink/20' },
            { label: 'Highest Paid Role', value: 'Blockchain Arch.', sub: 'Up to $280k/yr', icon: TrendingUp, color: 'from-purple-600/20 to-purple-900/10 border-purple-500/20' },
            { label: 'Remote Jobs', value: '73%', sub: 'of all Web3 roles', icon: MapPin, color: 'from-cyan-600/20 to-cyan-900/10 border-cyan-500/20' },
            { label: 'Open Roles', value: '12,400+', sub: '+24% this month', icon: Briefcase, color: 'from-yellow-600/20 to-yellow-900/10 border-yellow-500/20' },
          ].map((s, i) => (
            <div key={i} className={`rounded-2xl p-4 bg-gradient-to-br border ${s.color}`}>
              <s.icon className="w-5 h-5 text-white/50 mb-2" />
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
              <p className="text-xs text-gray-600 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {regions.map(r => (
              <button key={r} onClick={() => setRegion(r)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  region === r
                    ? 'bg-accent-pink text-white border-accent-pink shadow-md shadow-accent-pink/30'
                    : 'text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}>{r}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <select value={experience} onChange={e => setExperience(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 focus:outline-none focus:border-accent-pink/50">
              {experiences.map(e => <option key={e} value={e} className="bg-gray-900">{e}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value as 'avg' | 'trend')}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 focus:outline-none focus:border-accent-pink/50">
              <option value="avg" className="bg-gray-900">Sort by Salary</option>
              <option value="trend" className="bg-gray-900">Sort by Trend</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-white/5 overflow-hidden">
          <div className="grid grid-cols-6 gap-4 px-5 py-3 bg-white/5 text-xs text-gray-500 uppercase tracking-wider font-medium">
            <div className="col-span-2">Role</div>
            <div>Min</div>
            <div>Max</div>
            <div>Average</div>
            <div>Trend</div>
          </div>
          {sorted.map((row, i) => (
            <div key={i} className="grid grid-cols-6 gap-4 px-5 py-4 border-t border-white/5 hover:bg-white/5 transition-colors group">
              <div className="col-span-2">
                <p className="text-sm font-medium text-white group-hover:text-accent-pink transition-colors">{row.role}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${
                  row.demand === 'Extreme' ? 'bg-red-500/15 text-red-400' :
                  row.demand === 'Very High' ? 'bg-orange-500/15 text-orange-400' :
                  row.demand === 'High' ? 'bg-yellow-500/15 text-yellow-400' :
                  'bg-gray-500/15 text-gray-400'
                }`}>{row.demand}</span>
              </div>
              <div className="text-sm text-gray-400 self-center">{fmt(row.min)}</div>
              <div className="text-sm text-gray-400 self-center">{fmt(row.max)}</div>
              <div className="self-center">
                <span className="text-sm font-bold text-white">{fmt(row.avg)}</span>
                <div className="w-full h-1.5 bg-white/5 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-accent-pink to-purple-500 rounded-full"
                    style={{ width: `${(row.avg / 250000) * 100}%` }} />
                </div>
              </div>
              <div className={`text-sm font-bold self-center ${row.color}`}>{row.trend}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">Data sourced from 2,400+ Web3 job postings · Updated weekly</p>
      </div>
    </div>
  );
}
