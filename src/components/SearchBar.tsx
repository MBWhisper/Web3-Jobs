import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  remoteOnly: boolean;
  onRemoteChange: (value: boolean) => void;
}

export function SearchBar({ value, onChange, remoteOnly, onRemoteChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up`}>
      {/* Search Input */}
      <div className={`relative flex-1 w-full transition-all duration-300 ${
        isFocused ? 'ring-2 ring-accent-pink rounded-lg' : ''
      }`}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <Input
          type="text"
          placeholder="Tag, Location, Company"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-4 py-3 bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-accent-pink focus:ring-0 rounded-lg"
        />
      </div>

      {/* Remote Toggle */}
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm">Remote</span>
        <Switch
          checked={remoteOnly}
          onCheckedChange={onRemoteChange}
          className="data-[state=checked]:bg-accent-pink"
        />
      </div>
    </div>
  );
}
