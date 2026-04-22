import { useState } from 'react';
import { BookOpen, Play, Clock, Star, Users, ChevronRight, Zap, Code2, Shield, Cpu } from 'lucide-react';

const courses = [
  { id: 1, title: 'Solidity Masterclass', provider: 'CryptoZombies', level: 'Beginner', duration: '12 hours', rating: 4.9, students: 48200, tags: ['Solidity', 'EVM', 'Smart Contracts'], color: 'from-accent-pink/20 to-pink-900/10 border-accent-pink/20', icon: Code2, free: true },
  { id: 2, title: 'DeFi Deep Dive', provider: 'Bankless Academy', level: 'Intermediate', duration: '8 hours', rating: 4.8, students: 22100, tags: ['DeFi', 'Protocols', 'Yield'], color: 'from-purple-600/20 to-purple-900/10 border-purple-500/20', icon: Zap, free: true },
  { id: 3, title: 'ZK Proofs Fundamentals', provider: 'ZKHack', level: 'Advanced', duration: '20 hours', rating: 4.7, students: 8900, tags: ['ZK', 'Cryptography', 'Math'], color: 'from-cyan-600/20 to-cyan-900/10 border-cyan-500/20', icon: Cpu, free: false },
  { id: 4, title: 'Smart Contract Security', provider: 'Trail of Bits', level: 'Advanced', duration: '16 hours', rating: 4.9, students: 15300, tags: ['Security', 'Auditing', 'Hacks'], color: 'from-red-600/20 to-red-900/10 border-red-500/20', icon: Shield, free: false },
  { id: 5, title: 'Web3 Frontend with React', provider: 'Buildspace', level: 'Intermediate', duration: '10 hours', rating: 4.6, students: 31000, tags: ['React', 'wagmi', 'ethers.js'], color: 'from-yellow-600/20 to-yellow-900/10 border-yellow-500/20', icon: Code2, free: true },
  { id: 6, title: 'NFT Development', provider: 'Moralis', level: 'Beginner', duration: '6 hours', rating: 4.5, students: 19800, tags: ['NFT', 'ERC-721', 'IPFS'], color: 'from-green-600/20 to-green-900/10 border-green-500/20', icon: BookOpen, free: true },
];

const articles = [
  { title: 'How ZK Rollups are Changing Ethereum Scaling', source: 'The Defiant', time: '5 min read', tag: 'ZK' },
  { title: 'Top 10 Smart Contract Vulnerabilities in 2025', source: 'Web3 Security', time: '8 min read', tag: 'Security' },
  { title: 'DeFi Yield Strategies: A Comprehensive Guide', source: 'Bankless', time: '12 min read', tag: 'DeFi' },
  { title: 'Building Your First DAO with Solidity', source: 'Mirror.xyz', time: '10 min read', tag: 'DAO' },
];

export function LearnPage() {
  const [levelFilter, setLevelFilter] = useState('All');
  const [freeOnly, setFreeOnly] = useState(false);

  const filtered = courses.filter(c => {
    const matchLevel = levelFilter === 'All' || c.level === levelFilter;
    const matchFree = !freeOnly || c.free;
    return matchLevel && matchFree;
  });

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" /> Learn Web3 Development
          </span>
          <h1 className="text-4xl font-orbitron font-bold text-white mt-2">
            Learn <span className="text-accent-pink">Web3</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Curated courses, tutorials, and articles to take you from zero to Web3 professional.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(l => (
            <button key={l} onClick={() => setLevelFilter(l)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                levelFilter === l
                  ? 'bg-accent-pink text-white border-accent-pink'
                  : 'text-gray-400 border-white/10 hover:text-white'
              }`}>{l}</button>
          ))}
          <button onClick={() => setFreeOnly(!freeOnly)}
            className={`ml-auto flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              freeOnly ? 'bg-green-500/20 border-green-500/40 text-green-400' : 'text-gray-400 border-white/10 hover:text-white'
            }`}>
            <Zap className="w-3.5 h-3.5" /> Free Only
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {filtered.map(course => (
            <div key={course.id} className={`rounded-2xl p-5 bg-gradient-to-br border hover:scale-[1.02] transition-all duration-300 cursor-pointer group ${course.color}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-white/10`}>
                  <course.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center gap-2">
                  {course.free
                    ? <span className="px-2 py-0.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium">Free</span>
                    : <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-medium">Paid</span>
                  }
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    course.level === 'Beginner' ? 'bg-green-500/15 text-green-400' :
                    course.level === 'Intermediate' ? 'bg-yellow-500/15 text-yellow-400' :
                    'bg-red-500/15 text-red-400'
                  }`}>{course.level}</span>
                </div>
              </div>
              <h3 className="font-semibold text-white group-hover:text-accent-pink transition-colors">{course.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{course.provider}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400" />{course.rating}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{course.students.toLocaleString()}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {course.tags.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">{t}</span>
                ))}
              </div>
              <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/5 hover:bg-accent-pink/20 border border-white/10 hover:border-accent-pink/30 text-sm text-gray-300 hover:text-accent-pink transition-all">
                <Play className="w-4 h-4" /> Start Learning
              </button>
            </div>
          ))}
        </div>

        {/* Articles */}
        <div>
          <h2 className="text-xl font-orbitron font-bold text-white mb-5">Latest Articles</h2>
          <div className="space-y-3">
            {articles.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 hover:border-white/10 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded-lg bg-accent-pink/10 text-accent-pink text-xs font-medium">{a.tag}</span>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-accent-pink transition-colors">{a.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{a.source} · {a.time}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-accent-pink transition-colors shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
