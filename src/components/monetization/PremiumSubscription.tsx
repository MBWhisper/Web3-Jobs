const PREMIUM_URL = 'https://web3work.lemonsqueezy.com/checkout/buy/74268782-e64b-4206-a9ae-8a164b51b8b1';

const freeFeatures    = ['Browse all job listings', 'Basic search & filters', 'Apply to unlimited jobs'];
const premiumFeatures = ['⚡ Instant job alerts', '🔍 Advanced salary filters', '📊 Company insights', '🎯 AI job matches', '🔒 Full salary details', '📬 Direct recruiter messaging', '🚀 Priority application badge', '📅 Early access to listings'];

export function PremiumSubscription() {
  return (
    <section style={{ padding: '80px 20px', background: 'linear-gradient(180deg,#050505 0%,#0a1a0a 100%)' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', background: 'rgba(0,255,136,0.15)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.3)', borderRadius: '999px', padding: '6px 20px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px' }}>
          🌟 Go Premium
        </span>
        <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '2rem', color: '#fff', marginBottom: '12px' }}>
          Land Your Web3 Dream Job Faster
        </h2>
        <p style={{ color: '#888', marginBottom: '48px' }}>Join Web3 professionals using premium tools to get hired 3x faster</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Free */}
          <div style={{ background: '#0e0e0e', border: '1px solid #222', borderRadius: '18px', padding: '32px 24px', textAlign: 'left' }}>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '8px' }}>Free</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00ff88', marginBottom: '24px' }}>$0 <span style={{ fontSize: '1rem', color: '#666' }}>/forever</span></div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '28px' }}>
              {freeFeatures.map(f => <li key={f} style={{ color: '#ccc', fontSize: '0.88rem', padding: '4px 0' }}>✓ {f}</li>)}
              {premiumFeatures.map(f => <li key={f} style={{ color: '#444', fontSize: '0.88rem', padding: '4px 0', textDecoration: 'line-through' }}>✗ {f}</li>)}
            </ul>
            <button disabled style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#1a1a1a', color: '#555', border: '1px solid #333', cursor: 'not-allowed' }}>
              Current Plan
            </button>
          </div>
          {/* Premium */}
          <div style={{ background: '#0a1a12', border: '2px solid #00ff88', borderRadius: '18px', padding: '32px 24px', textAlign: 'left', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: '#00ff88', color: '#000', fontSize: '0.75rem', fontWeight: 700, padding: '4px 18px', borderRadius: '999px' }}>
              Best Value
            </span>
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '8px' }}>Premium</h3>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#00ff88', marginBottom: '24px' }}>$9 <span style={{ fontSize: '1rem', color: '#666' }}>/month</span></div>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '28px' }}>
              {[...freeFeatures, ...premiumFeatures].map(f => <li key={f} style={{ color: '#ccc', fontSize: '0.88rem', padding: '4px 0' }}>✓ {f}</li>)}
            </ul>
            <button
              onClick={() => window.open(PREMIUM_URL, '_blank', 'noopener,noreferrer')}
              style={{ width: '100%', padding: '14px', borderRadius: '8px', background: '#00ff88', color: '#000', fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: 'pointer' }}
            >
              Upgrade to Premium — $9/mo
            </button>
            <p style={{ fontSize: '0.75rem', color: '#555', textAlign: 'center', marginTop: '10px' }}>Cancel anytime · No hidden fees</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PremiumSubscription;
