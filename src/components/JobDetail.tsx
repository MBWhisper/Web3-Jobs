import { Heart, ExternalLink, MapPin, DollarSign } from 'lucide-react';
import type { Job } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface JobDetailProps {
  job: Job;
}

export function JobDetail({ job }: JobDetailProps) {
  return (
    <div className="h-full flex flex-col bg-bg-secondary/50 border border-pink-500/20 rounded-lg overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="p-6 border-b border-pink-500/20">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-black/30 flex items-center justify-center text-xl font-bold text-white border border-pink-500/30">
              {job.companyLogo}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{job.title}</h2>
              <p className="text-accent-pink mt-0.5">{job.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-accent-pink transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-accent-pink transition-colors">
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-accent-pink" />
            <span>{job.salary || 'Not specified'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-accent-pink" />
            <span>{job.location}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {job.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-pink-500/10 text-pink-400 border-pink-500/30 hover:bg-pink-500/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Apply Button */}
        <Button 
          className="w-full mt-4 bg-accent-pink hover:bg-accent-pink-dark text-white font-medium"
          size="lg"
        >
          Apply
        </Button>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-6 scrollbar-custom">
        <div className="space-y-6">
          {/* Description */}
          <div>
            <p className="text-gray-300 leading-relaxed">{job.description}</p>
          </div>

          {/* What we offer */}
          {job.offerings && job.offerings.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-3">What we offer:</h3>
              <ul className="space-y-3">
                {job.offerings.map((offering, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300 animate-slide-in-left"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-pink mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{offering}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
