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

  // Deep filtering logic across Continent -> Country -> Scene
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
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <header className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ebd9] border border-[#d4c5a0] text-[#735c40] text-xs font-semibold uppercase tracking-wider">
          <Globe2 size={13} className="text-[#8b7355]" />
          Global Scene Directory
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2c221e]">
          Swing Scenes by Location
        </h1>
        <p className="text-[#735c40] text-sm sm:text-base max-w-xl mx-auto font-medium">
          Find local swing dance communities, weekly socials, and scene organizers worldwide.
        </p>
      </header>

      {/* Main Container */}
      <main className="bg-[#fdfbf7]/90 backdrop-blur-md rounded-2xl shadow-xl border border-[#d4c5a0]/70 p-6 sm:p-8 space-y-6">
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
                className="bg-white/80 border border-[#d4c5a0]/70 rounded-xl shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleContinent(continent.title)}
                  className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-[#fdfbf7] transition-colors focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#2c221e] font-serif font-bold text-xl">
                      {continent.title}
                    </span>
                    <span className="text-xs font-semibold bg-[#f2ebd9] text-[#735c40] px-2.5 py-0.5 rounded-full border border-[#d4c5a0]/40">
                      {totalContinentScenes} scenes
                    </span>
                  </div>
                  <div className="p-1 rounded-md bg-[#fdfbf7] border border-[#d4c5a0]/40">
                    <ChevronDown
                      className={`text-[#8b7355] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      size={20}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#f0ede4] bg-[#fdfbf7]/50 space-y-8">
                    {continent.countries.map((country) => (
                      <div key={country.name} className="space-y-4 pt-3">
                        <div className="flex items-center gap-3">
                          <h3 className="text-[#8b7355] font-serif font-bold text-lg">
                            {country.name}
                          </h3>
                          <div className="h-px bg-[#d4c5a0] flex-1 opacity-40"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {country.scenes.map((scene, idx) => (
                            <a
                              key={idx}
                              href={scene.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative flex flex-col justify-between p-4 bg-white/90 hover:bg-white border border-[#d4c5a0]/60 hover:border-[#8b7355] rounded-xl shadow-2xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                            >
                              <div className="flex justify-between items-start gap-3 mb-2">
                                <span className="font-bold text-[#2c221e] group-hover:text-[#8b7355] text-base transition-colors leading-tight">
                                  {scene.label}
                                </span>
                                <ExternalLink
                                  size={15}
                                  className="text-[#8b7355] opacity-40 group-hover:opacity-100 transition-opacity shrink-0"
                                />
                              </div>

                              <div className="mt-3 pt-2.5 border-t border-[#f0ede4] flex items-center gap-1.5 text-xs text-[#735c40]">
                                <MapPin size={13} className="text-[#8b7355] shrink-0" />
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
            <p className="text-[#2c221e] font-serif text-lg font-bold">No scenes found</p>
            <p className="text-[#8b7355] text-sm">
              Try searching for another city, country, or scene name.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}