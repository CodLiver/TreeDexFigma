import { useState } from 'react';
import { Menu, X, Disc3, Heart, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'General', id: 'home' },
    { name: 'Scenes', id: 'scenes' },
    { name: 'Bands', id: 'bands' },
//     { name: 'Teachers', id: 'teachers' },
    { name: 'Books', id: 'books' },
    { name: 'Donate', id: 'donate', icon: Heart },
  ];

  const handleNavigate = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo Badge */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:bg-indigo-600 transition-colors">
              <Disc3 size={20} className="text-indigo-400 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-lg text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">
                SwingDex
              </span>
              <span className="text-[10px] tracking-widest uppercase text-slate-500 font-semibold mt-0.5">
                Swing Dance Wiki
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/70 p-1.5 rounded-xl border border-slate-200/60">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  {Icon && <Icon size={14} className={isActive ? 'text-rose-500' : 'text-slate-400'} />}
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-3 border-t border-slate-200 space-y-1">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-left text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {Icon && <Icon size={15} className="text-rose-500" />}
                    {item.name}
                  </span>
                  {isActive && <div className="w-2 h-2 rounded-full bg-indigo-600" />}
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}