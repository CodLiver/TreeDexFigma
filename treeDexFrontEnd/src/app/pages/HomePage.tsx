import { useState, useMemo } from 'react';
import { ExternalLink, Globe, CreditCard, Sparkles, Filter, X, ArrowUpRight } from 'lucide-react';
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

  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {/* Modern Hero Header */}
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold tracking-wide uppercase">
          <Sparkles size={14} className="text-indigo-500" />
          Central Community Archive
        </div>
        <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-slate-900 tracking-tight">
          General Resources
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Curated directories, tools, apps, and platforms across the global swing scene.
        </p>
      </header>

      {/* Main Container Card */}
      <main className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 sm:p-10 space-y-8">

        {/* Search & Category Filter Controls */}
        <div className="space-y-5">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search resources, apps, or websites..."
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2.5">
              <Filter size={16} className="text-slate-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Filter:</span>
              <div className="flex gap-2">
                {(['all', 'websites', 'paid'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                      activeCategory === cat
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    {cat === 'all' ? 'All Resources' : cat === 'websites' ? 'Free Websites' : 'Apps & Paid'}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-900">{totalResults}</span> items
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Section: Free Websites */}
          {(activeCategory === 'all' || activeCategory === 'websites') && filteredWebsites.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200/60">
                  <Globe size={20} />
                </div>
                <div>
                  <h2 className="text-slate-900 font-serif font-bold text-xl leading-snug">
                    Swing Websites & Directories
                  </h2>
                  <p className="text-xs text-slate-500">Free platforms, event calendars, and video archives</p>
                </div>
                <div className="h-px bg-slate-100 flex-1 ml-2"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredWebsites.map((link, idx) => {
                  const favicon = getFaviconUrl(link.url);
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex flex-col justify-between p-5 bg-slate-50/50 hover:bg-white border border-slate-200/80 hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/10 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          {favicon ? (
                            <img
                              src={favicon}
                              alt=""
                              className="w-6 h-6 rounded-md object-contain opacity-80 group-hover:opacity-100"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <Globe size={20} className="text-slate-400" />
                          )}
                          <span className="font-bold text-slate-900 group-hover:text-indigo-600 text-base transition-colors leading-tight">
                            {link.value}
                          </span>
                        </div>
                        <ArrowUpRight
                          size={18}
                          className="text-slate-400 opacity-40 group-hover:opacity-100 group-hover:text-indigo-600 transition-all shrink-0"
                        />
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                        <span className="italic truncate pr-2">{link.key}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200/60 shrink-0">
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
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h2 className="text-slate-900 font-serif font-bold text-xl leading-snug">
                    Paid Services & Premium Apps
                  </h2>
                  <p className="text-xs text-slate-500">Subscription platforms, paid courses, and premium gear</p>
                </div>
                <div className="h-px bg-slate-100 flex-1 ml-2"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPaid.map((link, idx) => {
                  const favicon = getFaviconUrl(link.url);
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex flex-col justify-between p-5 bg-slate-50/50 hover:bg-white border border-slate-200/80 hover:border-indigo-500 hover:ring-2 hover:ring-indigo-500/10 rounded-2xl shadow-xs hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          {favicon ? (
                            <img
                              src={favicon}
                              alt=""
                              className="w-6 h-6 rounded-md object-contain opacity-80 group-hover:opacity-100"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <CreditCard size={20} className="text-slate-400" />
                          )}
                          <span className="font-bold text-slate-900 group-hover:text-indigo-600 text-base transition-colors leading-tight">
                            {link.value}
                          </span>
                        </div>
                        <ArrowUpRight
                          size={18}
                          className="text-slate-400 opacity-40 group-hover:opacity-100 group-hover:text-indigo-600 transition-all shrink-0"
                        />
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                        <span className="italic truncate pr-2">{link.key}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-200/60 shrink-0">
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
            <p className="text-slate-900 font-serif text-lg font-bold">No resources found</p>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              We couldn't find anything matching &quot;<span className="italic">{search}</span>&quot;.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setActiveCategory('all');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 mt-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
            >
              <X size={14} /> Reset Search
            </button>
          </div>
        )}
      </main>
    </div>
  );
}