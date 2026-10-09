import { Search, ScanSearch, Scale, Flag, RefreshCw, ArrowRight } from 'lucide-react';
import { Divider, LotusCorner, Mandala, Section } from '../components/Ornaments';
import { Badge, Button, Card, SectionTitle } from '../components/ui';
import { VERSES } from '../data/heritage';
import type { Page } from '../nav-types';

const STAGES = [
  { n: 1, key: 'IDENTIFY', icon: Search, color: '#C94735', line: 'Define the decision and its context.', body: 'State the actual decision in one sentence. Name who must decide, by when, and what is genuinely at stake. Most poor decisions are poorly framed before they are poorly made.', epic: 'Arjuna asks to be driven between the armies — he insists on seeing the decision before making it.' },
  { n: 2, key: 'INVESTIGATE', icon: ScanSearch, color: '#087F8C', line: 'Separate facts, assumptions and missing information.', body: 'Sort what you know from what you believe. Ask which missing piece of information would most change your action — and whether it can be obtained in time.', epic: 'The epic is full of partial reports, ambiguous oaths and contested claims. Certainty is rarely available to anyone in it.' },
  { n: 3, key: 'EVALUATE', icon: Scale, color: '#1769AA', line: 'Compare options, risks, stakeholders and consequences.', body: 'Generate at least three options, including the one you dislike. For each: who benefits, who pays, what is reversible, and what happens over a longer horizon.', epic: 'Vyūhas — battle formations — are literally the arrangement of trade-offs: strength here purchased with weakness there.' },
  { n: 4, key: 'DECIDE', icon: Flag, color: '#B4761B', line: 'Select an approach and explain the reasoning.', body: 'Commit, and record the reasoning before the outcome is known. State what would have changed your mind. A decision without a stated reason cannot be learned from.', epic: 'The Gītā’s concern is not only what Arjuna does, but the state of mind and reasoning from which he acts.' },
  { n: 5, key: 'REFLECT', icon: RefreshCw, color: '#668653', line: 'Reassess the choice and identify transferable lessons.', body: 'Judge the reasoning separately from the result. Ask what you under-weighted, who absorbed costs you did not see, and what rule you will carry into the next decision.', epic: 'The epic’s final books are themselves a long reflection on the cost of the war that was won.' },
];

export default function Framework({ go }: { go: (p: Page) => void }) {
  return (
    <div className="parchment pt-24">
      <Section>
        <SectionTitle
          kicker="Methodology"
          title="The VYŪHA Learning Framework"
          intro="The Mahābhārata supplies dilemmas rich enough to resist easy answers. The framework supplies a repeatable method you can apply to decisions that have nothing to do with a battlefield."
        />
        <Divider className="my-12" />

        <div className="relative space-y-5">
          <div className="pointer-events-none absolute -left-40 top-20 hidden w-[26rem] lg:block">
            <Mandala className="anim-spin-slow w-full" opacity={0.15} />
          </div>
          {STAGES.map((s) => (
            <Card key={s.key} className="relative overflow-hidden p-6 sm:p-8">
              <LotusCorner className="absolute right-0 top-0 h-14 w-14 rotate-90" />
              <div className="grid gap-5 sm:grid-cols-[auto_1fr]">
                <div className="flex items-center gap-4 sm:flex-col sm:items-start">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border" style={{ borderColor: `${s.color}66`, background: `${s.color}14`, color: s.color }}>
                    <s.icon size={22} />
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-3xl" style={{ color: `${s.color}66` }}>{String(s.n).padStart(2, '0')}</span>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-wide" style={{ color: s.color }}>{s.key}</h3>
                  <p className="mt-1 font-[family-name:var(--font-serif)] text-lg text-[#5A3410]">{s.line}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">{s.body}</p>
                  <p className="mt-3 border-l-2 border-[#D8A642] pl-3 text-[13px] italic leading-relaxed text-[#7A5B33]">{s.epic}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-10 p-6 sm:p-8">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#5A3410]">Why an epic, and not a textbook case?</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">
            A textbook case usually has a defensible answer the author already knows. The Mahābhārata does not: its own
            characters, commentators and regional retellings have disagreed about Kurukshetra for centuries. That
            disagreement is pedagogically useful. It forces the learner to defend a position rather than locate one.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">
            VYŪHA therefore never scores an answer as correct. It records what you chose, shows what the choice
            prioritises and costs, and returns that record to you at the end.
          </p>
        </Card>
      </Section>

      {/* ── KRISHNA'S GUIDANCE ── */}
      <div id="guidance" className="relative overflow-hidden bg-[linear-gradient(180deg,#FFFBEC,#FBE9BE_55%,#F4C76A)]">
        <Section>
          <div className="text-center">
            <Badge tone="gold">Chapter 7 of the Arena introduces this layer</Badge>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl text-[#5A3410] sm:text-4xl">Krishna’s Guidance</h2>
            <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-serif)] text-lg leading-relaxed text-[#6B4A24]">
              The dialogue of the chariot is introduced only after you have formed your own position — so that it
              functions as a challenge to your reasoning rather than an instruction to copy.
            </p>
          </div>
          <Divider className="my-10" />
          <div className="space-y-6">
            {VERSES.map((v) => (
              <Card key={v.ref} className="relative overflow-hidden p-6 sm:p-8">
                <LotusCorner className="absolute left-0 top-0 h-14 w-14" />
                <LotusCorner className="absolute right-0 top-0 h-14 w-14" flip />
                <h3 className="text-center font-[family-name:var(--font-display)] text-xl text-[#8A5A12]">{v.ref}</h3>
                <p className="deva mt-5 whitespace-pre-line text-center text-xl text-[#792E3A] sm:text-2xl">{v.sanskrit}</p>
                <p className="mt-4 whitespace-pre-line text-center font-[family-name:var(--font-serif)] text-[17px] italic text-[#6B553A]">{v.translit}</p>
                <Divider className="my-6" />
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <h4 className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#8A5A12]">Translation</h4>
                    <p className="mt-1.5 font-[family-name:var(--font-serif)] text-[17px] leading-relaxed text-[#4A3613]">“{v.translation}”</p>
                    <p className="mt-2 text-[12px] text-[#7A5B33]">{v.translator}</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#8A5A12]">Context in the text</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#6B553A]">{v.context}</p>
                    </div>
                    <div className="rounded-xl border border-[#087F8C]/35 bg-[#087F8C]/8 p-4">
                      <h4 className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#0A5F69]">VYŪHA’s learning application (not part of the text)</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#1F4A4F]">{v.application}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Card className="mt-6 p-6">
            <p className="text-sm leading-relaxed text-[#6B553A]">
              <strong className="text-[#792E3A]">A caution on interpretation.</strong> The Gītā has a two-thousand-year
              commentarial history in which these verses are read in materially different ways. VYŪHA does not adjudicate
              between those readings, does not reduce the teaching to “always act” or “always detach”, and does not
              attribute modern management concepts to Krishna. Learners are encouraged to consult a scholarly translation
              directly.
            </p>
          </Card>
          <div className="mt-10 text-center">
            <Button onClick={() => go('arena')}>Practise this in the Arena <ArrowRight size={16} /></Button>
          </div>
        </Section>
      </div>
    </div>
  );
}
