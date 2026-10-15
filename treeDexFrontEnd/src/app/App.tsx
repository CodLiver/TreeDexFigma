import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { ScenesPage } from './pages/ScenesPage';
import { BandsPage } from './pages/BandsPage';
import { TeachersPage } from './pages/TeachersPage';
import { LiteraturePage } from './pages/BookPage';
import { DonatePage } from './pages/DonatePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'scenes':
        return <ScenesPage />;
      case 'bands':
        return <BandsPage />;
      case 'teachers':
        return <TeachersPage />;
      case 'books':
        return <LiteraturePage />;
      case 'donate':
        return <DonatePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1915] font-sans antialiased flex flex-col selection:bg-[#EAE4D9] selection:text-[#1E1915]">
      {/* Top Header */}
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      {/* Main Content Area - Full Width Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#EAE4D9] bg-white/60 backdrop-blur-xs py-8 text-center text-xs font-medium text-[#786C5E]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-[#1E1915]">SwingDex</span>
            <span className="text-[#A3988A]">•</span>
            <span>The Open Swing Dance Archive</span>
          </div>
          <p>© 2026 SwingDex. Built for the global swing dance community.</p>
        </div>
      </footer>
    </div>
  );
}