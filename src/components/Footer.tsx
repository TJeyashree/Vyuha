import { Emblem, Divider } from './Ornaments';
import type { Page } from '../nav-types';

export default function Footer({ go }: { go: (p: Page) => void }) {
  return (
    <footer className="relative bg-[linear-gradient(180deg,#F3E2C4,#E7D3AC)] pt-14">
      <div className="mx-auto max-w-6xl px-5 pb-10">
        <Divider />
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <Emblem size={32} />
              <span className="font-[family-name:var(--font-display)] text-lg tracking-[.22em] text-[#5A3410]">VYŪHA</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">
              An interactive strategic decision-making platform inspired by the Mahābhārata and enriched by Tamil
              literary heritage.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#B4761B]">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {([['home', 'Home'], ['arena', 'The Decision Arena'], ['framework', 'The Learning Framework'], ['tamil', 'Tamil Heritage & Sources'], ['about', 'About VYŪHA']] as [Page, string][]).map(([id, label]) => (
                <li key={id}>
                  <button onClick={() => go(id)} className="focusable text-[#6B553A] transition-colors hover:text-[#8A5A12]">{label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#B4761B]">The cycle</h4>
            <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">
              Dilemma → Investigate → Decide → Experience consequences → Reflect → Improve reasoning.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#B4761B]">Honesty note</h4>
            <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">
              No quotations or attributions are invented. Progress is stored only in your browser tab. Indicators are
              illustrative educational devices, not measurements.
            </p>
          </div>
        </div>
        <p className="mt-10 text-center text-[12px] text-[#8A5A12]/80">
          VYŪHA · an educational project. Built with respect for the traditions it draws upon.
        </p>
      </div>
    </footer>
  );
}
