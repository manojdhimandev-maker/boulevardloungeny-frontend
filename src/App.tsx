import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import Navbar, { type PageId } from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import MenuPage from '@/pages/MenuPage';
import Reservations from '@/pages/Reservations';
import About from '@/pages/About';
import Events from '@/pages/Events';
import ContactPage from '@/pages/ContactPage';
import PrivateEventsPage from '@/pages/PrivateEventsPage';
import HookahPage from '@/pages/HookahPage';

import HappyHourPage from '@/pages/HappyHourPage';

const pageIdToPath: Record<PageId, string> = {
  home: '/',
  menu: '/menu',
  hookah: '/hookah',
  events: '/events',
  'happy-hour': '/happy-hour',
  'private-events': '/private-events',
  reservations: '/reservations',
  about: '/about',
  contact: '/contact',
};

function pathToPageId(pathname: string): PageId {
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  if (cleanPath === '/') return 'home';
  if (cleanPath.startsWith('/menu')) return 'menu';
  if (cleanPath === '/hookah') return 'hookah';
  if (cleanPath === '/events' || cleanPath === '/weekends') return 'events';
  if (cleanPath === '/happy-hour') return 'happy-hour';
  if (cleanPath === '/private-events') return 'private-events';
  if (cleanPath === '/reservations') return 'reservations';
  if (cleanPath === '/about') return 'about';
  if (cleanPath === '/contact') return 'contact';
  return 'home';
}

function MenuRouteWrapper({ onNavigate }: { onNavigate: (page: PageId, categoryId?: string) => void }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category') || undefined;
  
  return <MenuPage onNavigate={onNavigate} initialCategory={categoryParam} />;
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPageId = pathToPageId(location.pathname);

  const handleNavigate = (next: PageId, categoryId?: string) => {
    let targetPath = pageIdToPath[next] || '/';
    if (next === 'menu' && categoryId) {
      targetPath = `/menu?category=${encodeURIComponent(categoryId)}`;
    }
    navigate(targetPath);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'noir');
    localStorage.removeItem('blvd_theme');
  }, []);

  return (
    <div className="min-h-screen bg-ink-950 text-ink-100 selection:bg-gold-400">
      <Navbar onNavigate={handleNavigate} current={currentPageId} />
      <main>
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/menu" element={<MenuRouteWrapper onNavigate={handleNavigate} />} />
          <Route path="/hookah" element={<HookahPage onNavigate={handleNavigate} />} />
          <Route path="/events" element={<Events onNavigate={handleNavigate} />} />
          <Route path="/weekends" element={<Events onNavigate={handleNavigate} />} />
          <Route path="/happy-hour" element={<HappyHourPage onNavigate={handleNavigate} />} />
          <Route path="/private-events" element={<PrivateEventsPage onNavigate={handleNavigate} />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/about" element={<About onNavigate={handleNavigate} />} />
          <Route path="/contact" element={<ContactPage onNavigate={handleNavigate} />} />
          <Route path="*" element={<Home onNavigate={handleNavigate} />} />
        </Routes>
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
