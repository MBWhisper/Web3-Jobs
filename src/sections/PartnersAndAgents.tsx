import { useState } from 'react';
import { Building2, FileText, Bot, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type TaskItem = {
  id: string;
  title: string;
  owner: string;
  status: 'Queued' | 'Running' | 'Done';
};

const starterTasks: TaskItem[] = [
  { id: 't1', title: 'Collect new partner leads', owner: 'Lead Agent', status: 'Queued' },
  { id: 't2', title: 'Draft weekly partner content', owner: 'Content Agent', status: 'Running' },
  { id: 't3', title: 'Send affiliate performance summary', owner: 'Ops Agent', status: 'Done' },
];

export function PartnersAndAgents() {
  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [contact, setContact] = useState('');
  const [tasks] = useState<TaskItem[]>(starterTasks);

  const submitPartner = (e: React.FormEvent) => {
    e.preventDefault();

    if (!company || !website || !contact) {
      alert('Please complete all partner fields.');
      return;
    }

    alert('Partner request captured ✅ Next step: connect this form to your CRM / email automation.');
    setCompany('');
    setWebsite('');
    setContact('');
  };

  return (
    <section id="partners-agents" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-indigo-500/30 bg-bg-secondary/50 p-6">
          <div className="flex items-center gap-2 mb-3 text-indigo-300">
            <Building2 className="w-5 h-5" />
            <h3 className="text-lg font-semibold text-white">Company Partnerships</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Build a partner base to supply paid listings, sponsored content, and long-term hiring contracts.
          </p>

          <form onSubmit={submitPartner} className="space-y-3 mb-5">
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
              className="bg-black/40 border-gray-700 text-white"
            />
            <Input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Company website"
              className="bg-black/40 border-gray-700 text-white"
            />
            <Input
              type="email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Partnership contact email"
              className="bg-black/40 border-gray-700 text-white"
            />
            <Button type="submit" className="w-full bg-accent-pink hover:bg-accent-pink-dark">
              Send Partnership Request
            </Button>
          </form>

          <div className="rounded-lg border border-gray-700 bg-black/30 p-4">
            <div className="flex items-center gap-2 text-white mb-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <h4 className="font-medium">Content Packages (MVP)</h4>
            </div>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Sponsored Company Spotlight: $149/post</li>
              <li>• Premium Newsletter Mention: $99/send</li>
              <li>• Hiring Campaign Bundle: $499/month</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-500/30 bg-bg-secondary/50 p-6">
          <div className="flex items-center gap-2 mb-3 text-emerald-300">
            <Bot className="w-5 h-5" />
            <h3 className="text-lg font-semibold text-white">Task Agents</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Use specialized agents to run repetitive work for you: lead sourcing, outreach, and reporting.
          </p>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-lg border border-gray-700 bg-black/30 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-white text-sm font-medium">{task.title}</p>
                    <p className="text-gray-400 text-xs">Owner: {task.owner}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full border border-gray-600 text-gray-200">
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-lg border border-gray-700 bg-black/30 p-4 text-sm text-gray-300">
            <div className="flex items-center gap-2 mb-2 text-white">
              <CheckCircle2 className="w-4 h-4 text-accent-pink" />
              <span className="font-medium">Automation Next Step</span>
            </div>
            Connect these agents to real tools (email API, CRM, Sheets/Notion, webhook scheduler) for full autopilot.
          </div>
        </div>
      </div>
    </section>
  );
}
