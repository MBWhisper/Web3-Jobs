import { useState } from 'react';
import { CreditCard, Rocket, Users, BadgeDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Monetization() {
  const [postJobOpen, setPostJobOpen] = useState(false);
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const handlePaidJobPost = (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !email || !jobTitle) {
      alert('Please fill all required fields.');
      return;
    }

    alert('Great! Next step: connect Stripe Checkout (test mode) to collect payment before publishing.');
    setPostJobOpen(false);
    setCompany('');
    setEmail('');
    setJobTitle('');
  };

  return (
    <section id="monetization" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-orbitron font-bold text-white">
            Revenue Engine
          </h2>
          <p className="text-gray-400 mt-3">Monetize with paid listings, subscriptions, and affiliate partnerships.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-xl border border-pink-500/30 bg-bg-secondary/50 p-6">
            <div className="flex items-center gap-2 mb-3 text-accent-pink">
              <Rocket className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">Paid Job Posting</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Charge companies to post jobs directly on your platform.</p>
            <div className="text-white font-semibold mb-4">$99 / listing</div>
            <Button className="w-full bg-accent-pink hover:bg-accent-pink-dark" onClick={() => setPostJobOpen(true)}>
              Post a Paid Job
            </Button>
          </div>

          <div className="rounded-xl border border-cyan-500/30 bg-bg-secondary/50 p-6">
            <div className="flex items-center gap-2 mb-3 text-cyan-400">
              <Users className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">Company Subscription</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Recurring plans for frequent hiring companies.</p>
            <div className="space-y-2 mb-4 text-sm text-gray-300">
              <div>Starter: $49/month (3 listings)</div>
              <div>Growth: $149/month (15 listings)</div>
              <div>Scale: $299/month (Unlimited)</div>
            </div>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => alert('Next step: connect Stripe Billing portal for recurring subscriptions.')}
            >
              Enable Subscriptions
            </Button>
          </div>

          <div className="rounded-xl border border-lime-500/30 bg-bg-secondary/50 p-6">
            <div className="flex items-center gap-2 mb-3 text-lime-400">
              <BadgeDollarSign className="w-5 h-5" />
              <h3 className="text-lg font-semibold text-white">Affiliate Revenue</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">Promote relevant tools/courses and earn commissions.</p>
            <div className="space-y-2 mb-4 text-sm">
              <a className="block text-accent-pink hover:underline" href="https://www.ledger.com/academy" target="_blank" rel="noreferrer">Ledger Academy (Affiliate)</a>
              <a className="block text-accent-pink hover:underline" href="https://www.udemy.com/topic/blockchain/" target="_blank" rel="noreferrer">Blockchain Courses (Affiliate)</a>
              <a className="block text-accent-pink hover:underline" href="https://www.digitalocean.com/products/app-platform" target="_blank" rel="noreferrer">Cloud Hosting (Affiliate)</a>
            </div>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => alert('Tip: add your affiliate IDs to these links before marketing campaigns.')}
            >
              Manage Affiliate Links
            </Button>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-gray-700 bg-black/30 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h4 className="text-white font-semibold">Fastest path to first income</h4>
            <p className="text-gray-400 text-sm">Start with paid job posts, then activate subscriptions, then push affiliate links.</p>
          </div>
          <Button onClick={() => setPostJobOpen(true)} className="bg-accent-pink hover:bg-accent-pink-dark">
            Launch Revenue Flow
          </Button>
        </div>
      </div>

      {postJobOpen && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl border border-accent-pink/30 bg-bg-secondary p-6">
            <div className="flex items-center gap-2 mb-4 text-white">
              <CreditCard className="w-5 h-5 text-accent-pink" />
              <h3 className="text-lg font-semibold">Create Paid Job Listing</h3>
            </div>

            <form onSubmit={handlePaidJobPost} className="space-y-3">
              <Input placeholder="Company name" value={company} onChange={(e) => setCompany(e.target.value)} className="bg-black/40 border-gray-700 text-white" />
              <Input type="email" placeholder="Work email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black/40 border-gray-700 text-white" />
              <Input placeholder="Job title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="bg-black/40 border-gray-700 text-white" />

              <div className="text-sm text-gray-400">Charge preview: <span className="text-white font-medium">$99</span> one-time</div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1 bg-accent-pink hover:bg-accent-pink-dark">Continue to Payment</Button>
                <Button type="button" variant="outline" className="flex-1" onClick={() => setPostJobOpen(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
