import { useState } from 'react';
import { Handshake, Globe, Building2, Users, TrendingUp, CheckCircle2, Send } from 'lucide-react';

const partners = [
  { name: 'Ethereum Foundation', type: 'Protocol', logo: 'EF', desc: 'Core protocol research and developer grants', color: 'from-purple-900/40 to-purple-800/20 border-purple-500/20' },
  { name: 'Chainlink', type: 'Oracle', logo: 'CL', desc: 'Decentralized oracle network for smart contracts', color: 'from-blue-900/40 to-blue-800/20 border-blue-500/20' },
  { name: 'Polygon', type: 'Layer 2', logo: 'PG', desc: 'Ethereum scaling and infrastructure solutions', color: 'from-purple-900/40 to-purple-800/20 border-purple-500/20' },
  { name: 'Binance', type: 'Exchange', logo: 'BN', desc: 'Leading global crypto exchange and ecosystem', color: 'from-yellow-900/40 to-yellow-800/20 border-yellow-500/20' },
  { name: 'Alchemy', type: 'Infrastructure', logo: 'AL', desc: 'Web3 developer platform and APIs', color: 'from-cyan-900/40 to-cyan-800/20 border-cyan-500/20' },
  { name: 'OpenSea', type: 'NFT', logo: 'OS', desc: 'World largest NFT marketplace', color: 'from-teal-900/40 to-teal-800/20 border-teal-500/20' },
];

const perks = [
  { icon: Users, title: 'Talent Pipeline', desc: 'Direct access to 50,000+ vetted Web3 developers' },
  { icon: TrendingUp, title: 'Brand Exposure', desc: 'Feature your brand across our platform and newsletters' },
  { icon: Globe, title: 'Global Reach', desc: 'Reach candidates across 120+ countries' },
  { icon: Building2, title: 'Dedicated Support', desc: 'Personal account manager for enterprise partners' },
];

export function PartnershipsPage() {
  const [form, setForm] = useState({ company: '', email: '', type: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
            <Handshake className="w-4 h-4" /> Strategic Partnerships
          </span>
          <h1 className="text-4xl font-orbitron font-bold text-white mt-2">
            Partner with <span className="text-accent-pink">Web3 Jobs</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Join the leading ecosystem of Web3 companies. Connect with top talent and grow your presence.
          </p>
        </div>

        {/* Perks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {perks.map((p, i) => (
            <div key={i} className="rounded-2xl p-5 bg-white/5 border border-white/5 text-center hover:border-white/10 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-accent-pink/10 border border-accent-pink/20 flex items-center justify-center mx-auto mb-3">
                <p.icon className="w-5 h-5 text-accent-pink" />
              </div>
              <h3 className="font-semibold text-white text-sm">{p.title}</h3>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Current Partners */}
        <div className="mb-14">
          <h2 className="text-xl font-orbitron font-bold text-white mb-6">Our Partners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((p, i) => (
              <div key={i} className={`rounded-2xl p-5 bg-gradient-to-br border hover:scale-[1.01] transition-all cursor-pointer group ${p.color}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-sm font-bold text-white">
                    {p.logo}
                  </div>
                  <div>
                    <p className="font-semibold text-white group-hover:text-accent-pink transition-colors">{p.name}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">{p.type}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-xl mx-auto">
          <div className="rounded-2xl p-8 bg-white/5 border border-white/5">
            <h2 className="text-xl font-orbitron font-bold text-white mb-2 text-center">Become a Partner</h2>
            <p className="text-sm text-gray-500 text-center mb-6">Fill out the form and our team will reach out within 24 hours.</p>

            {sent ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold">Request Sent!</h3>
                <p className="text-gray-500 text-sm mt-1">We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                  placeholder="Company Name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-pink/50 transition-all" />
                <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  placeholder="Business Email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-pink/50 transition-all" />
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 focus:outline-none focus:border-accent-pink/50 transition-all">
                  <option value="" className="bg-gray-900">Partnership Type</option>
                  <option value="hiring" className="bg-gray-900">Hiring Partner</option>
                  <option value="sponsor" className="bg-gray-900">Sponsor</option>
                  <option value="integration" className="bg-gray-900">Technical Integration</option>
                </select>
                <textarea rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  placeholder="Tell us about your goals..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-pink/50 transition-all resize-none" />
                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent-pink hover:bg-accent-pink/90 text-white font-semibold shadow-lg shadow-accent-pink/30 transition-all hover:scale-[1.02]">
                  <Send className="w-4 h-4" /> Send Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
