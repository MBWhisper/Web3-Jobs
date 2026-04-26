import { Check } from 'lucide-react';

// Placeholder checkout URLs - will be replaced with actual LemonSqueezy links
const LEMON_BASIC_URL = 'LEMON_BASIC_URL';
const LEMON_FEATURED_URL = 'LEMON_FEATURED_URL';
const LEMON_BUNDLE_URL = 'LEMON_BUNDLE_URL';

export function PostJobButton() {
  const handleCheckout = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const plans = [
    {
      name: 'Basic Listing',
      price: 49,
      duration: '30 days',
      url: LEMON_BASIC_URL,
      features: [
        'Single job posting',
        '30-day visibility',
        'Basic analytics',
        'Email support',
      ],
      highlighted: false,
    },
    {
      name: 'Featured Listing',
      price: 99,
      duration: '30 days',
      url: LEMON_FEATURED_URL,
      features: [
        'Featured badge on platform',
        '30-day visibility',
        'Advanced analytics',
        'Priority support',
        'Email notifications to candidates',
      ],
      highlighted: true,
    },
    {
      name: 'Bundle 3 Jobs',
      price: 199,
      duration: '90 days',
      url: LEMON_BUNDLE_URL,
      features: [
        'Post 3 jobs',
        '90-day visibility',
        'Advanced analytics',
        'Priority support',
        'Featured option on 1 job',
        'Dedicated account manager',
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="w-full bg-[#111111] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black font-orbitron text-white mb-4">
            Post a Job
          </h2>
          <p className="text-gray-400 text-lg">
            Choose a plan to post your Web3 job opening and reach top talent
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                plan.highlighted
                  ? 'md:scale-105 border-2 border-[#00ff88] shadow-lg shadow-[#00ff88]/30 bg-gradient-to-br from-[#111111] to-[#1a1a1a]'
                  : 'border border-[#00ff88]/30 bg-[#1a1a1a] hover:border-[#00ff88]/60'
              }`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black px-4 py-1 text-xs font-bold font-orbitron">
                  POPULAR
                </div>
              )}

              <div className="p-8">
                {/* Plan Name */}
                <h3 className="text-2xl font-bold font-orbitron text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">{plan.duration}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-5xl font-black font-orbitron text-[#00ff88]">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">
                    / {plan.duration === '30 days' ? 'month' : 'quarter'}
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleCheckout(plan.url)}
                  className={`w-full py-3 px-4 rounded-lg font-bold font-orbitron mb-8 transition-all duration-300 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-[#00ff88] to-[#00cc6a] text-black hover:shadow-lg hover:shadow-[#00ff88]/50'
                      : 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88] hover:bg-[#00ff88]/30'
                  }`}
                >
                  Get Started
                </button>

                {/* Features List */}
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#00ff88] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            All plans include access to our applicant tracking system and candidate management tools.
          </p>
        </div>
      </div>
    </div>
  );
}
