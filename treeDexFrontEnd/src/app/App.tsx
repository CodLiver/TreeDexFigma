import { useState } from 'react';
import { Header } from './components/Header';
import { DancerPortrait } from './components/DancerPortrait';
import { HomePage } from './pages/HomePage';
import { ScenesPage } from './pages/ScenesPage';
import { BandsPage } from './pages/BandsPage';
import { TeachersPage } from './pages/TeachersPage';
import { LiteraturePage } from './pages/BookPage';
import { DonatePage } from './pages/DonatePage';

import leonjames from "./data/imgs/lj.png";
import normamiller from "./data/imgs/norma.jpeg";
import buckbubbles from "./data/imgs/buckNbubbles.jpg";
import manning from "./data/imgs/sepia-manning.png";

// cd treeDexFrontEnd
// yarn build
// yarn dev

const dancerImages = [
    leonjames,
    normamiller,
    buckbubbles,
    manning
//   'https://images.unsplash.com/photo-1574091103551-3234913b977a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc3dpbmclMjBkYW5jZXJzJTIwMTk0MHN8ZW58MXx8fHwxNzY3NDU2OTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//   'https://images.unsplash.com/photo-1574091101646-af65f2e8ea64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwZGFuY2VyJTIwdmludGFnZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc2NzQ1NjkyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
//   'https://images.unsplash.com/photo-1574091101798-a51d50ed3d0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwxOTQwcyUyMGNvdXBsZSUyMGRhbmNpbmd8ZW58MXx8fHwxNzY3NDU2OTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
];

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
    <div className="min-h-screen bg-[#ebe6dc] geometric-pattern">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-2 space-y-6">
            <DancerPortrait
              imageUrl={dancerImages[0]}
              alt="Vintage swing dancers"
            />
            <DancerPortrait
              imageUrl={dancerImages[1]}
              alt="Jazz dancer portrait"
            />
          </aside>

          {/* Main Content */}
          <section className="lg:col-span-8">
            {renderPage()}
          </section>

          {/* Right Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-2 space-y-6">
            <DancerPortrait
              imageUrl={dancerImages[2]}
              alt="1940s couple dancing"
            />
            <DancerPortrait
              imageUrl={dancerImages[3]}
              alt="Swing dance couple"
            />
          </aside>
        </div>

        {/* Mobile Portrait Gallery - Visible only on mobile */}
        <div className="lg:hidden mt-8 grid grid-cols-2 gap-4">
          {dancerImages.map((img, index) => (
            <DancerPortrait
              key={index}
              imageUrl={img}
              alt={`Swing dancer ${index + 1}`}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-[#5a4a3a] bg-white/60">
        <p>© 2026 SwingDex - Your Gateway to Swing Dance Resources</p>
      </footer>
    </div>
  );
}
