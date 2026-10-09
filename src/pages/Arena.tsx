import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Check, LayoutGrid, Link2, ListOrdered, PenLine,
  CheckSquare, Scale, Sparkles, AlertTriangle, Users, Clock, Shield, Repeat,
} from 'lucide-react';
import { QUESTIONS } from '../data/questions';
import { CHAPTERS, REASON_FACTORS } from '../data/chapters';
import { SOURCE_LABEL, type Question } from '../data/types';
import { isAnswered, type Answer } from '../state/journey';
import { Badge, Button, Card, Progress } from '../components/ui';
import { Divider, LotusCorner, Mandala } from '../components/Ornaments';
import { cn } from '../utils/cn';
import Debrief from './Debrief';
import type { useJourney } from '../state/journey';

type J = ReturnType<typeof useJourney>;

const KIND_META: Record<string, { label: string; icon: typeof Scale }> = {
  choice: { label: 'Strategic choice', icon: Scale },
  compare: { label: 'Trade-off comparison', icon: Repeat },
  rank: { label: 'Ranked priorities', icon: ListOrdered },
  multi: { label: 'Select what applies', icon: CheckSquare },
  text: { label: 'Written reasoning', icon: PenLine },
};

export default function Arena({ journey }: { journey: J }) {
  const { state, setAnswer, goto, answered, reset } = journey;
  const [view, setView] = useState<'intro' | 'map' | 'q' | 'debrief'>(answered.length ? 'q' : 'intro');
  const topRef = useRef<HTMLDivElement>(null);

  const q = QUESTIONS[state.current - 1];
  const chapter = CHAPTERS[q.chapter - 1];
  const done = answered.length;

  useEffect(() => {
    topRef.current?.scrollIntoView({ block: 'start' });
  }, [state.current, view]);

  return (
    <div
      className="min-h-screen pt-24 transition-[background] duration-1000"
      style={{ background: `linear-gradient(180deg, ${chapter.palette.from}, ${chapter.palette.via} 55%, ${chapter.palette.to})` }}
    >
      <div ref={topRef} />
      {view === 'intro' && <Intro onStart={() => setView('q')} onMap={() => setView('map')} />}
      {view === 'map' && (
        <ChapterMap journey={journey} onPick={(n) => { goto(n); setView('q'); }} onBack={() => setView(done ? 'q' : 'intro')} />
      )}
      {view === 'debrief' && <Debrief journey={journey} onReview={(n = 1) => { goto(n); setView('q'); }} onMap={() => setView('map')} onRestart={() => { reset(); setView('intro'); }} />}
      {view === 'q' && (
        <QuestionView
          q={q}
          answer={state.answers[q.n]}
          allAnswers={state.answers}
          done={done}
          setAnswer={(p) => setAnswer(q.n, p)}
          onPrev={() => goto(q.n - 1)}
          onNext={() => (q.n === 50 ? setView('debrief') : goto(q.n + 1))}
          onMap={() => setView('map')}
        />
      )}
    </div>
  );
}

/* ───────────────────────── Intro ───────────────────────── */
function Intro({ onStart, onMap }: { onStart: () => void; onMap: () => void }) {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-10 text-center">
      <Mandala className="mx-auto w-64 anim-spin-slow" opacity={0.3} />
      <h1 className="anim-rise mt-[-3rem] font-[family-name:var(--font-display)] text-4xl text-[#5A3410] sm:text-5xl">The Decision Arena</h1>
      <p className="anim-rise mx-auto mt-5 max-w-2xl font-[family-name:var(--font-serif)] text-xl leading-relaxed text-[#6B4A24]">
        Fifty decisions across ten chapters. There is no scoreboard of right answers here — only the record of
        how you reasoned, and what that record shows you afterwards.
      </p>
      <Card className="mx-auto mt-10 max-w-2xl p-7 text-left">
        <h2 className="font-[family-name:var(--font-display)] text-xl text-[#5A3410]">Before you begin</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#6B553A]">
          <li className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-[#668653]" /> Every question is numbered and belongs to a chapter. You may move backwards and change any answer.</li>
          <li className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-[#668653]" /> Some questions refer back to earlier decisions and respond to what you actually chose.</li>
          <li className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-[#668653]" /> Content is labelled: epic source, educational hypothetical, or modern parallel. Nothing invented is presented as scripture.</li>
          <li className="flex gap-3"><Check size={16} className="mt-0.5 shrink-0 text-[#668653]" /> Progress is saved in this browser tab only (session storage). Closing the tab clears it.</li>
        </ul>
      </Card>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={onStart}>Begin at Question 1 <ArrowRight size={16} /></Button>
        <Button variant="secondary" onClick={onMap}><LayoutGrid size={16} /> Chapter overview</Button>
      </div>
    </div>
  );
}

/* ───────────────────────── Chapter map ───────────────────────── */
function ChapterMap({ journey, onPick, onBack }: { journey: J; onPick: (n: number) => void; onBack: () => void }) {
  const { state, answered } = journey;
  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-[#5A3410]">Chapter overview</h1>
        <Button variant="secondary" onClick={onBack}><ArrowLeft size={16} /> Back</Button>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-[#6B553A]">{answered.length} of 50 questions answered. Green marks completed, gold marks your current position, outlined marks upcoming.</p>
      <div className="mt-8 space-y-4">
        {CHAPTERS.map((c) => {
          const qs = QUESTIONS.filter((q) => q.chapter === c.id);
          const count = qs.filter((q) => answered.includes(q.n)).length;
          return (
            <Card key={c.id} className="p-5">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="font-[family-name:var(--font-display)] text-2xl" style={{ color: c.palette.accent }}>{String(c.id).padStart(2, '0')}</span>
                <div className="min-w-[12rem] flex-1">
                  <h2 className="font-[family-name:var(--font-display)] text-lg text-[#5A3410]">{c.title}</h2>
                  <p className="text-xs text-[#7A5B33]">{c.subtitle}</p>
                </div>
                <Badge tone={count === 5 ? 'leaf' : 'gold'}>{count}/5 complete</Badge>
                <div className="flex gap-2">
                  {qs.map((q) => {
                    const isDone = answered.includes(q.n);
                    const isCur = state.current === q.n;
                    return (
                      <button
                        key={q.n}
                        onClick={() => onPick(q.n)}
                        aria-label={`Go to question ${q.n}`}
                        className={cn(
                          'focusable h-9 w-9 rounded-lg border text-xs font-semibold transition-all hover:-translate-y-0.5',
                          isCur ? 'border-[#B4761B] bg-[#F4A623] text-[#4A1C10]'
                            : isDone ? 'border-[#668653] bg-[#668653]/18 text-[#42582F]'
                              : 'border-[#D8A642]/50 bg-white/55 text-[#8A5A12]',
                        )}
                      >
                        {q.n}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────── Question view ───────────────────────── */
function QuestionView({
  q, answer, allAnswers, done, setAnswer, onPrev, onNext, onMap,
}: {
  q: Question; answer?: Answer; allAnswers: Record<number, Answer>; done: number;
  setAnswer: (p: Partial<Answer>) => void; onPrev: () => void; onNext: () => void; onMap: () => void;
}) {
  const chapter = CHAPTERS[q.chapter - 1];
  const meta = KIND_META[q.kind];
  const complete = isAnswered(answer, q.kind);
  const chosen = q.options?.find((o) => o.id === answer?.choice);

  const backLink = useMemo(() => {
    if (!q.linkBack) return null;
    const prevQ = QUESTIONS[q.linkBack - 1];
    const prevA = allAnswers[q.linkBack];
    if (!prevA) return { q: prevQ, text: 'You have not yet answered this earlier question — your path here is unconditioned.' };
    const opt = prevQ.options?.find((o) => o.id === prevA.choice);
    return { q: prevQ, text: opt ? `You chose: “${opt.label}”. ${opt.consequence}` : prevA.text ? `You wrote: “${prevA.text.slice(0, 160)}”` : 'Your earlier response is recorded.' };
  }, [q, allAnswers]);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-28 pt-6 sm:px-6">
      {/* progress header */}
      <div className="card-ornate rounded-2xl p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-[family-name:var(--font-display)] text-lg text-[#5A3410]">Question {q.n} of 50</span>
          <span className="text-xs font-semibold uppercase tracking-[.16em]" style={{ color: chapter.palette.accent }}>
            Chapter {q.chapter} of 10 — {chapter.title}
          </span>
          <button onClick={onMap} className="focusable ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#D8A642]/50 px-3 py-1.5 text-xs font-semibold text-[#8A5A12] hover:bg-[#F4A623]/12">
            <LayoutGrid size={13} /> Chapters
          </button>
        </div>
        <div className="mt-3"><Progress value={(done / 50) * 100} label="Questions completed" /></div>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#7A5B33]">
          <span>{done} of 50 answered</span>
          <span className="inline-flex items-center gap-1.5"><meta.icon size={12} /> Learning dimension: {q.skill}</span>
        </div>
      </div>

      {/* chapter atmosphere strip */}
      <p className="mt-4 text-center font-[family-name:var(--font-serif)] text-[15px] italic text-[#5A3410]/70">{chapter.atmosphere}</p>

      {/* question card */}
      <Card key={q.n} className="anim-rise relative mt-5 overflow-hidden p-6 sm:p-9">
        <LotusCorner className="absolute left-0 top-0 h-14 w-14" />
        <LotusCorner className="absolute right-0 top-0 h-14 w-14" flip />
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={q.source === 'epic' ? 'maroon' : q.source === 'modern' ? 'teal' : 'gold'}>{SOURCE_LABEL[q.source]}</Badge>
          <Badge tone="lotus">{meta.label}</Badge>
        </div>

        {backLink && (
          <div className="mt-5 rounded-xl border-l-4 border-[#087F8C] bg-[#087F8C]/8 p-4">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.16em] text-[#0A5F69]">
              <Link2 size={13} /> Linked to Question {backLink.q.n}
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-[#1F4A4F]">{backLink.text}</p>
          </div>
        )}

        <p className="mt-5 font-[family-name:var(--font-serif)] text-[17px] leading-relaxed text-[#5A4028] sm:text-lg">{q.context}</p>
        <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl leading-snug text-[#5A3410] sm:text-[28px]">{q.prompt}</h2>

        <div className="mt-7">
          {(q.kind === 'choice' || q.kind === 'compare') && (
            <div className="space-y-3">
              {q.options!.map((o, i) => {
                const sel = answer?.choice === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => setAnswer({ choice: o.id })}
                    aria-pressed={sel}
                    className={cn(
                      'focusable w-full rounded-2xl border p-5 text-left transition-all duration-300',
                      sel ? 'border-[#B4761B] bg-[#F4A623]/16 shadow-[0_14px_30px_-22px_rgba(180,118,27,.9)]'
                        : 'border-[#D8A642]/40 bg-white/60 hover:-translate-y-0.5 hover:border-[#D8A642] hover:bg-white/85',
                    )}
                  >
                    <div className="flex gap-4">
                      <span className={cn('grid h-8 w-8 shrink-0 place-items-center rounded-lg border font-semibold', sel ? 'border-[#B4761B] bg-[#F4A623] text-[#4A1C10]' : 'border-[#D8A642]/60 text-[#8A5A12]')}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <div>
                        <p className="font-medium leading-snug text-[#4A3613]">{o.label}</p>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-[#7A5B33]"><span className="font-semibold text-[#8A5A12]">Trade-off: </span>{o.tradeoff}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {q.kind === 'multi' && <MultiSelect items={q.items!} value={answer?.multi ?? []} onChange={(v) => setAnswer({ multi: v })} />}
          {q.kind === 'rank' && <RankList items={q.items!} value={answer?.rank ?? []} onChange={(v) => setAnswer({ rank: v })} />}
          {q.kind === 'text' && (
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[.16em] text-[#8A5A12]" htmlFor={`t${q.n}`}>Your reasoning</label>
              <textarea
                id={`t${q.n}`}
                rows={5}
                value={answer?.text ?? ''}
                onChange={(e) => setAnswer({ text: e.target.value })}
                placeholder="Two or three sentences is enough. Write what you would actually say."
                className="focusable w-full rounded-xl border border-[#D8A642]/50 bg-white/75 p-4 font-[family-name:var(--font-serif)] text-[17px] leading-relaxed text-[#4A3613] placeholder:text-[#B09A74]"
              />
              {!complete && <p className="mt-2 text-xs text-[#A1743A]">Write at least a few words to continue. Nothing you write leaves this browser tab.</p>}
            </div>
          )}
        </div>
      </Card>

      {/* consequence */}
      {chosen && <ConsequencePanel q={q} optionId={chosen.id} />}
      {complete && !q.options && <TakeawayPanel q={q} answer={answer!} />}

      {/* reasoning */}
      {q.reason && complete && (
        <Card className="anim-rise mt-5 p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#5A3410]">What influenced your decision most?</h3>
          <p className="mt-1 text-sm text-[#7A5B33]">Choose up to three. These are collected for your final debrief.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {REASON_FACTORS.map((f) => {
              const sel = answer?.factors?.includes(f);
              return (
                <button
                  key={f}
                  aria-pressed={!!sel}
                  onClick={() => {
                    const cur = answer?.factors ?? [];
                    const next = sel ? cur.filter((x) => x !== f) : cur.length >= 3 ? cur : [...cur, f];
                    setAnswer({ factors: next });
                  }}
                  className={cn(
                    'focusable rounded-full border px-4 py-2 text-[13px] font-medium transition-all',
                    sel ? 'border-[#087F8C] bg-[#087F8C]/14 text-[#0A5F69]' : 'border-[#D8A642]/45 bg-white/60 text-[#6B553A] hover:border-[#D8A642]',
                  )}
                >
                  {f}
                </button>
              );
            })}
          </div>
          <textarea
            rows={3}
            value={answer?.note ?? ''}
            onChange={(e) => setAnswer({ note: e.target.value })}
            placeholder="Optional: explain your reasoning in a sentence."
            className="focusable mt-4 w-full rounded-xl border border-[#D8A642]/45 bg-white/70 p-3.5 text-[15px] text-[#4A3613] placeholder:text-[#B09A74]"
          />
        </Card>
      )}

      {/* nav */}
      <div className="sticky bottom-3 z-30 mt-6">
        <div className="card-ornate flex items-center gap-3 rounded-full px-3 py-2.5 shadow-[0_18px_40px_-26px_rgba(90,52,16,.9)]">
          <Button variant="ghost" className="px-4 py-2 text-xs" onClick={onPrev} disabled={q.n === 1}><ArrowLeft size={15} /> Back</Button>
          <span className="mx-auto text-[11px] font-semibold uppercase tracking-[.18em] text-[#8A5A12]">{complete ? 'Recorded' : 'Awaiting your decision'}</span>
          <Button className="px-5 py-2 text-xs" onClick={onNext} disabled={!complete}>
            {q.n === 50 ? 'See your debrief' : 'Continue'} <ArrowRight size={15} />
          </Button>
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] text-[#8A5A12]/80">
        {q.n === 50 ? 'The final debrief uses only the answers you actually recorded.' : 'You can return and change any answer; revisions are counted as part of your reasoning record.'}
      </p>
    </div>
  );
}

/* ───────────────────────── Interaction widgets ───────────────────────── */
function MultiSelect({ items, value, onChange }: { items: string[]; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      {items.map((it) => {
        const sel = value.includes(it);
        return (
          <button
            key={it}
            aria-pressed={sel}
            onClick={() => onChange(sel ? value.filter((x) => x !== it) : [...value, it])}
            className={cn(
              'focusable flex items-start gap-3 rounded-xl border p-4 text-left text-[15px] transition-all',
              sel ? 'border-[#668653] bg-[#668653]/12 text-[#3C512C]' : 'border-[#D8A642]/40 bg-white/60 text-[#5A4028] hover:border-[#D8A642]',
            )}
          >
            <span className={cn('mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded border', sel ? 'border-[#668653] bg-[#668653] text-white' : 'border-[#C9AA6A]')}>
              {sel && <Check size={13} />}
            </span>
            {it}
          </button>
        );
      })}
    </div>
  );
}

function RankList({ items, value, onChange }: { items: string[]; value: string[]; onChange: (v: string[]) => void }) {
  const ordered = [...value.filter((v) => items.includes(v)), ...items.filter((i) => !value.includes(i))];
  const move = (i: number, dir: -1 | 1) => {
    const next = [...ordered];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div>
      <p className="mb-3 text-xs text-[#8A5A12]">Use the arrows to order these. Position 1 is your highest priority. Confirm with the button below.</p>
      <ol className="space-y-2.5">
        {ordered.map((it, i) => (
          <li key={it} className={cn('flex items-center gap-3 rounded-xl border p-3.5 transition-colors', value.length ? 'border-[#D8A642] bg-[#F4A623]/10' : 'border-[#D8A642]/40 bg-white/60')}>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#D8A642]/25 font-[family-name:var(--font-display)] text-[#8A5A12]">{i + 1}</span>
            <span className="flex-1 text-[15px] text-[#4A3613]">{it}</span>
            <span className="flex gap-1">
              <button onClick={() => { move(i, -1); }} disabled={i === 0} aria-label={`Move ${it} up`} className="focusable rounded-md border border-[#D8A642]/50 px-2 py-1 text-xs text-[#8A5A12] disabled:opacity-30">↑</button>
              <button onClick={() => { move(i, 1); }} disabled={i === ordered.length - 1} aria-label={`Move ${it} down`} className="focusable rounded-md border border-[#D8A642]/50 px-2 py-1 text-xs text-[#8A5A12] disabled:opacity-30">↓</button>
            </span>
          </li>
        ))}
      </ol>
      {!value.length && (
        <Button variant="secondary" className="mt-4" onClick={() => onChange(ordered)}>Confirm this ranking</Button>
      )}
    </div>
  );
}

/* ───────────────────────── Consequence ───────────────────────── */
const INDICATORS = [
  { key: 'risk', label: 'Risk exposure', icon: AlertTriangle, invert: true },
  { key: 'evidence', label: 'Information confidence', icon: Shield, invert: false },
  { key: 'stakeholder', label: 'Stakeholder impact considered', icon: Users, invert: false },
  { key: 'longterm', label: 'Time horizon', icon: Clock, invert: false },
  { key: 'ethics', label: 'Ethical weight', icon: Scale, invert: false },
  { key: 'adaptability', label: 'Strategic flexibility', icon: Repeat, invert: false },
] as const;

function ConsequencePanel({ q, optionId }: { q: Question; optionId: string }) {
  const opt = q.options!.find((o) => o.id === optionId)!;
  const others = q.options!.filter((o) => o.id !== optionId);
  return (
    <Card className="anim-rise mt-5 overflow-hidden p-0">
      <div className="bg-[linear-gradient(100deg,#087F8C,#1769AA)] px-6 py-3 text-white">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.2em]"><Sparkles size={13} /> Consequence of your choice</span>
      </div>
      <div className="p-6 sm:p-7">
        <p className="font-[family-name:var(--font-serif)] text-lg leading-relaxed text-[#4A3613]">{opt.consequence}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#668653]/35 bg-[#668653]/8 p-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#42582F]">What this prioritises</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-[#4A3613]">{opt.label}</p>
          </div>
          <div className="rounded-xl border border-[#C94735]/35 bg-[#C94735]/8 p-4">
            <h4 className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#A33A2B]">Limitations and risks</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-[#4A3613]">{opt.tradeoff}</p>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#8A5A12]">Illustrative indicators for this option</h4>
          <p className="mt-1 text-[12px] leading-relaxed text-[#7A5B33]">
            These bars show only how strongly this option emphasises each consideration within VYŪHA’s own educational
            scheme. They are not measurements of correctness, morality or psychological traits.
          </p>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {INDICATORS.map((ind) => {
              const raw = opt.scores[ind.key] ?? 0;
              const pct = Math.max(6, Math.min(100, ((raw + 2) / 5) * 100));
              return (
                <div key={ind.key} className="flex items-center gap-3">
                  <ind.icon size={14} className="shrink-0 text-[#8A5A12]" />
                  <span className="w-[11.5rem] shrink-0 text-[12px] text-[#6B553A]">{ind.label}</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E4D2AC]">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,#D8A642,#F4A623)]" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Divider className="my-6" />
        <h4 className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#8A5A12]">An alternative perspective worth considering</h4>
        <ul className="mt-2 space-y-2">
          {others.map((o) => (
            <li key={o.id} className="rounded-lg border border-[#D8A642]/35 bg-white/55 p-3 text-sm leading-relaxed text-[#6B553A]">
              <span className="font-medium text-[#5A3410]">If instead “{o.label}” — </span>{o.consequence}
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-xl bg-[#F4A623]/12 p-4">
          <h4 className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#8A5A12]">Strategic takeaway</h4>
          <p className="mt-1.5 font-[family-name:var(--font-serif)] text-[17px] leading-relaxed text-[#5A3410]">{q.takeaway}</p>
        </div>
      </div>
    </Card>
  );
}

function TakeawayPanel({ q, answer }: { q: Question; answer: Answer }) {
  return (
    <Card className="anim-rise mt-5 p-6">
      <h4 className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#8A5A12]">Your response is recorded</h4>
      {answer.rank && <p className="mt-2 text-sm text-[#6B553A]">Your order: {answer.rank.map((r, i) => `${i + 1}. ${r}`).join('  ·  ')}</p>}
      {answer.multi && <p className="mt-2 text-sm text-[#6B553A]">You selected {answer.multi.length} item{answer.multi.length === 1 ? '' : 's'}: {answer.multi.join('; ')}</p>}
      {answer.text && <p className="mt-2 font-[family-name:var(--font-serif)] text-[16px] italic text-[#6B553A]">“{answer.text}”</p>}
      <div className="mt-4 rounded-xl bg-[#F4A623]/12 p-4">
        <h4 className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#8A5A12]">Strategic takeaway</h4>
        <p className="mt-1.5 font-[family-name:var(--font-serif)] text-[17px] leading-relaxed text-[#5A3410]">{q.takeaway}</p>
      </div>
    </Card>
  );
}
