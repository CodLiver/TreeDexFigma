import { useState, useMemo } from 'react';
import { ExternalLink, Instagram, Search, User } from 'lucide-react';

interface LinkItem {
  label: string;
  url: string;
  desc?: string;
  social?: string;
  social_url?: string;
}

interface CategoryGroup {
  title: string;
  links: LinkItem[];
}

interface AlphabeticalDirectoryProps {
  title: string;
  subtitle: string;
  data: CategoryGroup[];
}

export function AlphabeticalDirectory({ title, subtitle, data }: AlphabeticalDirectoryProps) {
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const alphabet = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Filter categories and links based on search term & letter select
  const filteredData = useMemo(() => {
    const term = search.toLowerCase().trim();

    return data
      .map((group) => {
        // If a letter filter is active, skip non-matching groups
        if (selectedLetter && group.title.toUpperCase() !== selectedLetter) {
          return null;
        }

        const filteredLinks = group.links.filter(
          (item) =>
            item.label.toLowerCase().includes(term) ||
            item.desc?.toLowerCase().includes(term) ||
            item.social?.toLowerCase().includes(term)
        );

        if (filteredLinks.length === 0) return null;

        return { ...group, links: filteredLinks };
      })
      .filter((group): group is CategoryGroup => group !== null);
  }, [data, search, selectedLetter]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Page Header */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2c221e]">{title}</h1>
        <p className="text-[#735c40] text-sm sm:text-base max-w-xl mx-auto font-medium">
          {subtitle}
        </p>
      </header>

      {/* Main Container */}
      <div className="bg-[#fdfbf7]/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#d4c5a0]/70 p-6 sm:p-8 space-y-6">

        {/* Search & Alphabet Index */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b7355]" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${title.toLowerCase()} by name, discipline, or handle...`}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d4c5a0] bg-white text-[#2c221e] placeholder-[#8b7355]/60 focus:outline-none focus:ring-2 focus:ring-[#8b7355]/30 focus:border-[#8b7355] text-sm transition-all"
            />
          </div>

          {/* A-Z Quick Jump Bar */}
          <div className="flex flex-wrap items-center justify-center gap-1 pt-2 border-b border-[#e8dfca] pb-4">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                selectedLetter === null
                  ? 'bg-[#5a4a3a] text-[#fdfbf7]'
                  : 'text-[#735c40] hover:bg-[#f2ebd9]'
              }`}
            >
              ALL
            </button>
            {alphabet.map((letter) => {
              const hasItems = data.some((g) => g.title.toUpperCase() === letter);
              return (
                <button
                  key={letter}
                  disabled={!hasItems}
                  onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                  className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                    selectedLetter === letter
                      ? 'bg-[#5a4a3a] text-[#fdfbf7]'
                      : hasItems
                      ? 'text-[#2c221e] hover:bg-[#f2ebd9]'
                      : 'text-[#d4c5a0] opacity-40 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Directory Content Groups */}
        <div className="space-y-8">
          {filteredData.map((group) => (
            <div key={group.title} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-[#5a4a3a] text-[#fdfbf7] font-serif font-bold text-lg flex items-center justify-center shadow-xs">
                  {group.title}
                </span>
                <div className="h-px bg-[#d4c5a0] flex-1 opacity-50"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.links.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/80 border border-[#d4c5a0]/60 hover:border-[#8b7355] hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-[#8b7355]" />
                          <span className="font-bold text-[#2c221e] text-base">{item.label}</span>
                        </div>
                        {item.desc && (
                          <p className="text-xs text-[#735c40] italic pl-6">{item.desc}</p>
                        )}
                      </div>

                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-[#f2ebd9]/60 text-[#8b7355] hover:bg-[#8b7355] hover:text-white transition-colors"
                          title="Visit Website"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>

                    {item.social && item.social_url && (
                      <div className="pt-2 border-t border-[#f0ede4] flex items-center justify-between text-xs">
                        <a
                          href={item.social_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#8b7355] hover:text-[#2c221e] font-semibold transition-colors"
                        >
                          <Instagram size={14} className="text-pink-700" />
                          <span>{item.social}</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12 space-y-2">
            <p className="text-[#2c221e] font-serif text-lg font-bold">No entries found</p>
            <p className="text-[#8b7355] text-sm">
              Try adjusting your search criteria or letter selection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}