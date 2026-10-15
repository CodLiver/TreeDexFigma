import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search resources, teachers, apps...' }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8b7355]" size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 bg-white/90 backdrop-blur-xs border border-[#d4c5a0] rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-[#8b7355]/30 focus:border-[#8b7355] text-[#2c221e] text-sm placeholder-[#8b7355]/60 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#8b7355] hover:bg-[#f2ebd9] transition-colors"
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}