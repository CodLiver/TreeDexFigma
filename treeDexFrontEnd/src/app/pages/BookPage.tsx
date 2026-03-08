import { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { literature, Book } from '../data/scene_data/book_data';

export function LiteraturePage() {
  const [search, setSearch] = useState('');

  const filteredBooks = useMemo(() => {
    const term = search.toLowerCase();
    return literature.filter(book =>
      book.name.toLowerCase().includes(term) ||
      book.desc.toLowerCase().includes(term)
    );
  }, [search]);

  const booksByLetter = useMemo(() => {
    const grouped: Record<string, Book[]> = {};
    filteredBooks.forEach(book => {
      if (!grouped[book.letter]) {
        grouped[book.letter] = [];
      }
      grouped[book.letter].push(book);
    });
    return grouped;
  }, [filteredBooks]);

  const letters = Object.keys(booksByLetter).sort();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 border-2 border-[#d4c5a0]">
        <h1 className="text-center mb-6 text-[#5a4a3a] text-3xl font-bold">Swing & Jazz Literature</h1>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by title or author..."
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

              {/* Books Grid - Two Columns for balanced weight */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:pl-13">
                {booksByLetter[letter].map((book, index) => (
                  <div
                    key={index}
                    className="flex flex-col p-4 bg-white border border-[#d4c5a0] rounded-lg shadow-sm hover:bg-[#faf8f3] hover:border-[#8b7355] transition-all group"
                  >
                    <div className="text-[#5a4a3a] font-bold leading-tight group-hover:text-[#8b7355] transition-colors">
                      {book.name}
                    </div>

                    {/* Consistent footer styling to match Bands/Teachers */}
                    <div className="text-[#8b7355] text-xs mt-3 pt-2 border-t border-[#f0ede4] flex justify-between items-center opacity-70 group-hover:opacity-100 transition-opacity">
                      <span className="italic font-medium">{book.desc}</span>
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">
                        Reference
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#8b7355] text-lg font-medium">No books found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}