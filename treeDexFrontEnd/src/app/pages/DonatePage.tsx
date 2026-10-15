import { useState } from 'react';
import { Heart, Instagram, ExternalLink, Sparkles } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { donateOrganizations } from '../data/general_data';

export function DonatePage() {
  const [search, setSearch] = useState('');

  const filteredOrganizations = donateOrganizations.filter(
    (org) =>
      org.name.toLowerCase().includes(search.toLowerCase()) ||
      org.instagram.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Hero Header */}
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ebd9] border border-[#d4c5a0] text-[#735c40] text-xs font-semibold uppercase tracking-wider">
          <Heart size={13} className="text-red-600 fill-red-600" />
          Community Support
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2c221e]">
          Support Our Cause
        </h1>
        <p className="text-[#735c40] text-sm sm:text-base max-w-xl mx-auto font-medium">
          Non-profit foundations, funds, and cultural preservation initiatives in the global swing community.
        </p>
      </header>

      {/* Main Container */}
      <main className="bg-[#fdfbf7]/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#d4c5a0]/70 p-6 sm:p-8 space-y-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search organizations or handles..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {filteredOrganizations.map((org) => (
            <div
              key={org.id}
              className="group relative flex flex-col justify-between p-6 bg-white/80 hover:bg-white border border-[#d4c5a0]/70 hover:border-[#8b7355] rounded-xl shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#5a4a3a] text-[#fdfbf7] font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                      {org.id}
                    </div>
                    <h3 className="font-serif font-bold text-[#2c221e] text-lg leading-snug group-hover:text-[#8b7355] transition-colors">
                      {org.name}
                    </h3>
                  </div>
                </div>

                {org.instagram && (
                  <a
                    href={`https://instagram.com/${org.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8b7355] hover:text-[#2c221e] bg-[#f2ebd9]/50 px-2.5 py-1 rounded-md transition-colors"
                  >
                    <Instagram size={14} className="text-pink-700" />
                    <span>{org.instagram}</span>
                  </a>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#f0ede4] flex items-center justify-between">
                <span className="text-xs font-medium text-[#735c40]">Official Foundation</span>
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5a4a3a] text-[#fdfbf7] text-xs font-semibold hover:bg-[#8b7355] transition-colors shadow-2xs"
                >
                  <span>Donate / Visit</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredOrganizations.length === 0 && (
          <div className="text-center py-12 space-y-2">
            <p className="text-[#2c221e] font-serif text-lg font-bold">No organizations found</p>
            <p className="text-[#8b7355] text-sm">
              Try checking your search spelling or clear the search input.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}