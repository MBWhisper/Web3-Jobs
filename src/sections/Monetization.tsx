import { useState } from 'react';
import { CreditCard, Rocket, Users, BadgeDollarSign, Check, ArrowRight, Building2, Smartphone, Wallet, Globe, Star, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

type PaymentMethod = 'card' | 'bank' | 'mobile' | 'paypal';

const BINANCE_REF = import.meta.env.VITE_BINANCE_REF || 'GRO_28502_75HVN';
const BYBIT_REF   = import.meta.env.VITE_BYBIT_REF   || '75E8EZ';
const OKX_REF     = import.meta.env.VITE_OKX_REF     || '80651373';

export function Monetization() {
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePaidJobPost = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !email || !jobTitle) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company, email, jobTitle, paymentMethod }),
      });

      const payload = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !payload.url) {
        throw new Error(payload.error || 'Unable to start Stripe checkout session.');
      }

      window.location.href = payload.url;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error occurred.';
      alert(`Payment setup error: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    { icon: Zap, title: 'Fast Results', desc: 'Get your job in front of thousands of qualified candidates immediately' },
    { icon: Shield, title: 'Verified Jobs', desc: 'All listings are verified to ensure quality and legitimacy' },
    { icon: Globe, title: 'Global Reach', desc: 'Access talent from 150+ countries worldwide' },
    { icon: Star, title: 'Top Placement', desc: 'Featured listings get 5x more visibility' },
  ];

  const paymentMethods = [
    { 
      id: 'card' as PaymentMethod, 
      name: 'Credit/Debit Card', 
      icon: CreditCard, 
      desc: 'Visa, Mastercard, Maestro',
      popular: true 
    },
    { 
      id: 'bank' as PaymentMethod, 
      name: 'Bank Transfer', 
      icon: Building2, 
      desc: 'Attijariwafa, BMCE, Société Générale',
    },
    { 
      id: 'mobile' as PaymentMethod, 
      name: 'Mobile Money', 
      icon: Smartphone, 
      desc: 'Orange Money, WafaCash, Bankily',
    },
    { 
      id: 'paypal' as PaymentMethod, 
      name: 'PayPal', 
      icon: Wallet, 
      desc: 'Secure PayPal payments',
    },
  ];

  const cryptoAffiliates = [
    {
      name: 'Binance',
      logo: 'https://cdn.simpleicons.org/binance/F0B90B',
      color: '#F0B90B',
      commission: 'Up to 50% commission',
      url: `https://accounts.binance.com/register?ref=${BINANCE_REF}`,
      description: "World's #1 crypto exchange",
    },
    {
      name: 'Bybit',
      logo: 'https://cdn.simpleicons.org/bybit/FFCF43',
      color: '#FFCF43',
      commission: 'Up to 30% commission',
      url: `https://www.bybit.com/invite?ref=${BYBIT_REF}`,
      description: 'Advanced trading platform',
    },
    {
      name: 'OKX',
      logo: 'https://cdn.simpleicons.org/okx/ffffff',
      color: '#00B1D2',
      commission: 'Up to 20% commission',
      url: `https://www.okx.com/join/${OKX_REF}`,
      description: 'Web3 leader in your pocket',
    },
  ];

  return (
    <section id="monetization" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-pink/5 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-pink/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-accent-pink/10 border-accent-pink/30 text-accent-pink px-4 py-1">
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            Start Earning Today
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-orbitron font-bold text-white mb-4">
            Revenue <span className="text-gradient-animated">Engine</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Turn your job board into a profitable business. Multiple revenue streams with easy payment options for Morocco and worldwide.
          </p>
        </div>

        {/* Revenue Streams */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Paid Job Posting */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-pink to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
            <div className="relative rounded-2xl border border-accent-pink/30 bg-bg-secondary/80 p-6 backdrop-blur">
              <div className="flex items-center gap-2 mb-3 text-accent-pink">
                <Rocket className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-white">Paid Job Posting</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Charge companies to post jobs directly on your platform.</p>
              <div className="text-3xl font-bold text-white mb-4">
                $99 <span className="text-lg text-gray-500 font-normal">/ listing</span>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-accent-pink" /> 30-day visibility
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-accent-pink" /> Featured badge
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-accent-pink" /> Company logo display
                </li>
              </ul>
              <Button 
                className="w-full bg-accent-pink hover:bg-accent-pink-dark shadow-lg shadow-accent-pink/25" 
                onClick={() => setPostJobOpen(true)}
              >
                Post a Paid Job
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Company Subscription */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
            <div className="relative rounded-2xl border border-cyan-500/30 bg-bg-secondary/80 p-6 backdrop-blur">
              <div className="flex items-center gap-2 mb-3 text-cyan-400">
                <Users className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-white">Company Subscription</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Recurring plans for frequent hiring companies.</p>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Starter</div>
                    <div className="text-xs text-gray-500">3 listings/month</div>
                  </div>
                  <div className="text-xl font-bold text-cyan-400">$49<span className="text-sm text-gray-500">/mo</span></div>
                </div>
                <div className="flex justify-between items-center p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                  <div>
                    <div className="text-white font-medium">Growth</div>
                    <div className="text-xs text-gray-500">15 listings/month</div>
                  </div>
                  <div className="text-xl font-bold text-cyan-400">$149<span className="text-sm text-gray-500">/mo</span></div>
                </div>
                <div className="flex justify-between items-center p-3 bg-black/30 rounded-lg">
                  <div>
                    <div className="text-white font-medium">Scale</div>
                    <div className="text-xs text-gray-500">Unlimited</div>
                  </div>
                  <div className="text-xl font-bold text-cyan-400">$299<span className="text-sm text-gray-500">/mo</span></div>
                </div>
              </div>
              <Button 
                className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-white"
                variant="outline"
                onClick={() => alert('Subscription system coming soon!')}
              >
                Choose Plan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Affiliate Revenue */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity" />
            <div className="relative rounded-2xl border border-lime-500/30 bg-bg-secondary/80 p-6 backdrop-blur">
              <div className="flex items-center gap-2 mb-3 text-lime-400">
                <BadgeDollarSign className="w-5 h-5" />
                <h3 className="text-lg font-semibold text-white">Affiliate Revenue</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Earn commissions from top crypto exchanges.</p>
              <div className="space-y-2 mb-6">
                {cryptoAffiliates.map((affiliate) => (
                  <a
                    key={affiliate.name}
                    className="flex items-center gap-3 p-3 bg-black/30 rounded-lg hover:bg-white/5 transition-colors"
                    href={affiliate.url}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                  >
                    <img
                      src={affiliate.logo}
                      alt={affiliate.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                      loading="lazy"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{affiliate.name}</div>
                      <div className="text-xs text-gray-500">{affiliate.commission}</div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-lime-400" />
                  </a>
                ))}
              </div>
              <Button 
                className="w-full border-lime-500/50 text-lime-400 hover:bg-lime-500 hover:text-white"
                variant="outline"
                onClick={() => alert('Affiliate links are live! Share them to start earning.')}
              >
                View All Partners
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Crypto Exchange Partners */}
        <div className="mb-12">
          <h3 className="text-center text-xl font-semibold text-white mb-6">Crypto Exchange Partners</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cryptoAffiliates.map((affiliate) => (
              <a
                key={affiliate.name}
                href={affiliate.url}
                target="_blank"
                rel="sponsored noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#00ff88]/40 hover:bg-white/10 transition-all duration-300"
              >
                <img
                  src={affiliate.logo}
                  alt={affiliate.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                  loading="lazy"
                />
                <div className="flex-1">
                  <div className="font-bold text-white">{affiliate.name}</div>
                  <div className="text-xs text-gray-400">{affiliate.description}</div>
                  <span
                    className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${affiliate.color}20`, color: affiliate.color }}
                  >
                    {affiliate.commission}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#00ff88] transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent-pink/30 transition-colors"
            >
              <feature.icon className="w-8 h-8 text-accent-pink mb-3" />
              <h4 className="text-white font-medium mb-1">{feature.title}</h4>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border border-gradient bg-gradient-to-r from-accent-pink/20 to-cyan-500/20 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Fastest Path to Revenue</h3>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Start with paid job posts, then scale with subscriptions. We support all Moroccan payment methods.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              <CreditCard className="w-3 h-3 mr-1" /> Visa/Mastercard
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              <Building2 className="w-3 h-3 mr-1" /> Bank Transfer
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              <Smartphone className="w-3 h-3 mr-1" /> Mobile Money
            </Badge>
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              <Wallet className="w-3 h-3 mr-1" /> PayPal
            </Badge>
          </div>
          <Button 
            onClick={() => setPostJobOpen(true)} 
            className="bg-accent-pink hover:bg-accent-pink-dark text-white px-8 py-6 text-lg shadow-lg shadow-accent-pink/25"
          >
            Start Earning Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Payment Modal */}
      {postJobOpen && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg my-8 rounded-2xl border border-accent-pink/30 bg-bg-secondary p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-pink to-purple-600 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Create Paid Job Listing</h3>
                <p className="text-gray-400 text-sm">$99 one-time payment</p>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="text-sm text-gray-400 mb-3 block">Select Payment Method</label>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === method.id
                        ? 'border-accent-pink bg-accent-pink/10'
                        : 'border-gray-700 hover:border-gray-600 bg-black/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <method.icon className={`w-5 h-5 ${paymentMethod === method.id ? 'text-accent-pink' : 'text-gray-400'}`} />
                      {method.popular && (
                        <Badge variant="secondary" className="text-[10px] bg-accent-pink/20 text-accent-pink">Popular</Badge>
                      )}
                    </div>
                    <div className="text-sm font-medium text-white">{method.name}</div>
                    <div className="text-xs text-gray-500">{method.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bank Transfer Details */}
            {paymentMethod === 'bank' && (
              <div className="mb-6 p-4 rounded-xl bg-black/40 border border-gray-700">
                <h4 className="text-white font-medium mb-3">Bank Transfer Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bank Name:</span>
                    <span className="text-white">Attijariwafa Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Account Number:</span>
                    <span className="text-white font-mono">***123456789</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">RIB:</span>
                    <span className="text-white font-mono">***789456123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Reference:</span>
                    <span className="text-accent-pink font-mono">WEB3-JOB-{Date.now()}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Please transfer $99 and send the receipt to support@web3jobs.app
                </p>
              </div>
            )}

            {/* Mobile Money Details */}
            {paymentMethod === 'mobile' && (
              <div className="mb-6 p-4 rounded-xl bg-black/40 border border-gray-700">
                <h4 className="text-white font-medium mb-3">Mobile Money Transfer</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-2 bg-black/30 rounded-lg">
                    <span className="text-gray-400">Orange Money:</span>
                    <span className="text-white font-mono">+212 6XX XXX XXX</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-black/30 rounded-lg">
                    <span className="text-gray-400">WafaCash:</span>
                    <span className="text-white font-mono">+212 6XX XXX XXX</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Send $99 via mobile money and contact us with the transaction ID.
                </p>
              </div>
            )}

            <form onSubmit={handlePaidJobPost} className="space-y-3">
              <Input 
                placeholder="Company name" 
                value={company} 
                onChange={(e) => setCompany(e.target.value)} 
                className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500" 
              />
              <Input 
                type="email" 
                placeholder="Work email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500" 
              />
              <Input 
                placeholder="Job title" 
                value={jobTitle} 
                onChange={(e) => setJobTitle(e.target.value)} 
                className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500" 
              />
              
              {(paymentMethod === 'mobile' || paymentMethod === 'bank') && (
                <Input 
                  type="tel" 
                  placeholder="Phone number (for verification)" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  className="bg-black/40 border-gray-700 text-white placeholder:text-gray-500" 
                />
              )}

              <div className="text-sm text-gray-400 pt-2">
                Charge preview: <span className="text-white font-medium">$99</span> one-time
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="flex-1 bg-accent-pink hover:bg-accent-pink-dark"
                >
                  {isSubmitting ? 'Processing...' : paymentMethod === 'card' || paymentMethod === 'paypal' ? 'Continue to Payment' : 'Submit Request'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1" 
                  onClick={() => setPostJobOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
