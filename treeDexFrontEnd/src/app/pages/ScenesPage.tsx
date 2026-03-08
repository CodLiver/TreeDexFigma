import { useState } from 'react';
import { ChevronDown, ExternalLink, MapPin } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { scenes } from '../data/scene_data/scene_data';

export function ScenesPage() {
  const [search, setSearch] = useState('');
  const [openContinents, setOpenContinents] = useState<string[]>([]);

  const toggleContinent = (title: string) => {
    setOpenContinents(prev =>
      prev.includes(title) ? prev.filter(c => c !== title) : [...prev, title]
    );
  };

  // Deep filtering logic
  const filteredScenes = scenes.map(continent => {
    const filteredCountries = continent.countries.map(country => ({
      ...country,
      scenes: country.scenes.filter(scene =>
        scene.label.toLowerCase().includes(search.toLowerCase()) ||
        (scene.description?.toLowerCase().includes(search.toLowerCase())) ||
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    })).filter(country => country.scenes.length > 0 || continent.title.toLowerCase().includes(search.toLowerCase()));

    return { ...continent, countries: filteredCountries };
  }).filter(continent => continent.countries.length > 0 || continent.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 border-2 border-[#d4c5a0]">
        <h1 className="text-center mb-6 text-[#5a4a3a] text-3xl font-bold">Swing Scenes by Location</h1>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by city, country, or club name..."
        />

        <div className="space-y-4">
          {filteredScenes.map((continent) => (
            <div key={continent.title} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#d4c5a0]">
              <button
                onClick={() => toggleContinent(continent.title)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-[#faf8f3] transition-colors"
              >
                <span className="text-[#5a4a3a] font-bold text-xl">{continent.title}</span>
                <ChevronDown
                  className={`text-[#8b7355] transition-transform duration-300 ${
                    openContinents.includes(continent.title) ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>

              {openContinents.includes(continent.title) && (
                <div className="px-6 pb-6 border-t border-[#d4c5a0] bg-[#faf8f3] space-y-8 pt-6">
                  {continent.countries.map((country) => (
                    <div key={country.name} className="space-y-4">
                      {/* Country Header */}
                      <div className="flex items-center gap-3">
                        <h3 className="text-[#8b7355] font-bold text-lg whitespace-nowrap">
                          {country.name}
                        </h3>
                        <div className="h-px bg-[#d4c5a0] flex-1 opacity-50"></div>
                      </div>

                      {/* Scenes Grid - Now 2 columns like the others! */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {country.scenes.map((scene, idx) => (
                          <a
                            key={idx}
                            href={scene.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col p-4 bg-white rounded-lg border border-[#d4c5a0] shadow-sm hover:border-[#8b7355] hover:bg-white transition-all"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-[#5a4a3a] group-hover:text-[#8b7355] leading-tight">
                                {scene.label}
                              </span>
                              <ExternalLink size={14} className="text-[#8b7355] opacity-0 group-hover:opacity-100 transition-opacity mt-1 shrink-0" />
                            </div>

                            {/* Footer info to match the 'thick' card look */}
                            <div className="mt-auto pt-2 border-t border-[#f0ede4] flex items-center gap-1.5 text-[#8b7355] opacity-80">
                              <MapPin size={12} />
                              <span className="text-xs italic truncate">
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
          ))}
        </div>

        {filteredScenes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#8b7355] text-lg font-medium">No scenes found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}