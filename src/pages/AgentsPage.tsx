import { useState } from 'react';
import { Bot, Zap, Search, BrainCircuit, Shield, TrendingUp, Play, CheckCircle2, Sparkles } from 'lucide-react';

const agents = [
  {
    id: 1, name: 'JobMatch AI', icon: Search,
    desc: 'Analyzes your skills and experience to find the perfect Web3 role. Matches you with jobs based on 40+ parameters.',
    tags: ['Matching', 'NLP', 'Ranking'],
    color: 'from-accent-pink/20 to-pink-900/10 border-accent-pink/20',
    accent: 'text-accent-pink',
    stats: { users: '12,400', accuracy: '94%', label: 'Match Accuracy' },
    active: true,
  },
  {
    id: 2, name: 'Resume Optimizer', icon: Zap,
    desc: 'Rewrites and optimizes your resume for Web3 ATS systems. Increases interview callbacks by up to 3x.',
    tags: ['NLP', 'ATS', 'Optimization'],
    color: 'from-purple-600/20 to-purple-900/10 border-purple-500/20',
    accent: 'text-purple-400',
    stats: { users: '8,200', accuracy: '3x', label: 'More Callbacks' },
    active: true,
  },
  {
    id: 3, name: 'Interview Coach', icon: BrainCircuit,
    desc: 'Simulates real Web3 technical interviews. Covers Solidity, DeFi, ZK proofs, and system design questions.',
    tags: ['Simulation', 'Feedback', 'Solidity'],
    color: 'from-cyan-600/20 to-cyan-900/10 border-cyan-500/20',
    accent: 'text-cyan-400',
    stats: { users: '5,600', accuracy: '89%', label: 'Pass Rate' },
    active: true,
  },
  {
    id: 4, name: 'Salary Negotiator', icon: TrendingUp,
    desc: 'Provides real-time market data and coaching to help you negotiate the best possible Web3 compensation.',
    tags: ['Market Data', 'Strategy', 'Coaching'],
    color: 'from-yellow-600/20 to-yellow-900/10 border-yellow-500/20',
    accent: 'text-yellow-400',
    stats: { users: '3,100', accuracy: '+34%', label: 'Salary Increase' },
    active: false,
  },
  {
    id: 5, name: 'Security Scanner', icon: Shield,
    desc: 'Scans your Solidity portfolio projects for common vulnerabilities before you showcase them to employers.',
    tags: ['Security', 'Auditing', 'Solidity'],
    color: 'from-red-600/20 to-red-900/10 border-red-500/20',
    accent: 'text-red-400',
    stats: { users: '2,900', accuracy: '97%', label: 'Detection Rate' },
    active: false,
  },
  {
    id: 6, name: 'Career Roadmap', icon: Sparkles,
    desc: 'Builds a personalized 6-month learning roadmap to reach your target Web3 role based on your current skills.',
    tags: ['Planning', 'Learning', 'Goals'],
    color: 'from-green-600/20 to-green-900/10 border-green-500/20',
    accent: 'text-green-400',
    stats: { users: '6,700', accuracy: '92%', label: 'Goal Achievement' },
    active: false,
  },
];

export function AgentsPage() {
  const [activeAgent, setActiveAgent] = useState<number | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'agent'; text: string }[]>([]);

  const selectedAgent = agents.find(a => a.id === activeAgent);

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'agent',
        text: `I'm analyzing your request about "${userMsg}". Based on current Web3 market data, I recommend focusing on Solidity and ZK development skills for the highest ROI in 2025.`
      }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            <Bot className="w-4 h-4" /> AI-Powered Career Agents
          </span>
          <h1 className="text-4xl font-orbitron font-bold text-white mt-2">
            Web3 <span className="text-accent-pink">AI Agents</span>
          </h1>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Specialized AI agents built for Web3 careers. From job matching to interview prep — all in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agents.map(agent => (
              <div key={agent.id}
                onClick={() => { setActiveAgent(agent.id); setMessages([]); }}
                className={`rounded-2xl p-5 bg-gradient-to-br border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  activeAgent === agent.id ? 'ring-2 ring-accent-pink/50 scale-[1.02]' : ''
                } ${agent.color}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-xl bg-white/10`}>
                    <agent.icon className={`w-5 h-5 ${agent.accent}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    {agent.active
                      ? <span className="flex items-center gap-1 text-xs text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Live</span>
                      : <span className="text-xs text-gray-600">Coming Soon</span>
                    }
                  </div>
                </div>
                <h3 className={`font-semibold text-white mb-1 ${activeAgent === agent.id ? 'text-accent-pink' : ''}`}>{agent.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{agent.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {agent.tags.map((t, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">{t}</span>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{agent.stats.users} users</span>
                  <span className={`text-sm font-bold ${agent.accent}`}>{agent.stats.accuracy} <span className="text-xs font-normal text-gray-500">{agent.stats.label}</span></span>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Panel */}
          <div className="rounded-2xl border border-white/5 bg-white/5 flex flex-col overflow-hidden" style={{ minHeight: 460 }}>
            {selectedAgent ? (
              <>
                <div className="flex items-center gap-3 p-4 border-b border-white/5">
                  <div className="p-2 rounded-xl bg-white/10">
                    <selectedAgent.icon className={`w-4 h-4 ${selectedAgent.accent}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{selectedAgent.name}</p>
                    <p className="text-xs text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />Ready</p>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center pt-8">
                      <Bot className="w-10 h-10 text-gray-700 mx-auto mb-3" />
                      <p className="text-xs text-gray-500">Ask me anything about your Web3 career</p>
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-accent-pink text-white rounded-br-sm'
                          : 'bg-white/10 text-gray-300 rounded-bl-sm'
                      }`}>{msg.text}</div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-white/5 flex gap-2">
                  <input
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Ask the agent..."
                    className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-pink/50 transition-all" />
                  <button onClick={sendMessage}
                    className="p-2 rounded-xl bg-accent-pink hover:bg-accent-pink/90 text-white transition-all">
                    <Play className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <Bot className="w-12 h-12 text-gray-700 mb-4" />
                <h3 className="text-white font-semibold text-sm">Select an Agent</h3>
                <p className="text-gray-500 text-xs mt-1 max-w-[200px]">Choose an AI agent from the left to start a conversation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
