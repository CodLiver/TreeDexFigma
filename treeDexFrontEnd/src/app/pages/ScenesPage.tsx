import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { scenes } from '../data/mockData';

export function ScenesPage() {
  const [search, setSearch] = useState('');
  const [openContinents, setOpenContinents] = useState<string[]>([]);

  const toggleContinent = (continent: string) => {
    setOpenContinents(prev =>
      prev.includes(continent)
        ? prev.filter(c => c !== continent)
        : [...prev, continent]
    );
  };

  const filteredScenes = scenes.map(scene => ({
    ...scene,
    countries: scene.countries.filter(
      country =>
        country.name.toLowerCase().includes(search.toLowerCase()) ||
        scene.continent.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(scene => scene.countries.length > 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 border-2 border-[#d4c5a0]">
        <h1 className="text-center mb-6 text-[#5a4a3a]">Swing Scenes by Location</h1>
        
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Search by continent or country..."
        />
        
        <div className="space-y-4">
          {filteredScenes.map((scene) => (
            <div key={scene.continent} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#d4c5a0]">
              <button
                onClick={() => toggleContinent(scene.continent)}
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-[#faf8f3] transition-colors"
              >
                <span className="text-[#5a4a3a]">{scene.continent}</span>
                <ChevronDown
                  className={`text-[#8b7355] transition-transform duration-300 ${
                    openContinents.includes(scene.continent) ? 'rotate-180' : ''
                  }`}
                  size={20}
                />
              </button>
              
              {openContinents.includes(scene.continent) && (
                <div className="px-6 pb-4 border-t border-[#d4c5a0] bg-[#faf8f3]">
                  <div className="pt-4 space-y-2">
                    {scene.countries.map((country, index) => (
                      <a
                        key={index}
                        href={country.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-2 px-4 bg-white rounded hover:bg-[#f5f1e8] transition-colors text-[#5a4a3a] hover:text-[#8b7355]"
                      >
                        {country.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
