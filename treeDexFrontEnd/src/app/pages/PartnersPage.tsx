import { useState } from 'react';
import { Instagram } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { partners } from '../data/mockData';

export function PartnersPage() {
  const [search, setSearch] = useState('');

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(search.toLowerCase()) ||
    partner.instagram.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 border-2 border-[#d4c5a0]">
        <h1 className="text-center mb-2 text-[#5a4a3a]">Our Partners</h1>
        <p className="text-center text-[#8b7355] mb-8">Working together to keep swing dancing alive.</p>
        
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Search partners..."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPartners.map((partner) => (
            <div key={partner.id} className="bg-white border-2 border-[#d4c5a0] rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-[#8b7355] rounded-full flex items-center justify-center text-white">
                    {partner.id}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-[#5a4a3a] mb-2">{partner.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3 text-[#8b7355]">
                    <Instagram size={16} />
                    <span className="truncate">{partner.instagram}</span>
                  </div>
                  
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8b7355] hover:text-[#5a4a3a] transition-colors text-sm break-all"
                  >
                    {partner.url}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPartners.length === 0 && (
          <p className="text-center text-[#8b7355] py-8">No partners found matching your search.</p>
        )}
      </div>
    </div>
  );
}
