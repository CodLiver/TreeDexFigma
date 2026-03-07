import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
  links: Link[];
  keyValuePairs?: KeyValuePair[];
}

export function LinkSection({ title, links, keyValuePairs }: LinkSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#d4c5a0]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center hover:bg-[#faf8f3] transition-colors"
      >
        <span className="text-[#5a4a3a]">{title}</span>
        <ChevronDown
          className={`text-[#8b7355] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          size={20}
        />
      </button>
      
      {isOpen && (
        <div className="px-6 pb-4 border-t border-[#d4c5a0] bg-[#faf8f3]">
          <div className="pt-4 space-y-2">
            {keyValuePairs ? (
              // Render as key-value table
              keyValuePairs.map((item, index) => (
                <div key={index} className="py-2 px-4 bg-white rounded hover:bg-[#f5f1e8] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-[#5a4a3a]">{item.key}</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8b7355] hover:text-[#5a4a3a] transition-colors"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))
            ) : (
              // Render as simple links
              links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 px-4 bg-white rounded hover:bg-[#f5f1e8] transition-colors text-[#5a4a3a] hover:text-[#8b7355]"
                >
                  {link.name}
                </a>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}