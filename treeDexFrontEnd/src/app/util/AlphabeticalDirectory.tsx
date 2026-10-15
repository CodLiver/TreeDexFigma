import { useState, useMemo } from 'react';
import { ExternalLink, Instagram, Search, User, Sparkles, LayoutGrid, List, Tag } from 'lucide-react';

interface LinkItem {
  label: string;
  url: string;
  desc?: string;
  tags?: string[];
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
  availableTags?: string[];
}

export function AlphabeticalDirectory({
  title,
  subtitle,
  data,
  availableTags = ['Lindy Hop', 'Balboa', 'Solo Jazz', 'Blues', 'Shag'],
}: AlphabeticalDirectoryProps) {
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const filteredData = useMemo(() => {
    const term = search.toLowerCase().trim();

    return data
      .map((group) => {
        if (selectedLetter && group.title.toUpperCase() !== selectedLetter) {
          return null;
        }

        const filteredLinks = group.links.filter((item) => {
          const matchesSearch =
            item.label.toLowerCase().includes(term) ||
            item.desc?.toLowerCase().includes(term) ||
            item.social?.toLowerCase().includes(term);

          const matchesTag =
            !selectedTag ||
            item.desc?.toLowerCase().includes(selectedTag.toLowerCase()) ||
            item.tags?.some((t) => t.toLowerCase() === selectedTag.toLowerCase());

          return matchesSearch && matchesTag;
        });

        if (filteredLinks.length === 0) return null;

        return { ...group, links: filteredLinks };
      })
      .filter((group): group is CategoryGroup => group !== null);
  }, [data, search, selectedLetter, selectedTag]);

  const totalCount = useMemo(() => {
    return filteredData.reduce((acc, group) => acc + group.links.length, 0);
  }, [filteredData]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2ebd9] text-[#735c40] text-xs font-semibold tracking-wider uppercase border border-[#d4c5a0]/50">
          <Sparkles size={13} className="text-[#8b7355]" />
          <span>Swing Archive</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2c221e] tracking-tight">
          {title}
        </h1>
        <p className="text-[#735c40] text-sm sm:text-base max-w-xl mx-auto font-medium">
          {subtitle}
        </p>
      </header>

      {/* Control Panel: Search, Tags, Alphabet & View Switcher */}
      <div className="sticky top-16 z-30 bg-[#fdfbf7]/95 backdrop-blur-md p-5 rounded-2xl border border-[#d4c5a0]/70 shadow-sm space-y-4">

        {/* Search Input & View Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b7355]" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${title.toLowerCase()} by name, style, or region...`}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d4c5a0] bg-white text-[#2c221e] placeholder-[#8b7355]/60 focus:outline-none focus:ring-2 focus:ring-[#8b7355]/30 focus:border-[#8b7355] text-sm transition-all"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
            <span className="text-xs font-medium text-[#735c40] whitespace-nowrap">
              <strong className="text-[#2c221e]">{totalCount}</strong> entries found
            </span>

            {/* Layout Toggle Buttons */}
            <div className="flex items-center bg-[#f2ebd9]/70 p-1 rounded-lg border border-[#d4c5a0]/50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-white text-[#2c221e] shadow-2xs' : 'text-[#8b7355] hover:text-[#2c221e]'
                }`}
                title="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-all ${
                  viewMode === 'list' ? 'bg-white text-[#2c221e] shadow-2xs' : 'text-[#8b7355] hover:text-[#2c221e]'
                }`}
                title="Compact List View"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Style Tag Quick Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#e8dfca]">
          <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#735c40] mr-1">
            <Tag size={13} className="text-[#8b7355]" />
            <span>Styles:</span>
          </div>
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              selectedTag === null
                ? 'bg-[#5a4a3a] text-[#fdfbf7]'
                : 'bg-white border border-[#d4c5a0]/60 text-[#735c40] hover:bg-[#f2ebd9]'
            }`}
          >
            All Styles
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                selectedTag === tag
                  ? 'bg-[#8b7355] text-white shadow-2xs'
                  : 'bg-white border border-[#d4c5a0]/60 text-[#735c40] hover:bg-[#f2ebd9]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Quick Jump A-Z Index Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1 pt-1">
          <button
            onClick={() => setSelectedLetter(null)}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
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
                className={`w-7 h-7 rounded-md text-xs font-bold transition-all ${
                  selectedLetter === letter
                    ? 'bg-[#5a4a3a] text-[#fdfbf7]'
                    : hasItems
                    ? 'text-[#2c221e] hover:bg-[#f2ebd9]'
                    : 'text-[#d4c5a0] opacity-30 cursor-not-allowed'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Content */}
      <div className="space-y-8">
        {filteredData.map((group) => (
          <div key={group.title} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#5a4a3a] text-[#fdfbf7] font-serif font-bold text-base flex items-center justify-center shadow-2xs">
                {group.title}
              </span>
              <div className="h-px bg-[#d4c5a0] flex-1 opacity-40"></div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.links.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col justify-between p-4 bg-white rounded-xl border border-[#d4c5a0]/60 hover:border-[#8b7355] hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-[#8b7355] shrink-0" />
                          <span className="font-bold text-[#2c221e] text-base group-hover:text-[#8b7355] transition-colors leading-snug">
                            {item.label}
                          </span>
                        </div>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-md text-[#8b7355] opacity-40 group-hover:opacity-100 hover:bg-[#f2ebd9] transition-all"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>

                      {item.desc && (
                        <p className="text-xs text-[#735c40] italic line-clamp-2 pl-6">
                          {item.desc}
                        </p>
                      )}
                    </div>

                    {item.social && item.social_url && (
                      <div className="mt-4 pt-2.5 border-t border-[#f0ede4] flex items-center justify-between text-xs">
                        <a
                          href={item.social_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#8b7355] hover:text-[#2c221e] font-semibold transition-colors"
                        >
                          <Instagram size={13} className="text-pink-700" />
                          <span>{item.social}</span>
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Compact Table / List View */
              <div className="bg-white rounded-xl border border-[#d4c5a0]/60 divide-y divide-[#f0ede4] overflow-hidden">
                {group.links.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 hover:bg-[#fdfbf7] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <User size={15} className="text-[#8b7355] shrink-0" />
                      <div>
                        <span className="font-bold text-[#2c221e] text-sm group-hover:text-[#8b7355] transition-colors">
                          {item.label}
                        </span>
                        {item.desc && (
                          <span className="text-xs text-[#735c40] italic ml-3 border-l border-[#d4c5a0]/50 pl-3 hidden sm:inline">
                            {item.desc}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {item.social && item.social_url && (
                        <a
                          href={item.social_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#8b7355] hover:text-[#2c221e] hidden sm:inline-flex items-center gap-1"
                        >
                          <Instagram size={12} className="text-pink-700" />
                          {item.social}
                        </a>
                      )}
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#f2ebd9]/60 text-[#735c40] text-xs font-semibold hover:bg-[#8b7355] hover:text-white transition-colors"
                        >
                          <span>Visit</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-16 bg-white/60 rounded-2xl border border-[#d4c5a0]/40 space-y-2">
          <p className="text-[#2c221e] font-serif text-lg font-bold">No matching entries found</p>
          <p className="text-[#8b7355] text-sm">
            Try resetting your active tag filters, search terms, or letter filter.
          </p>
        </div>
      )}
    </div>
  );
}