import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { scenes, Continent } from '../data/scene_data/scene_data';

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
                <span className="text-[#5a4a3a] font-bold text-lg">{continent.title}</span>
                <ChevronDown
                  className={`text-[#8b7355] transition-transform duration-300 ${
                    openContinents.includes(continent.title) ? 'rotate-180' : ''
                  }`}
                  size={24}
                />
              </button>

              {openContinents.includes(continent.title) && (
                <div className="px-6 pb-4 border-t border-[#d4c5a0] bg-[#faf8f3] space-y-6 pt-4">
                  {continent.countries.map((country) => (
                    <div key={country.name} className="space-y-2">
                      <h3 className="text-[#8b7355] font-semibold border-b border-[#d4c5a0] pb-1">
                        {country.name}
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {country.scenes.map((scene, idx) => (
                          <a
                            key={idx}
                            href={scene.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col p-3 bg-white rounded-md border border-[#eee6d5] hover:border-[#8b7355] transition-all"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-[#5a4a3a] group-hover:text-[#8b7355]">
                                {scene.label}
                              </span>
                              <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            {scene.description && (
                              <span className="text-sm text-gray-500 italic">{scene.description}</span>
                            )}
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
      </div>
    </div>
  );
}