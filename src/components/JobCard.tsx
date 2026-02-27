import React from 'react';
import { Heart, Bookmark, ExternalLink, MapPin, Clock, DollarSign } from 'lucide-react';
import type { Job } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
}

export function JobCard({ job, isSelected, onClick }: JobCardProps) {
  const [isSaved, setIsSaved] = React.useState(false);

  const getCardStyles = () => {
    switch (job.cardType) {
      case 'yellow':
        return 'bg-accent-lime text-black border-accent-lime';
      case 'purple':
        return 'card-gradient-purple border-purple-500/30';
      case 'teal':
        return 'card-gradient-teal border-teal-500/30';
      default:
        return 'card-gradient border-pink-500/30';
    }
  };

  const getTextColor = () => {
    return job.cardType === 'yellow' ? 'text-black' : 'text-white';
  };

  const getMutedTextColor = () => {
    return job.cardType === 'yellow' ? 'text-black/70' : 'text-gray-400';
  };

  const getBadgeVariant = () => {
    return job.cardType === 'yellow' ? 'secondary' : 'outline';
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open apply link in new tab
    window.open('#apply', '_blank');
  };

  return (
    <article
      onClick={onClick}
      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${
        getCardStyles()
      } ${
        isSelected 
          ? 'ring-2 ring-accent-pink shadow-glow-pink' 
          : 'hover:shadow-lg hover:-translate-y-1 hover:shadow-accent-pink/10'
      }`}
      role="article"
      aria-label={`${job.title} at ${job.company}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex items-start gap-3">
        {/* Company Logo */}
        <div 
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0 ${
            job.cardType === 'yellow' 
              ? 'bg-black/20 text-black' 
              : 'bg-black/30 text-white'
          }`}
          aria-hidden="true"
        >
          {job.companyLogo}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className={`font-semibold text-sm truncate ${getTextColor()}`}>
                {job.title}
              </h3>
              <p className={`text-xs mt-0.5 ${getMutedTextColor()}`}>
                {job.company}
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={handleSave}
                className={`p-1.5 rounded-lg transition-colors ${
                  isSaved 
                    ? 'text-accent-pink bg-accent-pink/20' 
                    : `${getMutedTextColor()} hover:text-accent-pink hover:bg-white/10`
                }`}
                aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
                aria-pressed={isSaved}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
            <div className={`flex items-center gap-1 ${getMutedTextColor()}`}>
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate max-w-[150px]">{job.location}</span>
            </div>
            
            {job.salary && (
              <div className={`flex items-center gap-1 ${getMutedTextColor()}`}>
                <DollarSign className="w-3.5 h-3.5" />
                <span className="font-medium">{job.salary}</span>
              </div>
            )}
            
            <div className={`flex items-center gap-1 ${getMutedTextColor()}`}>
              <Clock className="w-3.5 h-3.5" />
              <span>{job.postedAt}</span>
            </div>
            
            {job.isRemote && (
              <Badge 
                variant="outline" 
                className={`text-[10px] px-1.5 py-0 ${
                  job.cardType === 'yellow' 
                    ? 'border-black/30 text-black' 
                    : 'border-accent-cyan/50 text-cyan-400'
                }`}
              >
                Remote
              </Badge>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {job.tags.slice(0, 4).map((tag, index) => (
              <Badge
                key={index}
                variant={getBadgeVariant()}
                className={`text-[10px] px-2 py-0.5 ${
                  job.cardType === 'yellow'
                    ? 'bg-black/20 text-black border-black/30'
                    : 'bg-transparent text-gray-300 border-gray-600'
                }`}
              >
                {tag}
              </Badge>
            ))}
            {job.tags.length > 4 && (
              <Badge
                variant={getBadgeVariant()}
                className={`text-[10px] px-2 py-0.5 ${
                  job.cardType === 'yellow'
                    ? 'bg-black/20 text-black border-black/30'
                    : 'bg-transparent text-gray-500 border-gray-700'
                }`}
              >
                +{job.tags.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Featured indicator & Quick Apply */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-current/10">
        {job.isFeatured && (
          <div className="flex items-center gap-1 text-xs">
            <Heart className="w-3.5 h-3.5 fill-current text-accent-pink" />
            <span className={job.cardType === 'yellow' ? 'text-black/70' : 'text-gray-400'}>Featured</span>
          </div>
        )}
        
        <Button
          size="sm"
          variant="ghost"
          className={`ml-auto text-xs h-7 ${
            job.cardType === 'yellow' 
              ? 'text-black hover:bg-black/20' 
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
          onClick={handleApply}
        >
          Quick Apply
          <ExternalLink className="w-3 h-3 ml-1" />
        </Button>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent-pink rounded-r-full" />
      )}
    </article>
  );
}
