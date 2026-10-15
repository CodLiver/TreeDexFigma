import { useMemo } from 'react';
import { AlphabeticalDirectory } from '../util/AlphabeticalDirectory';
import { literature, Book } from '../data/scene_data/book_data';

export function LiteraturePage() {
  const formattedData = useMemo(() => {
    const grouped: Record<string, Book[]> = {};

    literature.forEach((book) => {
      const letter = book.letter?.toUpperCase() || book.name.charAt(0).toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(book);
    });

    return Object.keys(grouped)
      .sort()
      .map((letter) => ({
        title: letter,
        links: grouped[letter].map((b) => ({
          label: b.name,
          url: (b as any).url || '#',
          desc: b.desc || 'Jazz History & Reference',
        })),
      }));
  }, []);

  return (
    <AlphabeticalDirectory
      title="Swing & Jazz Literature"
      subtitle="Essential reading, historical archives, and dance biographies."
      data={formattedData}
      availableTags={['History', 'Biography', 'Technique', 'Reference']}
    />
  );
}