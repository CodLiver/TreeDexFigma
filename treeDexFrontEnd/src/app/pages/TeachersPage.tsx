import { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { teachers } from '../data/scene_data/teacher_data';

export function TeachersPage() {
  const [search, setSearch] = useState('');

  const filteredTeachers = useMemo(() => {
    if (!search) return teachers;
    return teachers.filter(teacher =>
      teacher.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // Group teachers by letter
  const teachersByLetter = useMemo(() => {
    const grouped: { [key: string]: typeof teachers } = {};
    filteredTeachers.forEach(teacher => {
      if (!grouped[teacher.letter]) {
        grouped[teacher.letter] = [];
      }
      grouped[teacher.letter].push(teacher);
    });
    return grouped;
  }, [filteredTeachers]);

  const letters = Object.keys(teachersByLetter).sort();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 border-2 border-[#d4c5a0]">
      <h1 className="text-center mb-6 text-[#5a4a3a] text-3xl font-bold">Swing Teachers</h1>


        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search teachers..."
        />

        <div className="space-y-6">
          {letters.map(letter => (
            <div key={letter} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#8b7355] rounded-full flex items-center justify-center text-white shrink-0">
                  {letter}
                </div>
                <div className="h-px bg-[#d4c5a0] flex-1"></div>
              </div>

              <div className="grid gap-2 pl-13">
                {teachersByLetter[letter].map((teacher, index) => (
                  <a
                    key={index}
                    href={teacher.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-3 px-4 bg-white border border-[#d4c5a0] rounded-lg hover:bg-[#faf8f3] hover:border-[#8b7355] transition-all text-[#5a4a3a] hover:text-[#8b7355]"
                  >
                    {teacher.name}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <p className="text-center text-[#8b7355] py-8">No teachers found matching your search.</p>
        )}
      </div>
    </div>
  );
}
