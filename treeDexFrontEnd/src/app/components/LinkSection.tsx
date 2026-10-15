import { useState } from 'react';
import { ChevronDown, ExternalLink, Link2 } from 'lucide-react';

interface Link {
  name: string;
  url: string;
}

interface KeyValuePair {
  key: string;
  value: string;
  url: string;
}

interface LinkSectionProps {
  title: string;
  links?: Link[];
  keyValuePairs?: KeyValuePair[];
  defaultOpen?: boolean;
}

export function LinkSection({ title, links = [], keyValuePairs, defaultOpen = false }: LinkSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const itemCount = keyValuePairs ? keyValuePairs.length : links.length;

  return (
    <div className="bg-white/80 backdrop-blur-xs rounded-xl border border-[#d4c5a0]/60 shadow-2xs overflow-hidden transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex justify-between items-center bg-white hover:bg-[#fdfbf7] transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-2.5">
          <Link2 size={16} className="text-[#8b7355]" />
          <span className="font-serif font-bold text-[#2c221e] text-base">{title}</span>
          <span className="text-[11px] font-semibold bg-[#f2ebd9] text-[#735c40] px-2 py-0.5 rounded-full border border-[#d4c5a0]/40">
            {itemCount}
          </span>
        </div>
        <div className="p-1 rounded-md bg-[#fdfbf7] border border-[#d4c5a0]/40">
          <ChevronDown
            className={`text-[#8b7355] transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
            size={18}
          />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-4 pt-2 border-t border-[#f0ede4] bg-[#fdfbf7]/50 space-y-2">
          {keyValuePairs
            ? keyValuePairs.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 p-3 bg-white rounded-lg border border-[#d4c5a0]/40 hover:border-[#8b7355] hover:shadow-xs transition-all"
                >
                  <span className="text-xs font-semibold text-[#8b7355] group-hover:text-[#2c221e] transition-colors">
                    {item.key}
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[#2c221e] group-hover:text-[#8b7355] transition-colors">
                    <span>{item.value}</span>
                    <ExternalLink size={13} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))
            : links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 bg-white rounded-lg border border-[#d4c5a0]/40 hover:border-[#8b7355] hover:shadow-xs transition-all text-sm font-bold text-[#2c221e] hover:text-[#8b7355]"
                >
                  <span>{link.name}</span>
                  <ExternalLink size={14} className="text-[#8b7355] opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
        </div>
      )}
    </div>
  );
}