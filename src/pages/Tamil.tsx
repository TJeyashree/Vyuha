import { useState } from 'react';
import { Info, Columns2 } from 'lucide-react';
import { Divider, LotusCorner, Mandala, Section } from '../components/Ornaments';
import { Badge, Card, SectionTitle } from '../components/ui';
import { COMPARATIVE_NOTE, HERITAGE_REFERENCES, TAMIL_SECTIONS, VERSES } from '../data/heritage';
import { cn } from '../utils/cn';

export default function Tamil() {
  const [active, setActive] = useState(TAMIL_SECTIONS[0].id);
  const item = TAMIL_SECTIONS.find((s) => s.id === active)!;
  const [verse, setVerse] = useState(0);
  const v = VERSES[verse];

  return (
    <div className="pt-24" style={{ background: 'linear-gradient(180deg,#FFFCF2,#F6E7CD 40%,#EFDCBA)' }}>
      <Section>
        <div className="relative text-center">
          <Mandala className="mx-auto w-64 anim-spin-slow" stroke="#087F8C" opacity={0.22} />
          <div className="mt-[-3rem]">
            <Badge tone="teal">Literature · Living traditions · Research</Badge>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1F4A4F] sm:text-5xl">
              Tamil Literary & Cultural Heritage
            </h1>
            <p className="mx-auto mt-5 max-w-3xl font-[family-name:var(--font-serif)] text-xl leading-relaxed text-[#53281F]">
              Explore how the Mahābhārata is retold in Tamil literature, remembered through community traditions, and performed across generations. This section brings together concise context and further-reading links.
            </p>
          </div>
        </div>

        <Divider className="my-12" />

        {/* tabs */}
        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Tamil literary and cultural heritage topics">
          {TAMIL_SECTIONS.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={active === s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                'focusable rounded-full border px-5 py-2.5 text-sm font-medium transition-all',
                active === s.id
                  ? 'border-[#087F8C] bg-[#087F8C] text-white shadow-[0_12px_26px_-18px_rgba(8,127,140,.9)]'
                  : 'border-[#087F8C]/35 bg-white/65 text-[#1F4A4F] hover:border-[#087F8C]',
              )}
            >
              {s.title}
            </button>
          ))}
        </div>

        <Card key={item.id} className="anim-rise relative mt-8 overflow-hidden p-7 sm:p-10">
          <LotusCorner className="absolute left-0 top-0 h-16 w-16" />
          <LotusCorner className="absolute right-0 top-0 h-16 w-16" flip />
          <div className="grid gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-[#0A5F69]">{item.kicker}</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#53281F]">{item.title}</h2>
              {item.tamil && <p className="tamil mt-2 text-2xl text-[#792E3A]">{item.tamil}</p>}
              <div className="mt-5 space-y-4">
                {item.body.map((p, i) => (
                  <p key={i} className="font-[family-name:var(--font-serif)] text-[18px] leading-relaxed text-[#4A3613]">{p}</p>
                ))}
              </div>
              <div className="mt-6 flex gap-3 rounded-xl border border-[#D8A642]/50 bg-[#F4A623]/10 p-4">
                <Info size={18} className="mt-0.5 shrink-0 text-[#B4761B]" />
                <p className="text-sm leading-relaxed text-[#6B553A]"><strong className="text-[#8A5A12]">Source note. </strong>{item.note}</p>
              </div>
            </div>
            <PalmLeaf title={item.tamil ?? item.title} />
          </div>
        </Card>
      </Section>

      {/* comparative reading */}
      <div className="bg-[linear-gradient(180deg,#EFDCBA,#F7EAD2)]">
        <Section>
          <SectionTitle
            kicker="Comparative reading"
            title="Reading the same passage across languages"
            intro="A side-by-side interface for source text, transliteration, translation and context — demonstrated with the Gītā passages that could be verified for this build."
          />
          <Card className="mt-9 overflow-hidden p-0">
            <div className="flex flex-wrap gap-2 border-b border-[#D8A642]/40 bg-[#FFF8E8]/70 p-3">
              {VERSES.map((x, i) => (
                <button
                  key={x.ref}
                  onClick={() => setVerse(i)}
                  className={cn('focusable rounded-full px-4 py-2 text-xs font-semibold', verse === i ? 'bg-[#D8A642] text-[#4A1C10]' : 'text-[#8A5A12] hover:bg-[#F4A623]/15')}
                >
                  {x.ref}
                </button>
              ))}
            </div>
            <div className="grid divide-[#D8A642]/35 md:grid-cols-3 md:divide-x">
              <div className="p-6">
                <h4 className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#8A5A12]">Sanskrit source</h4>
                <p className="deva mt-3 whitespace-pre-line text-lg text-[#792E3A]">{v.sanskrit}</p>
                <h4 className="mt-5 text-[11px] font-semibold uppercase tracking-[.16em] text-[#8A5A12]">Transliteration</h4>
                <p className="mt-2 whitespace-pre-line font-[family-name:var(--font-serif)] italic text-[#6B553A]">{v.translit}</p>
              </div>
              <div className="p-6">
                <h4 className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#8A5A12]">English explanation</h4>
                <p className="mt-3 font-[family-name:var(--font-serif)] text-[17px] leading-relaxed text-[#4A3613]">“{v.translation}”</p>
                <p className="mt-3 text-[12px] text-[#7A5B33]">{v.translator}</p>
              </div>
              <div className="p-6">
                <h4 className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#8A5A12]">Literary context</h4>
                <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">{v.context}</p>
                <div className="mt-4 rounded-lg border border-[#087F8C]/30 bg-[#087F8C]/8 p-3">
                  <p className="text-[13px] leading-relaxed text-[#1F4A4F]">{v.application}</p>
                </div>
              </div>
            </div>
          </Card>
          <Card className="mt-5 p-5">
            <div className="flex gap-3">
              <Columns2 size={18} className="mt-0.5 shrink-0 text-[#0A5F69]" />
              <p className="text-sm leading-relaxed text-[#6B553A]"><strong className="text-[#792E3A]">Why no Tamil column here. </strong>{COMPARATIVE_NOTE}</p>
            </div>
          </Card>
        </Section>
      </div>

      {/* references */}
      <div className="parchment">
        <Section>
          <SectionTitle
            kicker="References & further reading"
            title="Explore the sources"
            intro="A short, curated starting point for checking the epic text, Gītā verses, Tamil literary resources, and performance traditions."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {HERITAGE_REFERENCES.map((ref) => (
              <Card key={ref.title} className="p-5 sm:p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#0A5F69]">{ref.area}</p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg leading-snug text-[#53281F]">{ref.title}</h3>
                <p className="mt-1 text-xs font-medium text-[#8A5A12]">{ref.institution}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">{ref.description}</p>
                <a href={ref.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#087F8C] underline underline-offset-4 hover:text-[#1F4A4F]">Visit source ↗</a>
              </Card>
            ))}
          </div>
          <p className="mt-5 text-xs leading-relaxed text-[#7A5B33]">Editorial note: these links are further-reading resources. Their inclusion does not mean every question or interpretation in VYŪHA was derived from them. For a specific claim, consult the cited work and record the relevant passage or page.</p>
        </Section>
      </div>

      {/* classification table */}
      <div className="parchment">
        <Section>
          <SectionTitle kicker="Editorial standard" title="Four different kinds of relationship" intro="Treating all of these as the same thing is the most common error in popular accounts of the epic in Tamil." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { t: 'Direct adaptation', d: 'A Tamil work that retells the narrative in its own literary form — Villibhāratam is the principal example.', tone: 'maroon' as const },
              { t: 'Allusion', d: 'Tamil poetry that references epic figures or episodes without retelling them. An allusion is evidence of familiarity, not of adaptation.', tone: 'teal' as const },
              { t: 'Performance transmission', d: 'Forms such as Therukoothu, which carry episodes through enactment and reinterpret them in each performance.', tone: 'leaf' as const },
              { t: 'Later interpretation', d: 'Modern Tamil writers and scholars re-reading the epic through contemporary ethical, social and political questions.', tone: 'lotus' as const },
            ].map((x) => (
              <Card key={x.t} className="p-6">
                <Badge tone={x.tone}>{x.t}</Badge>
                <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">{x.d}</p>
              </Card>
            ))}
          </div>
          <Card className="mt-6 p-6">
            <p className="text-sm leading-relaxed text-[#6B553A]">
              <strong className="text-[#792E3A]">Honesty about this build. </strong>
              This exhibition provides an introduction, not a substitute for primary texts or specialist research. The
              references above are starting points; verify specific quotations, dates, and interpretations against the
              relevant edition or scholarly publication before citing them as evidence.
            </p>
          </Card>
        </Section>
      </div>
    </div>
  );
}

function PalmLeaf({ title }: { title: string }) {
  return (
    <div className="mx-auto w-full max-w-xs lg:w-64">
      <svg viewBox="0 0 260 340" className="w-full drop-shadow-[0_18px_30px_rgba(90,52,16,.25)]" aria-hidden>
        <defs>
          <linearGradient id="leafg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E7CE9E" />
            <stop offset="50%" stopColor="#D8B57F" />
            <stop offset="100%" stopColor="#C09A63" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 6} ${i * 10}) rotate(${i * 1.5} 130 170)`}>
            <rect x="18" y="22" width="224" height="288" rx="10" fill="url(#leafg)" stroke="#A9823F" strokeWidth="1.5" />
          </g>
        ))}
        <g stroke="#8A5A12" strokeWidth="1" opacity=".55">
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={i} x1="46" y1={76 + i * 20} x2="226" y2={76 + i * 20} strokeDasharray="3 7" />
          ))}
        </g>
        <circle cx="90" cy="178" r="9" fill="none" stroke="#8A5A12" />
        <circle cx="190" cy="178" r="9" fill="none" stroke="#8A5A12" />
        <text x="130" y="60" textAnchor="middle" className="tamil" fontSize="19" fill="#792E3A">{title}</text>
      </svg>
      <p className="mt-3 text-center text-[11px] text-[#7A5B33]">Illustration: a stylised palm-leaf manuscript bundle (ōlai), drawn for this project.</p>
    </div>
  );
}
