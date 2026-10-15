import { useState } from 'react';
import { Menu, X, Disc3, Heart } from 'lucide-react';

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
    { name: 'Teachers', id: 'teachers' },
    { name: 'Books', id: 'books' },
    { name: 'Donate', id: 'donate', icon: Heart },
  ];

  const handleNavigate = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fdfbf7]/90 backdrop-blur-md border-b border-[#d4c5a0]/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo Badge */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#5a4a3a] text-[#fdfbf7] flex items-center justify-center shadow-xs group-hover:bg-[#8b7355] transition-colors">
              <Disc3 size={18} className="animate-spin-slow" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif font-bold text-lg text-[#2c221e] leading-none group-hover:text-[#8b7355] transition-colors">
                SwingDex
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#8b7355] font-semibold">
                Swing Archive
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#2c221e] font-bold bg-[#f2ebd9] shadow-2xs'
                      : 'text-[#735c40] hover:text-[#2c221e] hover:bg-[#f2ebd9]/50'
                  }`}
                >
                  {Icon && <Icon size={14} className={isActive ? 'text-red-600' : 'text-[#8b7355]'} />}
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#8b7355] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#5a4a3a] hover:bg-[#f2ebd9] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-3 border-t border-[#d4c5a0]/60 space-y-1 animate-in fade-in slide-in-from-top-2">
            {menuItems.map((item) => {
              const isActive = currentPage === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#f2ebd9] text-[#2c221e] font-bold'
                      : 'text-[#735c40] hover:bg-[#f2ebd9]/40'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {Icon && <Icon size={15} className="text-red-600" />}
                    {item.name}
                  </span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#8b7355]" />}
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}