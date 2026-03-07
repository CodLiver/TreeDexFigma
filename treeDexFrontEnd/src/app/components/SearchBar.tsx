import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto mb-6">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b7355]" size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#d4c5a0] rounded-lg focus:outline-none focus:border-[#8b7355] text-[#5a4a3a]"
      />
    </div>
  );
}
