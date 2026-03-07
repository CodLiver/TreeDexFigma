import { useState } from 'react';
import { LinkSection } from '../components/LinkSection';
import { SearchBar } from '../components/SearchBar';
import { swingWebsites, socialMediaAccounts, paidServices } from '../data/mockData';

export function HomePage() {
  const [search, setSearch] = useState('');

  const filterLinks = (links: typeof swingWebsites) => {
    if (!search) return links;
    return links.filter(
      (link) =>
        link.key.toLowerCase().includes(search.toLowerCase()) ||
        link.value.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 border-2 border-[#d4c5a0]">
        <h1 className="text-center mb-6 text-[#5a4a3a]">Swing Websites</h1>
        
        <SearchBar 
          value={search} 
          onChange={setSearch} 
          placeholder="Search swing websites..."
        />
        
        <div className="space-y-4">
          <LinkSection 
            title="Swing Websites" 
            links={filterLinks(swingWebsites).map(link => ({ name: link.key, url: link.url }))} 
            keyValuePairs={filterLinks(swingWebsites)}
          />
          <LinkSection 
            title="Social Media Only Accounts" 
            links={filterLinks(socialMediaAccounts).map(link => ({ name: link.key, url: link.url }))} 
            keyValuePairs={filterLinks(socialMediaAccounts)}
          />
          <LinkSection 
            title="Paid Services/Apps" 
            links={filterLinks(paidServices).map(link => ({ name: link.key, url: link.url }))} 
            keyValuePairs={filterLinks(paidServices)}
          />
        </div>
      </div>
    </div>
  );
}
