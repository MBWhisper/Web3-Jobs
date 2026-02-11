import { skillTags } from '@/lib/data';

interface TagCloudProps {
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export function TagCloud({ selectedTags, onTagSelect }: TagCloudProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {skillTags.map((tag, index) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-3 py-1.5 text-xs rounded-md border transition-all duration-200 hover:scale-105 active:scale-95 animate-fade-in ${
              isSelected
                ? 'bg-accent-pink/20 border-accent-pink text-accent-pink'
                : 'bg-transparent border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
            }`}
            style={{ animationDelay: `${index * 0.01}s` }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
