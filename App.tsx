import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Arena from './pages/Arena';
import Framework from './pages/Framework';
import Tamil from './pages/Tamil';
import About from './pages/About';
import { useJourney } from './state/journey';
import type { Page } from './nav-types';

const PAGES: Page[] = ['home', 'arena', 'framework', 'tamil', 'about'];

export default function App() {
  const journey = useJourney();
  const [page, setPage] = useState<Page>(() => {
    const h = window.location.hash.replace('#', '') as Page;
    return PAGES.includes(h) ? h : 'home';
  });
  const [reduced, setReduced] = useState(false);

  const go = (p: Page) => {
    setPage(p);
    window.location.hash = p;
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace('#', '') as Page;
      if (PAGES.includes(h)) setPage(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className={reduced ? 'reduced min-h-screen' : 'min-h-screen'}>
      <a href="#main" className="focusable sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[#FFF8E8] focus:px-4 focus:py-2 focus:text-sm">
        Skip to content
      </a>
      <Nav page={page} go={go} reduced={reduced} setReduced={setReduced} />
      <main id="main">
        {page === 'home' && <Home go={go} />}
        {page === 'arena' && <Arena journey={journey} />}
        {page === 'framework' && <Framework go={go} />}
        {page === 'tamil' && <Tamil />}
        {page === 'about' && <About go={go} />}
      </main>
      <Footer go={go} />
    </div>
  );
}
