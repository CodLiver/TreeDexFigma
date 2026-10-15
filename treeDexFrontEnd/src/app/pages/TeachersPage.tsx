import { useMemo } from 'react';
import { AlphabeticalDirectory } from '../util/AlphabeticalDirectory';
import { teachers } from '../data/scene_data/teacher_data';

export function TeachersPage() {
  // Transform teacher_data into the CategoryGroup[] format required by AlphabeticalDirectory
  const formattedData = useMemo(() => {
    // 1. Group teachers by letter
    const grouped: Record<string, typeof teachers> = {};

    teachers.forEach((teacher) => {
      const letter = teacher.letter?.toUpperCase() || teacher.name.charAt(0).toUpperCase();
      if (!grouped[letter]) {
        grouped[letter] = [];
      }
      grouped[letter].push(teacher);
    });

    // 2. Map grouped data to the AlphabeticalDirectory data structure
    return Object.keys(grouped)
      .sort()
      .map((letter) => ({
        title: letter,
        links: grouped[letter].map((t: any) => ({
          label: t.name,
          url: t.url,
          desc: t.desc || t.styles || 'Global Instructor', // Displays dance style or fallback description
          social: t.social || t.instagram,
          social_url: t.social_url || t.instagram_url,
        })),
      }));
  }, []);

  return (
    <AlphabeticalDirectory
      title="Swing Teachers & Instructors"
      subtitle="Discover Lindy Hop, Balboa, Blues, and Solo Jazz teachers worldwide."
      data={formattedData}
    />
  );
}