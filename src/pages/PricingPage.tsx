import { PostJobButton } from '@/components/monetization';
import { PremiumSubscription } from '@/components/monetization';
import { AffiliateSection } from '@/components/monetization';

export function PricingPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-20 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-5xl sm:text-6xl font-black text-white font-orbitron">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan to post jobs, unlock premium features, or monetize through affiliates
          </p>
        </div>
      </section>

      {/* Pricing Components */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Job Posting Plans */}
        <section>
          <h2 className="text-4xl font-black text-white font-orbitron mb-12 text-center">
            Post a Job
          </h2>
          <PostJobButton />
        </section>

        {/* Premium Subscription */}
        <section>
          <h2 className="text-4xl font-black text-white font-orbitron mb-12 text-center">
            Premium Subscription
          </h2>
          <PremiumSubscription />
        </section>

        {/* Affiliate Section */}
        <section>
          <h2 className="text-4xl font-black text-white font-orbitron mb-12 text-center">
            Earn with Affiliates
          </h2>
          <AffiliateSection />
        </section>
      </div>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="text-4xl font-black text-white font-orbitron mb-12 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">How long does a job posting last?</h3>
            <p className="text-gray-400">Basic and Featured listings remain active for 30 days from the date of purchase. Bundle plans allow you to post 3 jobs over a 90-day period.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">Can I cancel my subscription?</h3>
            <p className="text-gray-400">Yes, you can cancel your Premium subscription anytime. You'll retain access until the end of your billing cycle. No questions asked.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">How do I earn from affiliates?</h3>
            <p className="text-gray-400">Click any affiliate card to sign up with your referral link. You'll earn a commission on every user who signs up through your unique code. Payouts are handled directly by the exchanges.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-400">We use LemonSqueezy for all payments, which accepts credit cards, PayPal, Apple Pay, and other payment methods. Your payment information is encrypted and secure.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-lg font-semibold text-white mb-2">Is there a refund policy?</h3>
            <p className="text-gray-400">Job posting purchases are non-refundable but can be used within their validity period. Premium subscriptions can be cancelled anytime with prorated refunds.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center space-y-6 py-16 border border-accent-pink/20 rounded-lg bg-gradient-to-br from-accent-pink/5 to-transparent">
        <h2 className="text-3xl font-black text-white font-orbitron">
          Ready to get started?
        </h2>
        <p className="text-gray-400 text-lg">
          Post your first job today or explore our premium features
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#post-job"
            className="px-8 py-3 bg-accent-pink text-white font-semibold rounded-lg hover:bg-accent-pink/90 transition-all duration-200"
          >
            Post a Job
          </a>
          <a
            href="#premium"
            className="px-8 py-3 border border-accent-pink text-accent-pink font-semibold rounded-lg hover:bg-accent-pink/10 transition-all duration-200"
          >
            Learn About Premium
          </a>
        </div>
      </section>
    </div>
  );
}
