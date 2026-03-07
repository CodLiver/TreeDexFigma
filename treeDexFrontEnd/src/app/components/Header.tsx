import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'SwingDex', id: 'home' },
    { name: 'Scenes', id: 'scenes' },
    { name: 'Bands', id: 'bands' },
    { name: 'Donate', id: 'donate' },
    { name: 'Partners', id: 'partners' },
  ];

  const handleNavigate = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-white border-b-2 border-[#d4c5a0] relative z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6 bg-[#8b7355] rounded-full"></div>
            <span className="font-semibold text-[#5a4a3a]">SwingDex</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`transition-colors ${
                  currentPage === item.id
                    ? 'text-[#8b7355]'
                    : 'text-[#5a4a3a] hover:text-[#8b7355]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#5a4a3a]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#d4c5a0]">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`block w-full text-left py-2 transition-colors ${
                  currentPage === item.id
                    ? 'text-[#8b7355]'
                    : 'text-[#5a4a3a] hover:text-[#8b7355]'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}