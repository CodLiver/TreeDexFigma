import { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { bands } from '../data/scene_data/bands_data';

export function BandsPage() {
  const [search, setSearch] = useState('');

  const filteredBands = useMemo(() => {
    if (!search) return bands;
    return bands.filter(band =>
      band.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Group bands by letter
  const bandsByLetter = useMemo(() => {
    const grouped: { [key: string]: typeof bands } = {};
    filteredBands.forEach(band => {
      if (!grouped[band.letter]) {
        grouped[band.letter] = [];
      }
      grouped[band.letter].push(band);
    });
    return grouped;
  }, [filteredBands]);

  const letters = Object.keys(bandsByLetter).sort();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 border-2 border-[#d4c5a0]">
        <h1 className="text-center mb-6 text-[#5a4a3a] text-3xl font-bold">Swing Bands</h1>
        
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Search bands..."
        />
        
        <div className="space-y-8">
          {letters.map(letter => (
            <div key={letter} className="space-y-4">
              {/* Alphabetical Divider */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#8b7355] rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
                  {letter}
                </div>
                <div className="h-px bg-[#d4c5a0] flex-1"></div>
              </div>

              {/* Bands Grid - Matching the Books layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:pl-13">
                {bandsByLetter[letter].map((band, index) => (
                  <a
                    key={index}
                    href={band.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col p-4 bg-white border border-[#d4c5a0] rounded-lg shadow-sm hover:bg-[#faf8f3] hover:border-[#8b7355] transition-all group"
                  >
                    <div className="text-[#5a4a3a] font-bold leading-tight group-hover:text-[#8b7355] transition-colors">
                      {band.name}
                    </div>
                    {/* This "subtitle" makes the element feel as thick as the book items */}
                    <div className="text-[#8b7355] text-xs mt-2 pt-2 border-t border-[#f0ede4] flex justify-between items-center opacity-70 group-hover:opacity-100">
                      <span>Official Page</span>
                      <span className="text-[10px] uppercase tracking-wider font-semibold">Visit →</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredBands.length === 0 && (
          <p className="text-center text-[#8b7355] py-8 font-medium">No bands found matching your search.</p>
        )}
      </div>
    </div>
  );
}
