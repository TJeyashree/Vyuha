import { useEffect, useState } from 'react';
import { Menu, X, Sparkles, Eye } from 'lucide-react';
import { Emblem } from './Ornaments';
import { Button } from './ui';
import { cn } from '../utils/cn';
import type { Page } from '../nav-types';

const LINKS: { id: Page; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'arena', label: 'The Decision Arena' },
  { id: 'framework', label: 'The Learning Framework' },
  { id: 'tamil', label: 'Tamil Heritage & Sources' },
  { id: 'about', label: 'About' },
];

export default function Nav({
  page, go, reduced, setReduced,
}: { page: Page; go: (p: Page) => void; reduced: boolean; setReduced: (v: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const h = () => setSolid(window.scrollY > 24);
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-500', solid ? 'py-2' : 'py-3')}>
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={cn(
            'flex items-center gap-3 rounded-full border px-3 py-2 transition-all duration-500 sm:px-5',
            solid
              ? 'border-[#D8A642]/60 bg-[#FFF8E8]/92 shadow-[0_14px_34px_-24px_rgba(90,52,16,.8)] backdrop-blur-md'
              : 'border-[#D8A642]/35 bg-[#FFFCF2]/70 backdrop-blur-sm',
          )}
        >
          <button onClick={() => go('home')} className="focusable flex items-center gap-2.5 rounded-full pr-2" aria-label="VYŪHA home">
            <Emblem size={34} />
            <span className="text-left leading-none">
              <span className="block font-[family-name:var(--font-display)] text-lg tracking-[.22em] text-[#5A3410]">VYŪHA</span>
              <span className="hidden text-[9px] uppercase tracking-[.26em] text-[#B4761B] sm:block">Strategic reasoning</span>
            </span>
          </button>

          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  'focusable rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors',
                  page === l.id ? 'bg-[#F4A623]/18 text-[#8A5A12]' : 'text-[#6B553A] hover:bg-[#F4A623]/10 hover:text-[#8A5A12]',
                )}
                aria-current={page === l.id ? 'page' : undefined}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setReduced(!reduced)}
            title={reduced ? 'Enable motion' : 'Reduce motion'}
            aria-pressed={reduced}
            className="focusable ml-auto rounded-full border border-[#D8A642]/40 p-2 text-[#8A5A12] hover:bg-[#F4A623]/12 lg:ml-2"
          >
            {reduced ? <Eye size={16} /> : <Sparkles size={16} />}
            <span className="sr-only">Toggle reduced motion</span>
          </button>

          <Button className="hidden px-5 py-2.5 text-xs md:inline-flex" onClick={() => go('arena')}>
            Begin Your Journey
          </Button>

          <button className="focusable rounded-full border border-[#D8A642]/40 p-2 text-[#8A5A12] lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div className="mt-2 overflow-hidden rounded-3xl border border-[#D8A642]/50 bg-[#FFF8E8]/97 p-2 shadow-xl backdrop-blur lg:hidden">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => { go(l.id); setOpen(false); }}
                className="focusable block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-[#5A3410] hover:bg-[#F4A623]/14"
              >
                {l.label}
              </button>
            ))}
            <Button className="mt-1 w-full" onClick={() => { go('arena'); setOpen(false); }}>Begin Your Journey</Button>
          </div>
        )}
      </div>
    </header>
  );
}
