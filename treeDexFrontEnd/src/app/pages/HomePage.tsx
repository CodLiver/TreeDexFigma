import { useState, useMemo } from 'react';
import { ExternalLink, Globe, CreditCard } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { swingWebsites, paidServices } from '../data/general_data';

export function HomePage() {
  const [search, setSearch] = useState('');

  const filterLinks = (links: typeof swingWebsites) => {
    const term = search.toLowerCase();
    return links.filter(
      (link) =>
        link.key.toLowerCase().includes(term) ||
        link.value.toLowerCase().includes(term)
    );
  };

  const filteredWebsites = useMemo(() => filterLinks(swingWebsites), [search]);
  const filteredPaid = useMemo(() => filterLinks(paidServices), [search]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 border-2 border-[#d4c5a0]">
        <h1 className="text-center mb-6 text-[#5a4a3a] text-3xl font-bold">General Resources</h1>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search resources, apps, or websites..."
        />

        <div className="space-y-12">
          {/* Section: Swing Websites */}
          {filteredWebsites.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Globe className="text-[#8b7355]" size={24} />
                <h2 className="text-[#5a4a3a] font-bold text-xl">Swing Websites</h2>
                <div className="h-px bg-[#d4c5a0] flex-1 opacity-50"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredWebsites.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-4 bg-white border border-[#d4c5a0] rounded-lg shadow-sm hover:border-[#8b7355] hover:bg-[#faf8f3] transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-[#5a4a3a] group-hover:text-[#8b7355]">
                        {link.value}
                      </span>
                      <ExternalLink size={14} className="text-[#8b7355] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                    </div>
                    <div className="mt-auto pt-2 border-t border-[#f0ede4] text-[#8b7355] text-xs italic opacity-80 group-hover:opacity-100">
                      {link.key}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Section: Paid Services */}
          {filteredPaid.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CreditCard className="text-[#8b7355]" size={24} />
                <h2 className="text-[#5a4a3a] font-bold text-xl">Paid Services & Apps</h2>
                <div className="h-px bg-[#d4c5a0] flex-1 opacity-50"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPaid.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col p-4 bg-white border border-[#d4c5a0] rounded-lg shadow-sm hover:border-[#8b7355] hover:bg-[#faf8f3] transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-[#5a4a3a] group-hover:text-[#8b7355]">
                        {link.value}
                      </span>
                      <ExternalLink size={14} className="text-[#8b7355] opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                    </div>
                    <div className="mt-auto pt-2 border-t border-[#f0ede4] flex justify-between items-center text-[#8b7355] text-xs italic">
                      <span>{link.key}</span>
                      <span className="text-[10px] font-bold uppercase tracking-tighter bg-[#f5f1e8] px-1.5 py-0.5 rounded border border-[#d4c5a0]">Premium</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {(filteredWebsites.length === 0 && filteredPaid.length === 0) && (
          <p className="text-center text-[#8b7355] py-12 font-medium">No resources found matching your search.</p>
        )}
      </div>
    </div>
  );
}