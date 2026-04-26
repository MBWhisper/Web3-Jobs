import React from 'react';
import { Heart, ExternalLink, MapPin, DollarSign, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import type { Job } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface JobDetailProps {
  job: Job;
  onJobChange?: (job: Job) => void;
  allJobs?: Job[];
}

export function JobDetail({ job, onJobChange, allJobs = [] }: JobDetailProps) {
  const [isSaved, setIsSaved] = React.useState(false);
  const [isApplying, setIsApplying] = React.useState(false);
  
  // Get previous and next jobs for navigation
  const currentIndex = allJobs.findIndex(j => j.id === job.id);
  const prevJob = currentIndex > 0 ? allJobs[currentIndex - 1] : null;
  const nextJob = currentIndex < allJobs.length - 1 ? allJobs[currentIndex + 1] : null;

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      window.open(`${job.id ? `https://web3jobs.example.com/apply/${job.id}` : '#apply'}`, '_blank');
      setIsApplying(false);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' && prevJob && onJobChange) {
      onJobChange(prevJob);
    } else if (e.key === 'ArrowDown' && nextJob && onJobChange) {
      onJobChange(nextJob);
    } else if (e.key === 'Escape') {
      // Parent component should handle escape
    }
  };
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-bg-secondary/50 to-purple-900/10 border border-accent-pink/20 rounded-lg overflow-hidden animate-fade-in" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Header */}
      <div className="p-6 border-b border-accent-pink/20 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-black/30 flex items-center justify-center text-xl font-bold text-white border border-accent-pink/30">
              {job.companyLogo}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{job.title}</h2>
              <p className="text-accent-pink mt-0.5">{job.company}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSave}
              aria-label={isSaved ? 'Remove from saved' : 'Save job'}
              className={`p-2 rounded-lg transition-all ${isSaved ? 'text-accent-pink bg-accent-pink/20' : 'text-gray-400 hover:text-accent-pink hover:bg-white/5'}`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={handleApply}
              aria-label="Open job link"
              className="p-2 text-gray-400 hover:text-accent-pink transition-colors hover:bg-white/5 rounded-lg"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-accent-pink" />
            <span className="font-medium">{job.salary || 'Negotiable'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-accent-pink" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-accent-pink" />
            <span>{job.postedAt}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-accent-pink/10 text-accent-pink border-accent-pink/30 hover:bg-accent-pink/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={handleApply}
            disabled={isApplying}
            className="flex-1 bg-accent-pink hover:bg-accent-pink/90 text-white font-medium transition-all"
            size="lg"
            aria-label="Apply for this job"
          >
            {isApplying ? 'Opening...' : 'Apply Now'}
          </Button>
          <Button 
            onClick={handleSave}
            variant={isSaved ? 'default' : 'outline'}
            size="lg"
            className={`${isSaved ? 'bg-accent-pink/20 hover:bg-accent-pink/30' : ''}`}
            aria-label={isSaved ? 'Unsave job' : 'Save job'}
          >
            {isSaved ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 p-6 scrollbar-custom">
        <div className="space-y-6 pr-4">
          {/* Description */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">About the Role</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </div>

          {/* Requirements / Skills */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <Badge
                  key={index}
                  className="bg-accent-pink/20 text-accent-pink border border-accent-pink/40 hover:bg-accent-pink/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* What we offer */}
          {job.offerings && job.offerings.length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">What We Offer</h3>
              <ul className="space-y-2">
                {job.offerings.map((offering, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-300 text-sm"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-pink mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{offering}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation */}
          {(prevJob || nextJob) && (
            <div className="flex gap-2 pt-4 border-t border-white/5">
              {prevJob && onJobChange && (
                <button
                  onClick={() => onJobChange(prevJob)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all text-sm"
                  aria-label={`Previous job: ${prevJob.title}`}
                >
                  <ChevronUp className="w-4 h-4" />
                  Previous
                </button>
              )}
              {nextJob && onJobChange && (
                <button
                  onClick={() => onJobChange(nextJob)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all text-sm"
                  aria-label={`Next job: ${nextJob.title}`}
                >
                  Next
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
