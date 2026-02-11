import { Heart } from 'lucide-react';
import type { Job } from '@/types';
import { Badge } from '@/components/ui/badge';

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  onClick: () => void;
}

export function JobCard({ job, isSelected, onClick }: JobCardProps) {
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

  return (
    <div
      onClick={onClick}
      className={`relative p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${
        getCardStyles()
      } ${
        isSelected 
          ? 'ring-2 ring-accent-pink shadow-glow-pink' 
          : 'hover:shadow-lg hover:-translate-y-1'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Company Logo */}
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0 ${
          job.cardType === 'yellow' 
            ? 'bg-black/20 text-black' 
            : 'bg-black/30 text-white'
        }`}>
          {job.companyLogo}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className={`font-semibold text-sm truncate ${getTextColor()}`}>
                {job.title}
              </h3>
              <p className={`text-xs mt-0.5 ${getMutedTextColor()}`}>
                {job.company}
              </p>
            </div>
            <span className={`text-xs flex-shrink-0 ${getMutedTextColor()}`}>
              {job.postedAt}
            </span>
          </div>

          <p className={`text-xs mt-1 truncate ${getMutedTextColor()}`}>
            {job.location}
          </p>

          {job.salary && (
            <p className={`text-xs mt-1 font-medium ${getTextColor()}`}>
              {job.salary}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {job.tags.slice(0, 5).map((tag, index) => (
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
          </div>
        </div>
      </div>

      {/* Featured indicator */}
      {job.isFeatured && (
        <div className="absolute top-2 right-2">
          <Heart className="w-4 h-4 fill-current" />
        </div>
      )}
    </div>
  );
}
