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
    const grouped: Record<string, typeof teachers> = {};
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

              {/* Teachers Grid - High density, consistent height */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:pl-13">
                {teachersByLetter[letter].map((teacher, index) => (
                  <a
                    key={index}
                    href={teacher.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col p-4 bg-white border border-[#d4c5a0] rounded-lg shadow-sm hover:bg-[#faf8f3] hover:border-[#8b7355] transition-all group"
                  >
                    <div className="text-[#5a4a3a] font-bold leading-tight group-hover:text-[#8b7355] transition-colors">
                      {teacher.name}
                    </div>

                    {/* Visual Footer to add 'heft' to the element */}
                    {/* Change Global Instructor to sth else later */}
                    <div className="text-[#8b7355] text-xs mt-3 pt-2 border-t border-[#f0ede4] flex justify-between items-center opacity-70 group-hover:opacity-100 transition-opacity">
                      <span className="font-medium">Global Instructor</span>
                      <span className="text-[10px] uppercase tracking-tighter font-bold bg-[#f5f1e8] px-2 py-0.5 rounded border border-[#d4c5a0]">
                        View Profile →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredTeachers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#8b7355] text-lg font-medium">No teachers found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}