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

  // Group books by the 'letter' property provided in the data
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

              {/* Books Grid */}
              <div className="grid gap-3 sm:pl-12">
                {booksByLetter[letter].map((book, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white border border-[#d4c5a0] rounded-lg shadow-sm hover:border-[#8b7355] transition-all"
                  >
                    <div className="text-lg font-semibold text-[#5a4a3a]">
                      {book.name}
                    </div>
                    <div className="text-[#8b7355] italic text-sm mt-1">
                      {book.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#8b7355] text-lg">No books found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
