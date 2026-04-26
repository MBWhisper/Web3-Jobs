const BASIC_URL    = 'https://web3work.lemonsqueezy.com/checkout/buy/88d71395-1252-4db7-baf3-0d67374ce799';
const FEATURED_URL = 'https://web3work.lemonsqueezy.com/checkout/buy/3363ea30-9d08-4201-b8f6-5bab78b286b5';
const BUNDLE_URL   = 'https://web3work.lemonsqueezy.com/checkout/buy/dda8f3b3-b221-4424-879d-ee51608ce8ca';

const plans = [
  {
    key: 'basic',
    name: 'Basic Listing',
    price: '$49',
    duration: '30 days',
    features: ['1 job post', 'Standard visibility', 'Apply button', '30-day listing'],
    popular: false,
    url: BASIC_URL,
  },
  {
    key: 'featured',
    name: '⭐ Featured Listing',
    price: '$99',
    duration: '30 days',
    features: ['1 featured job post', 'Top of listings', 'Highlighted badge', '2x more views'],
    popular: true,
    url: FEATURED_URL,
  },
  {
    key: 'bundle',
    name: 'Bundle 3 Jobs',
    price: '$199',
    duration: '90 days',
    features: ['3 job posts', 'Mix basic + featured', 'Priority support', '90-day listing'],
    popular: false,
    url: BUNDLE_URL,
  },
];

export function PostJobButton() {
  return (
    <section className="post-job-section">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Orbitron, sans-serif', color: '#00ff88', fontSize: '2rem' }}>
          Post a Job on Web3 Jobs
        </h2>
        <p style={{ color: '#aaa' }}>Reach thousands of Web3 developers and blockchain experts</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        {plans.map((plan) => (
          <div key={plan.key} style={{ background: plan.popular ? '#0a1a12' : '#111', border: `1px solid ${plan.popular ? '#00ff88' : '#222'}`, borderRadius: '16px', padding: '32px 24px', position: 'relative' }}>
            {plan.popular && (
              <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#00ff88', color: '#000', fontSize: '0.75rem', fontWeight: 700, padding: '4px 16px', borderRadius: '999px' }}>
                Most Popular
              </span>
            )}
            <h3 style={{ color: '#fff', marginBottom: '12px' }}>{plan.name}</h3>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 700, color: '#00ff88' }}>{plan.price}</span>
              <span style={{ fontSize: '0.85rem', color: '#777', marginLeft: '4px' }}>/ {plan.duration}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
              {plan.features.map((f) => (
                <li key={f} style={{ color: '#bbb', fontSize: '0.9rem', padding: '4px 0' }}>✓ {f}</li>
              ))}
            </ul>
            <button
              onClick={() => window.open(plan.url, '_blank', 'noopener,noreferrer')}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', border: 'none', background: plan.popular ? '#00ff88' : '#1a1a1a', color: plan.popular ? '#000' : '#fff' }}
            >
              Post Now — {plan.price}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PostJobButton;
