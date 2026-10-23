import { useState, useMemo } from 'react';
import { ExternalLink, Globe, CreditCard, Sparkles, Filter, X, ArrowUpRight, Instagram } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { swingWebsites, paidServices } from '../data/general_data';

type CategoryFilter = 'all' | 'websites' | 'paid';

interface ResourceItem {
  key: string;
  value: string;
  url?: string;
  instagram?: string;
}

export function HomePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  // Safe search filtering across key, value, url, and instagram handle
  const filterLinks = (links: ResourceItem[]) => {
    const term = search.toLowerCase().trim();
    if (!term) return links;
    return links.filter(
      (link) =>
        link.key?.toLowerCase().includes(term) ||
        link.value?.toLowerCase().includes(term) ||
        link.url?.toLowerCase().includes(term) ||
        link.instagram?.toLowerCase().includes(term)
    );
  };

  const filteredWebsites = useMemo(() => filterLinks(swingWebsites as ResourceItem[]), [search]);
  const filteredPaid = useMemo(() => filterLinks(paidServices as ResourceItem[]), [search]);

  const totalResults =
    (activeCategory !== 'paid' ? filteredWebsites.length : 0) +
    (activeCategory !== 'websites' ? filteredPaid.length : 0);

  // Helper to extract domain favicon
  const getFaviconUrl = (url?: string) => {
    if (!url || !url.startsWith('http')) return null;
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  // Helper to resolve URL or fallback to Instagram profile
  const resolveUrl = (item: ResourceItem) => {
    if (item.url && item.url.trim() !== '') {
      return item.url.startsWith('http') ? item.url : `https://${item.url}`;
    }
    if (item.instagram) {
      return `https://instagram.com/${item.instagram.replace('@', '')}`;
    }
    return '#';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Header */}
      <header className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE4D9] text-[#786C5E] text-xs font-semibold tracking-wider uppercase">
          <Sparkles size={13} className="text-[#2D2621]" />
          Central Community Archive
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1E1915] tracking-tight">
          General Resources
        </h1>
        <p className="text-[#786C5E] text-sm sm:text-base font-medium leading-relaxed">
          Curated directories, tools, apps, and platforms across the global swing scene.
        </p>
      </header>

      {/* Main Container Card */}
      <main className="bg-white rounded-2xl shadow-md border border-[#EAE4D9] p-6 sm:p-8 space-y-6">
        {/* Search & Category Filter Controls */}
        <div className="space-y-4">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search resources, apps, or websites..."
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-b border-[#EAE4D9] pb-4">
            <div className="flex items-center gap-2.5">
              <Filter size={15} className="text-[#786C5E]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#786C5E]">Filter:</span>
              <div className="flex gap-1.5">
                {(['all', 'websites', 'paid'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                      activeCategory === cat
                        ? 'bg-[#2D2621] text-[#FAF7F2] shadow-2xs'
                        : 'bg-[#EAE4D9]/60 text-[#786C5E] hover:bg-[#EAE4D9]'
                    }`}
                  >
                    {cat === 'all' ? 'All Resources' : cat === 'websites' ? 'Free Websites' : 'Apps & Paid'}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-[#786C5E] font-medium">
              Showing <span className="font-bold text-[#1E1915]">{totalResults}</span> items
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-10">
          {/* Section: Free Websites */}
          {(activeCategory === 'all' || activeCategory === 'websites') && filteredWebsites.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#2D2621] border border-[#EAE4D9]">
                  <Globe size={18} />
                </div>
                <div>
                  <h2 className="text-[#1E1915] font-serif font-bold text-xl leading-tight">
                    Swing Websites & Directories
                  </h2>
                  <p className="text-xs text-[#786C5E]">Free platforms, event calendars, and video archives</p>
                </div>
                <div className="h-px bg-[#EAE4D9] flex-1 ml-2"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWebsites.map((link, idx) => {
                  const targetUrl = resolveUrl(link);
                  const favicon = getFaviconUrl(link.url);

                  return (
                    <div
                      key={idx}
                      className="group relative flex flex-col justify-between p-5 bg-[#FAF7F2]/50 hover:bg-white border border-[#EAE4D9] hover:border-[#1E1915] rounded-xl shadow-2xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
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
                              <Globe size={18} className="text-[#786C5E]" />
                            )}
                            <span className="font-bold text-[#1E1915] group-hover:text-[#2D2621] text-base transition-colors leading-tight">
                              {link.value}
                            </span>
                          </div>

                          <a
                            href={targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#786C5E] opacity-50 group-hover:opacity-100 hover:text-[#1E1915] transition-all p-1"
                            title="Visit Resource"
                          >
                            <ArrowUpRight size={18} />
                          </a>
                        </div>

                        {/* Optional Instagram Handle Badge */}
                        {link.instagram && (
                          <div>
                            <a
                              href={`https://instagram.com/${link.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#786C5E] hover:text-[#1E1915] bg-[#EAE4D9]/60 px-2 py-0.5 rounded-md transition-colors"
                            >
                              <Instagram size={13} className="text-pink-700" />
                              <span>{link.instagram}</span>
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#EAE4D9] flex items-center justify-between text-xs text-[#786C5E]">
                        <span className="italic truncate pr-2">{link.key}</span>
                        <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
                          Free
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Section: Paid Services */}
          {(activeCategory === 'all' || activeCategory === 'paid') && filteredPaid.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#FAF7F2] text-[#2D2621] border border-[#EAE4D9]">
                  <CreditCard size={18} />
                </div>
                <div>
                  <h2 className="text-[#1E1915] font-serif font-bold text-xl leading-tight">
                    Paid Services & Premium Apps
                  </h2>
                  <p className="text-xs text-[#786C5E]">Subscription platforms, shoe brands, clothing & paid courses</p>
                </div>
                <div className="h-px bg-[#EAE4D9] flex-1 ml-2"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPaid.map((link, idx) => {
                  const targetUrl = resolveUrl(link);
                  const favicon = getFaviconUrl(link.url);

                  return (
                    <div
                      key={idx}
                      className="group relative flex flex-col justify-between p-5 bg-[#FAF7F2]/50 hover:bg-white border border-[#EAE4D9] hover:border-[#1E1915] rounded-xl shadow-2xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
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
                              <CreditCard size={18} className="text-[#786C5E]" />
                            )}
                            <span className="font-bold text-[#1E1915] group-hover:text-[#2D2621] text-base transition-colors leading-tight">
                              {link.value}
                            </span>
                          </div>

                          <a
                            href={targetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#786C5E] opacity-50 group-hover:opacity-100 hover:text-[#1E1915] transition-all p-1"
                            title="Visit Brand"
                          >
                            <ArrowUpRight size={18} />
                          </a>
                        </div>

                        {/* Optional Instagram Handle Badge */}
                        {link.instagram && (
                          <div>
                            <a
                              href={`https://instagram.com/${link.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#786C5E] hover:text-[#1E1915] bg-[#EAE4D9]/60 px-2 py-0.5 rounded-md transition-colors"
                            >
                              <Instagram size={13} className="text-pink-700" />
                              <span>{link.instagram}</span>
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#EAE4D9] flex items-center justify-between text-xs text-[#786C5E]">
                        <span className="italic truncate pr-2">{link.key}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2D2621] text-[#FAF7F2] px-2.5 py-0.5 rounded-full shadow-2xs shrink-0">
                          Premium
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Empty State */}
        {totalResults === 0 && (
          <div className="text-center py-12 space-y-3">
            <p className="text-[#1E1915] font-serif text-lg font-bold">No resources found</p>
            <p className="text-[#786C5E] text-sm max-w-sm mx-auto">
              We couldn't find anything matching &quot;<span className="italic">{search}</span>&quot;.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 mt-2 rounded-xl bg-[#2D2621] text-[#FAF7F2] text-xs font-semibold hover:bg-[#1E1915] transition-colors shadow-2xs"
            >
              <X size={14} /> Reset Search & Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}