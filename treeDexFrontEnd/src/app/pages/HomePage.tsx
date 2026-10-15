import { useState, useMemo } from 'react';
import { ExternalLink, Globe, CreditCard, Sparkles, Filter, X } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { swingWebsites, paidServices } from '../data/general_data';

type CategoryFilter = 'all' | 'websites' | 'paid';

export function HomePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filterLinks = (links: typeof swingWebsites) => {
    const term = search.toLowerCase().trim();
    if (!term) return links;
    return links.filter(
      (link) =>
        link.key.toLowerCase().includes(term) ||
        link.value.toLowerCase().includes(term) ||
        link.url.toLowerCase().includes(term)
    );
  };

  const filteredWebsites = useMemo(() => filterLinks(swingWebsites), [search]);
  const filteredPaid = useMemo(() => filterLinks(paidServices), [search]);

  const totalResults =
    (activeCategory !== 'paid' ? filteredWebsites.length : 0) +
    (activeCategory !== 'websites' ? filteredPaid.length : 0);

  // Helper to extract crisp favicon URLs
  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Hero Header Banner */}
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ebd9] border border-[#d4c5a0] text-[#735c40] text-xs font-semibold uppercase tracking-wider">
          <Sparkles size={13} className="text-[#8b7355]" />
          Swing Dance Knowledge Base
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2c221e] tracking-tight">
          General Resources
        </h1>
        <p className="text-[#735c40] text-sm sm:text-base max-w-xl mx-auto font-medium">
          Curated directories, tools, apps, and platforms across the global swing scene.
        </p>
      </header>

      {/* Main Container Card */}
      <main className="bg-[#fdfbf7]/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#d4c5a0]/70 p-6 sm:p-8 space-y-6">
        {/* Controls Bar: Search + Category Pills */}
        <div className="space-y-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by name, tags, or description..."
          />

          {/* Category Quick Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-b border-[#e8dfca] pb-4">
            <div className="flex items-center gap-2">
              <Filter size={15} className="text-[#8b7355]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#735c40]">Filter:</span>
              <div className="flex gap-1.5">
                {(['all', 'websites', 'paid'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                      activeCategory === cat
                        ? 'bg-[#5a4a3a] text-[#fdfbf7] shadow-sm'
                        : 'bg-[#f2ebd9]/60 text-[#735c40] hover:bg-[#e8dfca]'
                    }`}
                  >
                    {cat === 'all' ? 'All Resources' : cat === 'websites' ? 'Free Websites' : 'Apps & Paid'}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-[#8b7355] font-medium">
              Showing <span className="font-bold text-[#5a4a3a]">{totalResults}</span> items
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {/* Section: Swing Websites */}
          {(activeCategory === 'all' || activeCategory === 'websites') && filteredWebsites.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#f2ebd9] text-[#5a4a3a] border border-[#d4c5a0]/50">
                  <Globe size={20} />
                </div>
                <div>
                  <h2 className="text-[#2c221e] font-serif font-bold text-xl leading-tight">
                    Swing Websites & Directories
                  </h2>
                  <p className="text-xs text-[#8b7355]">Free platforms, event calendars, and video archives</p>
                </div>
                <div className="h-px bg-[#d4c5a0] flex-1 opacity-40 ml-2"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredWebsites.map((link, idx) => {
                  const favicon = getFaviconUrl(link.url);
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex flex-col justify-between p-4 bg-white/80 hover:bg-white border border-[#d4c5a0]/60 hover:border-[#8b7355] rounded-xl shadow-xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          {favicon ? (
                            <img
                              src={favicon}
                              alt=""
                              className="w-5 h-5 rounded object-contain opacity-80 group-hover:opacity-100"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <Globe size={18} className="text-[#8b7355]" />
                          )}
                          <span className="font-bold text-[#2c221e] group-hover:text-[#8b7355] text-base transition-colors">
                            {link.value}
                          </span>
                        </div>
                        <ExternalLink
                          size={16}
                          className="text-[#8b7355] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        />
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#f0ede4] flex items-center justify-between text-xs text-[#735c40]">
                        <span className="italic opacity-90 line-clamp-1">{link.key}</span>
                        <span className="text-[10px] font-semibold bg-[#f2ebd9] text-[#735c40] px-2 py-0.5 rounded border border-[#d4c5a0]/50 ml-2 shrink-0">
                          Free
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          )}

          {/* Section: Paid Services */}
          {(activeCategory === 'all' || activeCategory === 'paid') && filteredPaid.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#f2ebd9] text-[#5a4a3a] border border-[#d4c5a0]/50">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h2 className="text-[#2c221e] font-serif font-bold text-xl leading-tight">
                    Paid Services & Apps
                  </h2>
                  <p className="text-xs text-[#8b7355]">Subscription platforms, paid courses, and premium apps</p>
                </div>
                <div className="h-px bg-[#d4c5a0] flex-1 opacity-40 ml-2"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPaid.map((link, idx) => {
                  const favicon = getFaviconUrl(link.url);
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex flex-col justify-between p-4 bg-white/80 hover:bg-white border border-[#d4c5a0]/60 hover:border-[#8b7355] rounded-xl shadow-xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          {favicon ? (
                            <img
                              src={favicon}
                              alt=""
                              className="w-5 h-5 rounded object-contain opacity-80 group-hover:opacity-100"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <CreditCard size={18} className="text-[#8b7355]" />
                          )}
                          <span className="font-bold text-[#2c221e] group-hover:text-[#8b7355] text-base transition-colors">
                            {link.value}
                          </span>
                        </div>
                        <ExternalLink
                          size={16}
                          className="text-[#8b7355] opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        />
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-[#f0ede4] flex items-center justify-between text-xs text-[#735c40]">
                        <span className="italic opacity-90 line-clamp-1">{link.key}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#8b7355] text-[#fdfbf7] px-2 py-0.5 rounded shadow-xs ml-2 shrink-0">
                          Premium
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Empty State */}
        {totalResults === 0 && (
          <div className="text-center py-16 space-y-3">
            <p className="text-[#2c221e] font-serif text-lg font-bold">No resources found</p>
            <p className="text-[#8b7355] text-sm max-w-sm mx-auto">
              We couldn't find anything matching &quot;<span className="italic">{search}</span>&quot;. Try checking for typos or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 mt-2 rounded-lg bg-[#5a4a3a] text-[#fdfbf7] text-xs font-semibold hover:bg-[#3d3227] transition-colors"
            >
              <X size={14} /> Clear Search & Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}