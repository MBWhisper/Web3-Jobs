import { useState } from 'react';
import { GraduationCap, MapPin, Clock, DollarSign, Globe, Flame, Search } from 'lucide-react';

const internships = [
  { id: 1, title: 'Smart Contract Intern', company: 'Ethereum Foundation', logo: 'EF', location: 'Remote', duration: '3 months', stipend: '$3,000/mo', tags: ['Solidity', 'EVM', 'Testing'], isRemote: true, isFeatured: true, cardType: 'purple', postedAt: '2 days ago' },
  { id: 2, title: 'Web3 Frontend Intern', company: 'Uniswap Labs', logo: 'UL', location: 'New York, USA', duration: '6 months', stipend: '$4,500/mo', tags: ['React', 'TypeScript', 'wagmi'], isRemote: false, isFeatured: true, cardType: 'teal', postedAt: '1 day ago' },
  { id: 3, title: 'DeFi Research Intern', company: 'Aave', logo: 'AA', location: 'Remote', duration: '3 months', stipend: '$2,500/mo', tags: ['DeFi', 'Research', 'Python'], isRemote: true, isFeatured: false, cardType: 'default', postedAt: '3 days ago' },
  { id: 4, title: 'Blockchain Security Intern', company: 'Chainlink', logo: 'CL', location: 'Remote', duration: '4 months', stipend: '$3,800/mo', tags: ['Security', 'Auditing', 'Solidity'], isRemote: true, isFeatured: true, cardType: 'yellow', postedAt: '5 days ago' },
  { id: 5, title: 'Protocol Engineering Intern', company: 'Polygon', logo: 'PG', location: 'Bangalore, India', duration: '6 months', stipend: '$2,000/mo', tags: ['Rust', 'Go', 'ZK'], isRemote: false, isFeatured: false, cardType: 'default', postedAt: '1 week ago' },
  { id: 6, title: 'Web3 Product Intern', company: 'OpenSea', logo: 'OS', location: 'San Francisco', duration: '3 months', stipend: '$5,000/mo', tags: ['Product', 'NFT', 'UX'], isRemote: false, isFeatured: false, cardType: 'purple', postedAt: '4 days ago' },
];

const tagColors = [
  'bg-accent-pink/15 text-accent-pink',
  'bg-cyan-500/15 text-cyan-400',
  'bg-purple-500/15 text-purple-400',
  'bg-yellow-500/15 text-yellow-400',
];

export function InternshipsPage() {
  const [search, setSearch] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);

  const filtered = internships.filter(j => {
    const matchSearch = !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase());
    const matchRemote = !remoteOnly || j.isRemote;
    return matchSearch && matchRemote;
  });

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            <GraduationCap className="w-4 h-4" /> Launch Your Web3 Career
          </span>
          <h1 className="text-4xl font-orbitron font-bold text-white mt-2">
            Web3 <span className="text-accent-pink">Internships</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Paid internships at top blockchain companies. Build real experience in DeFi, NFTs, and Web3 protocols.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search internships or companies..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-pink/50 transition-all" />
          </div>
          <button onClick={() => setRemoteOnly(!remoteOnly)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all ${
              remoteOnly
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}>
            <Globe className="w-4 h-4" /> Remote Only
          </button>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { label: 'Open Internships', value: '340+' },
            { label: 'Avg Monthly Stipend', value: '$3,200' },
            { label: 'Remote Positions', value: '68%' },
            { label: 'New This Week', value: '24' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-sm font-bold text-white">{s.value}</span>
              <span className="text-xs text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(job => {
            const colorMap: Record<string, string> = {
              purple: 'from-purple-900/40 to-purple-800/20 border-purple-500/20',
              teal: 'from-teal-900/40 to-teal-800/20 border-teal-500/20',
              yellow: 'from-yellow-900/40 to-yellow-800/20 border-yellow-500/20',
              default: 'from-gray-900/60 to-gray-800/30 border-white/5',
            };
            return (
              <div key={job.id} className={`relative rounded-2xl p-5 bg-gradient-to-br border hover:scale-[1.02] transition-all duration-300 cursor-pointer group ${colorMap[job.cardType]}`}>
                {job.isFeatured && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent-pink/20 border border-accent-pink/30 text-accent-pink text-xs">
                    <Flame className="w-3 h-3" /> Featured
                  </span>
                )}
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-sm font-bold text-white">
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm group-hover:text-accent-pink transition-colors">{job.title}</h3>
                    <p className="text-xs text-gray-400">{job.company}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.duration}</span>
                  <span className="flex items-center gap-1 text-green-400"><DollarSign className="w-3 h-3" />{job.stipend}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {job.tags.map((tag, i) => (
                    <span key={i} className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagColors[i % tagColors.length]}`}>{tag}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <span className="text-xs text-gray-600">{job.postedAt}</span>
                  <button className="px-3 py-1 rounded-lg bg-accent-pink/10 border border-accent-pink/20 text-accent-pink text-xs font-medium hover:bg-accent-pink hover:text-white transition-all">Apply Now</button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <GraduationCap className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No internships match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
