import { useState } from 'react';
import { Heart, Instagram, ExternalLink } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Header */}
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE4D9] text-[#786C5E] text-xs font-semibold uppercase tracking-wider">
          <Heart size={13} className="text-red-700 fill-red-700" />
          Community Support
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1E1915] tracking-tight">
          Support Our Cause
        </h1>
        <p className="text-[#786C5E] text-sm sm:text-base max-w-xl mx-auto font-medium">
          Non-profit foundations, funds, and cultural preservation initiatives in the global swing community.
        </p>
      </header>

      {/* Main Container Card */}
      <main className="bg-white rounded-2xl shadow-md border border-[#EAE4D9] p-6 sm:p-8 space-y-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search organizations or handles..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {filteredOrganizations.map((org) => (
            <div
              key={org.id}
              className="group relative flex flex-col justify-between p-6 bg-[#FAF7F2]/50 hover:bg-white border border-[#EAE4D9] hover:border-[#1E1915] rounded-xl shadow-2xs hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#2D2621] text-[#FAF7F2] font-serif font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs">
                      {org.id}
                    </div>
                    <h3 className="font-serif font-bold text-[#1E1915] text-lg leading-snug group-hover:text-[#2D2621] transition-colors">
                      {org.name}
                    </h3>
                  </div>
                </div>

                {org.instagram && (
                  <a
                    href={`https://instagram.com/${org.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#786C5E] hover:text-[#1E1915] bg-[#EAE4D9]/60 px-2.5 py-1 rounded-md transition-colors"
                  >
                    <Instagram size={14} className="text-pink-700" />
                    <span>{org.instagram}</span>
                  </a>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAE4D9] flex items-center justify-between">
                <span className="text-xs font-medium text-[#786C5E]">Official Foundation</span>
                <a
                  href={org.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D2621] text-[#FAF7F2] text-xs font-semibold hover:bg-[#1E1915] transition-colors shadow-2xs"
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
            <p className="text-[#1E1915] font-serif text-lg font-bold">No organizations found</p>
            <p className="text-[#786C5E] text-sm">
              Try checking your search spelling or clear the search input.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}