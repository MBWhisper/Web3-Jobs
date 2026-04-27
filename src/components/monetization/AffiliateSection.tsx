import { ExternalLink } from 'lucide-react';

const BINANCE_REF = import.meta.env.VITE_BINANCE_REF || 'GRO_28502_75HVN';
const BYBIT_REF = import.meta.env.VITE_BYBIT_REF || '75E8EZ';
const OKX_REF = import.meta.env.VITE_OKX_REF || '80651373';

export function AffiliateSection() {
  const affiliateLinks = [
    {
      name: 'Binance',
      logo: 'https://cdn.simpleicons.org/binance/F0B90B',
      color: '#F0B90B',
      commission: 'Up to 50% commission',
      url: `https://accounts.binance.com/register?ref=${BINANCE_REF}`,
      description: "The world's leading crypto exchange",
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
    <div className="w-full bg-gradient-to-b from-[#111111] to-[#0a0a0a] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black font-orbitron text-white mb-4">
            Crypto Tools &amp; Resources
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Discover the best platforms to trade and manage your crypto assets
          </p>
        </div>

        {/* Affiliate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {affiliateLinks.map((affiliate, index) => (
            <a
              key={index}
              href={affiliate.url}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="group relative rounded-2xl border border-[#00ff88]/20 bg-[#1a1a1a] p-8 hover:border-[#00ff88]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#00ff88]/20"
            >
              <div className="relative z-10">
                {/* Logo */}
                <div className="mb-6 h-16 flex items-center">
                  <img
                    src={affiliate.logo}
                    alt={affiliate.name}
                    className="h-12 w-12 object-contain"
                    loading="lazy"
                    width={48}
                    height={48}
                  />
                </div>

                {/* Name */}
                <h3 className="text-2xl font-bold font-orbitron text-white mb-2">
                  {affiliate.name}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4">{affiliate.description}</p>

                {/* Commission Badge */}
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6"
                  style={{ backgroundColor: `${affiliate.color}20`, color: affiliate.color }}
                >
                  {affiliate.commission}
                </span>

                {/* CTA */}
                <div className="flex items-center gap-2 text-[#00ff88] font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                  <span>Start Trading</span>
                  <ExternalLink size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AffiliateSection;
