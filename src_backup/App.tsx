import { useEffect, useState } from 'react';
import Navbar, { type PageId } from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Home from '@/pages/Home';
import MenuPage from '@/pages/MenuPage';
import Reservations from '@/pages/Reservations';
import About from '@/pages/About';
import Events from '@/pages/Events';

export default function App() {
  const [page, setPage] = useState<PageId>('home');

  const navigate = (next: PageId) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 selection:bg-gold-400">
      <Navbar onNavigate={navigate} current={page} />
      <main>
        {page === 'home' && <Home onNavigate={navigate} />}
        {page === 'menu' && <MenuPage onNavigate={navigate} />}
        {page === 'reservations' && <Reservations />}
        {page === 'about' && <About onNavigate={navigate} />}
        {page === 'events' && <Events onNavigate={navigate} />}
      </main>
      <Footer onNavigate={navigate} />
      <ThemeSwitcher />
    </div>
  );
}
