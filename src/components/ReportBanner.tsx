import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ReportBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-pink-500/30 animate-fade-in-up">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-900/60 via-purple-900/60 to-pink-900/60" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-pink/10 via-transparent to-accent-pink/10" />

      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-accent-pink/20 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-accent-pink" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">
              Web3 Career Intelligence Report 2025
            </h3>
            <p className="text-gray-400 text-sm mt-0.5">
              Get the Inside Track to Your Next Career Move
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          className="border-accent-pink text-accent-pink hover:bg-accent-pink hover:text-white transition-all duration-200 flex-shrink-0"
        >
          View report
        </Button>
      </div>
    </div>
  );
}
