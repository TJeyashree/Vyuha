import { useEffect, useState } from 'react';
import { ArrowRight, Compass, BookOpen, Scale, Users, Shuffle, Flame } from 'lucide-react';
import { KurukshetraScene, Mandala, Divider, Section, LotusCorner } from '../components/Ornaments';
import { Badge, Button, Card, SectionTitle } from '../components/ui';
import { CHAPTERS } from '../data/chapters';
import type { Page } from '../nav-types';

export default function Home({ go }: { go: (p: Page) => void }) {
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setP({ x, y });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div>
      {/* ── HERO ── */}
      <div className="relative min-h-[92vh] overflow-hidden pt-28">
        <div className="absolute inset-0">
          <KurukshetraScene px={p.x} py={p.y} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,232,.92)_0%,rgba(255,248,232,.70)_32%,rgba(255,243,214,.30)_62%,rgba(122,66,36,.25)_100%)]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-5 pb-24 text-center">
          <div className="anim-rise" style={{ animationDelay: '.05s' }}>
            <Badge tone="gold">An interactive decision-making epic</Badge>
          </div>
          <h1
            className="anim-rise mt-6 font-[family-name:var(--font-display)] text-[2.1rem] leading-[1.15] text-[#5A3410] sm:text-5xl md:text-[3.4rem]"
            style={{ animationDelay: '.15s' }}
          >
            When every choice carries a consequence,
            <span className="block gold-text">what will guide your decision?</span>
          </h1>
          <p className="anim-rise mx-auto mt-6 max-w-2xl font-[family-name:var(--font-serif)] text-lg leading-relaxed text-[#6B4A24] sm:text-xl" style={{ animationDelay: '.3s' }}>
            Enter the world of the Mahābhārata. Navigate complex dilemmas, evaluate competing responsibilities,
            and discover how your decisions shape the path ahead.
          </p>

          <div className="anim-rise mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '.45s' }}>
            <Button onClick={() => go('arena')} className="text-[13px] uppercase tracking-[.16em]">
              Enter the Decision Arena <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" onClick={() => go('framework')} className="text-[13px] uppercase tracking-[.16em]">
              Explore the Learning Framework
            </Button>
          </div>

          <p className="anim-rise mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-[#7A5B33]" style={{ animationDelay: '.6s' }}>
            An interactive strategic decision-making platform inspired by the Arjuna–Krishna dialogue
            and enriched by Tamil literary heritage.
          </p>

          <div className="anim-rise mt-10 flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[.2em] text-[#8A5A12]" style={{ animationDelay: '.7s' }}>
            <span className="rounded-full border border-[#D8A642]/50 bg-[#FFFCF2]/80 px-3 py-1.5">50 questions</span>
            <span className="rounded-full border border-[#D8A642]/50 bg-[#FFFCF2]/80 px-3 py-1.5">10 chapters</span>
            <span className="rounded-full border border-[#D8A642]/50 bg-[#FFFCF2]/80 px-3 py-1.5">Branching consequences</span>
            <span className="rounded-full border border-[#D8A642]/50 bg-[#FFFCF2]/80 px-3 py-1.5">Personalised debrief</span>
          </div>
        </div>

        {/* golden path leading to CTA */}
        <svg viewBox="0 0 1200 120" className="pointer-events-none absolute bottom-0 left-0 w-full" aria-hidden>
          <path d="M0 110 Q300 40 600 80 T1200 40" fill="none" stroke="#D8A642" strokeWidth="2" opacity=".6" strokeDasharray="10 12" />
          <path d="M0 118 Q300 60 600 96 T1200 60" fill="none" stroke="#F4A623" strokeWidth="1" opacity=".5" />
        </svg>
      </div>

      {/* ── PURPOSE ── */}
      <div className="parchment relative">
        <Section>
          <div className="pointer-events-none absolute -right-28 top-6 hidden w-[28rem] lg:block">
            <Mandala className="anim-spin-slow w-full" opacity={0.17} />
          </div>
          <SectionTitle
            kicker="Why VYŪHA exists"
            title="VYŪHA teaches you how to think through a difficult decision — not what to think."
            intro="Students and young professionals constantly face choices involving uncertainty, incomplete information, competing responsibilities and unpredictable consequences. Most teaching explains decision-making theoretically. VYŪHA makes you practise it, inside dilemmas the Mahābhārata has been arguing about for two thousand years."
          />
          <Divider className="my-12" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Compass, t: 'Dilemma', d: 'A real decision with no clean answer, set in a situation with weight.' },
              { icon: BookOpen, t: 'Investigate', d: 'Separate what you know from what you have assumed.' },
              { icon: Scale, t: 'Decide', d: 'Choose, and state the reasoning you would defend.' },
              { icon: Flame, t: 'Experience consequences', d: 'The scenario responds; trade-offs become visible.' },
              { icon: Users, t: 'Reflect', d: 'Examine who was affected and what you overlooked.' },
              { icon: Shuffle, t: 'Improve reasoning', d: 'Carry a repeatable method into your own decisions.' },
            ].map((s, i) => (
              <Card key={s.t} className="group p-6 transition-transform duration-500 hover:-translate-y-1">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#D8A642]/50 bg-[#F4A623]/12 text-[#B4761B]">
                    <s.icon size={18} />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[.22em] text-[#B4761B]">Stage {i + 1}</span>
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl text-[#5A3410]">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B553A]">{s.d}</p>
              </Card>
            ))}
          </div>
        </Section>
      </div>

      {/* ── CHAPTERS ── */}
      <div className="relative bg-[linear-gradient(180deg,#FFF8E8,#F7EAD0_60%,#FFF8E8)]">
        <Section>
          <SectionTitle kicker="The journey" title="Ten chapters. Fifty decisions." intro="Each chapter holds exactly five questions and its own visual atmosphere. The chapters progress — from the first flinch on the battlefield to a reflection you can carry into Monday morning." />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {CHAPTERS.map((c) => (
              <button
                key={c.id}
                onClick={() => go('arena')}
                className="focusable group relative overflow-hidden rounded-2xl border border-[#D8A642]/50 p-5 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_44px_-28px_rgba(90,52,16,.8)]"
                style={{ background: `linear-gradient(135deg, ${c.palette.from}, ${c.palette.via} 55%, ${c.palette.to})` }}
              >
                <LotusCorner className="absolute right-0 top-0 h-16 w-16 rotate-90 opacity-60" />
                <div className="flex items-baseline gap-3">
                  <span className="font-[family-name:var(--font-display)] text-3xl" style={{ color: c.palette.accent }}>
                    {String(c.id).padStart(2, '0')}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-lg" style={{ color: c.palette.ink }}>{c.title}</h3>
                </div>
                <p className="mt-1 text-sm text-[#5A3410]/80">{c.subtitle}</p>
                <p className="mt-3 font-[family-name:var(--font-serif)] text-[15px] italic text-[#5A3410]/70">{c.atmosphere}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[.18em]" style={{ color: c.palette.accent }}>
                  Questions {(c.id - 1) * 5 + 1}–{c.id * 5} <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        </Section>
      </div>

      {/* ── HERITAGE TEASER ── */}
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#FFF8E8,#F3E2C4_50%,#E8D2A8)]">
        <Section className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <Badge tone="teal">Tamil Heritage & Sources</Badge>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl leading-tight text-[#1F4A4F] sm:text-4xl">
              The Mahābhārata in Tamil Memory
            </h2>
            <p className="mt-4 font-[family-name:var(--font-serif)] text-lg leading-relaxed text-[#4A3613]">
              “An epic survives not through a single text alone, but through languages, literary adaptations,
              performance traditions, and generations of cultural memory.”
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#6B553A]">
              Villibhāratam, Draupadi Amman worship, Therukoothu street theatre and the wider Tamil literary tradition —
              presented as a curated exhibition, with sources and limitations stated honestly.
            </p>
            <Button variant="teal" className="mt-7" onClick={() => go('tamil')}>
              Enter the exhibition <ArrowRight size={16} />
            </Button>
          </div>
          <div className="relative">
            <Card className="relative overflow-hidden p-7">
              <LotusCorner className="absolute left-0 top-0 h-16 w-16" />
              <p className="tamil text-2xl leading-loose text-[#792E3A]">வில்லிபாரதம் · தெருக்கூத்து · திரௌபதி அம்மன்</p>
              <Divider className="my-5" />
              <p className="text-sm leading-relaxed text-[#6B553A]">
                Four curated areas, a comparative reading structure, and a standing rule for this project:
                <strong className="text-[#792E3A]"> no quotation, date or attribution is invented.</strong> Where a verified
                excerpt was unavailable, we say so instead of filling the gap.
              </p>
            </Card>
          </div>
        </Section>
      </div>

      <div className="parchment">
        <Section className="text-center">
          <Mandala className="mx-auto mb-[-6rem] w-80 opacity-25" />
          <div className="relative">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#5A3410] sm:text-4xl">The chariot is waiting between the armies.</h2>
            <p className="mx-auto mt-4 max-w-xl text-[#6B553A]">Fifty decisions. Your reasoning, recorded. A debrief built from what you actually chose.</p>
            <Button className="mt-8" onClick={() => go('arena')}>Enter the Decision Arena <ArrowRight size={16} /></Button>
          </div>
        </Section>
      </div>
    </div>
  );
}
