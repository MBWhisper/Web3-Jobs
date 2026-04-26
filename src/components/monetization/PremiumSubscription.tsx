import { Check } from 'lucide-react';

// Placeholder checkout URL - will be replaced with actual LemonSqueezy link
const LEMON_PREMIUM_URL = 'LEMON_PREMIUM_URL';

export function PremiumSubscription() {
  const handleCheckout = () => {
    window.open(LEMON_PREMIUM_URL, '_blank', 'noopener,noreferrer');
  };

  const freeFeatures = [
    'Browse all Web3 jobs',
    'Basic search & filters',
    'Apply to jobs',
    'Save favorite jobs',
    'Email notifications',
    'Create job alerts',
  ];

  const premiumFeatures = [
    'Instant job alerts',
    'Advanced salary filters',
    'Company insights & reviews',
    'AI-powered job matches',
    'Full salary transparency',
    'Direct messaging with recruiters',
    'Premium profile badge',
    'Early access to new jobs',
    'Salary negotiation guide',
    'Career resources library',
  ];

  return (
    <div className="w-full bg-gradient-to-br from-[#0a0a0a] to-[#111111] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black font-orbitron text-white mb-4">
            Unlock Premium Features
          </h2>
          <p className="text-gray-400 text-lg">
            Supercharge your Web3 job search with advanced tools and insights
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Free Plan */}
          <div className="rounded-2xl border border-[#00ff88]/20 bg-[#1a1a1a] p-8 md:p-10">
            <div className="mb-8">
              <h3 className="text-3xl font-bold font-orbitron text-white mb-2">
                Free
              </h3>
              <p className="text-gray-400 text-sm">Forever free, no credit card required</p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00ff88]/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#00ff88]" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            <button className="w-full py-3 px-4 rounded-lg font-bold font-orbitron text-gray-400 border border-gray-600 hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-300">
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="rounded-2xl border-2 border-[#00ff88] bg-gradient-to-br from-[#00ff88]/10 to-[#111111] p-8 md:p-10 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#00ff88]/20 rounded-full blur-3xl -z-10" />

            {/* Premium badge */}
            <div className="inline-block mb-6">
              <span className="inline-block bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black px-3 py-1 rounded-full text-xs font-bold font-orbitron">
                ⭐ PREMIUM
              </span>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black font-orbitron text-[#00ff88]">
                  $9
                </span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400 text-sm">
                Everything in Free, plus premium features
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00ff88] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-black" />
                  </div>
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleCheckout}
              className="w-full py-3 px-4 rounded-lg font-bold font-orbitron bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black hover:shadow-lg hover:shadow-[#00ff88]/50 transition-all duration-300 mb-4"
            >
              Upgrade to Premium
            </button>

            {/* Footer note */}
            <p className="text-gray-500 text-xs text-center">
              Cancel anytime. No questions asked.
            </p>
          </div>
        </div>

        {/* Additional note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            All prices in USD. Premium subscription auto-renews monthly unless cancelled.
          </p>
        </div>
      </div>
    </div>
  );
}
