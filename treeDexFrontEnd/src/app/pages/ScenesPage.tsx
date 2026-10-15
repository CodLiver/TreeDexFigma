import { useState } from 'react';
import { ChevronDown, ExternalLink, MapPin, Globe2 } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { scenes } from '../data/scene_data/scene_data';

export function ScenesPage() {
  const [search, setSearch] = useState('');
  const [openContinents, setOpenContinents] = useState<string[]>([]);

  const toggleContinent = (title: string) => {
    setOpenContinents((prev) =>
      prev.includes(title) ? prev.filter((c) => c !== title) : [...prev, title]
    );
  };

  const term = search.toLowerCase().trim();
  const filteredScenes = scenes
    .map((continent) => {
      const filteredCountries = continent.countries
        .map((country) => ({
          ...country,
          scenes: country.scenes.filter(
            (scene) =>
              scene.label.toLowerCase().includes(term) ||
              scene.description?.toLowerCase().includes(term) ||
              country.name.toLowerCase().includes(term)
          ),
        }))
        .filter(
          (country) =>
            country.scenes.length > 0 || continent.title.toLowerCase().includes(term)
        );

      return { ...continent, countries: filteredCountries };
    })
    .filter(
      (continent) =>
        continent.countries.length > 0 || continent.title.toLowerCase().includes(term)
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE4D9] text-[#786C5E] text-xs font-semibold uppercase tracking-wider">
          <Globe2 size={13} className="text-[#2D2621]" />
          Global Scene Directory
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1E1915] tracking-tight">
          Swing Scenes by Location
        </h1>
        <p className="text-[#786C5E] text-sm sm:text-base max-w-xl mx-auto font-medium">
          Find local swing dance communities, weekly socials, and scene organizers worldwide.
        </p>
      </header>

      {/* Main Container Card */}
      <main className="bg-white rounded-2xl shadow-md border border-[#EAE4D9] p-6 sm:p-8 space-y-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by city, country, or scene name..."
        />

        <div className="space-y-4">
          {filteredScenes.map((continent) => {
            const isOpen = openContinents.includes(continent.title) || term.length > 0;
            const totalContinentScenes = continent.countries.reduce(
              (acc, c) => acc + c.scenes.length,
              0
            );

            return (
              <div
                key={continent.title}
                className="bg-[#FAF7F2]/50 border border-[#EAE4D9] rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleContinent(continent.title)}
                  className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-[#FAF7F2] transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#1E1915] font-serif font-bold text-xl">
                      {continent.title}
                    </span>
                    <span className="text-xs font-semibold bg-[#EAE4D9] text-[#1E1915] px-2.5 py-0.5 rounded-full">
                      {totalContinentScenes} scenes
                    </span>
                  </div>
                  <div className="p-1 rounded-md bg-[#FAF7F2] border border-[#EAE4D9]">
                    <ChevronDown
                      className={`text-[#786C5E] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      size={20}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#EAE4D9] bg-[#FAF7F2]/40 space-y-8">
                    {continent.countries.map((country) => (
                      <div key={country.name} className="space-y-4 pt-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-[#2D2621] font-serif font-bold text-lg">
                            {country.name}
                          </h3>
                          <div className="h-px bg-[#EAE4D9] flex-1"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {country.scenes.map((scene, idx) => (
                            <a
                              key={idx}
                              href={scene.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative flex flex-col justify-between p-4 bg-white hover:border-[#1E1915] border border-[#EAE4D9] rounded-xl shadow-2xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                              <div className="flex justify-between items-start gap-3 mb-2">
                                <span className="font-bold text-[#1E1915] group-hover:text-[#2D2621] text-base transition-colors leading-tight">
                                  {scene.label}
                                </span>
                                <ExternalLink
                                  size={15}
                                  className="text-[#786C5E] opacity-50 group-hover:opacity-100 transition-opacity shrink-0"
                                />
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-[#FAF7F2] flex items-center gap-1.5 text-xs text-[#786C5E]">
                                <MapPin size={13} className="text-[#2D2621] shrink-0" />
                                <span className="italic truncate">
                                  {scene.description || country.name}
                                </span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredScenes.length === 0 && (
          <div className="text-center py-12 space-y-2">
            <p className="text-[#1E1915] font-serif text-lg font-bold">No scenes found</p>
            <p className="text-[#786C5E] text-sm">
              Try searching for another city, country, or scene name.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}