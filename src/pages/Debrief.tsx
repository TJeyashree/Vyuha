import { useMemo } from 'react';
import { RotateCcw, LayoutGrid, BookOpen, Sparkles, Shuffle } from 'lucide-react';
import { QUESTIONS } from '../data/questions';
import { CHAPTERS } from '../data/chapters';
import { DIMS } from '../data/types';
import { factorTally, isAnswered, type useJourney } from '../state/journey';
import { Badge, Button, Card } from '../components/ui';
import { Divider, Mandala } from '../components/Ornaments';

type J = ReturnType<typeof useJourney>;

export default function Debrief({
  journey, onReview, onMap, onRestart,
}: { journey: J; onReview: (n?: number) => void; onMap: () => void; onRestart: () => void }) {
  const { state, scores, answered } = journey;
  const factors = useMemo(() => factorTally(state.answers), [state.answers]);
  const revisions = useMemo(
    () => Object.entries(state.answers).filter(([, a]) => (a.changes ?? 0) > 0).map(([n, a]) => ({ n: Number(n), changes: a.changes! })),
    [state.answers],
  );
  const notes = useMemo(
    () => Object.entries(state.answers).filter(([, a]) => a.note?.trim() || a.text?.trim()).map(([n, a]) => ({ n: Number(n), text: (a.note || a.text || '').trim() })),
    [state.answers],
  );

  const ordered = [...DIMS].sort((a, b) => scores.pct[b.key] - scores.pct[a.key]);
  const strongest = ordered[0];
  const weakest = ordered[ordered.length - 1];

  const chapterProgress = CHAPTERS.map((c) => ({
    c,
    done: QUESTIONS.filter((q) => q.chapter === c.id && isAnswered(state.answers[q.n], q.kind)).length,
  }));

  const earlyDims = dimAverage(journey, 1, 25);
  const lateDims = dimAverage(journey, 26, 50);

  const reflections = [
    `Your most frequent stated influence was ${factors[0]?.[0] ?? 'not yet recorded'}. When has that influence served you badly?`,
    `Your answers leaned least towards ${weakest.label.toLowerCase()}. What would a decision look like if you deliberately led with it?`,
    revisions.length
      ? `You revised ${revisions.length} answer${revisions.length === 1 ? '' : 's'} (question${revisions.length === 1 ? '' : 's'} ${revisions.map((r) => r.n).join(', ')}). What made you willing to change there, and not elsewhere?`
      : 'You did not revise any answer. Was that conviction, or a reluctance to reopen a decision once made?',
  ];

  return (
    <div className="mx-auto max-w-5xl px-5 pb-28 pt-8">
      <div className="relative text-center">
        <Mandala className="mx-auto w-72 anim-spin-slow" opacity={0.26} />
        <h1 className="mt-[-3.5rem] font-[family-name:var(--font-display)] text-4xl text-[#5A3410] sm:text-5xl">Your Journey Through VYŪHA</h1>
        <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-serif)] text-lg text-[#6B4A24]">
          A learning report built only from the {answered.length} response{answered.length === 1 ? '' : 's'} you actually recorded.
        </p>
      </div>

      {answered.length < 50 && (
        <Card className="mt-8 border-[#C94735]/40 p-5">
          <p className="text-sm text-[#A33A2B]">
            You have answered {answered.length} of 50 questions. This report describes only those answers — gaps are not
            scored, guessed or filled in.
          </p>
        </Card>
      )}

      {/* dimensions dashboard */}
      <Card className="mt-8 p-6 sm:p-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#5A3410]">Learning observations</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#6B553A]">
          Each option in VYŪHA was authored with an emphasis on certain considerations. The percentages below show how
          much of the available emphasis you selected in each category, across the multiple-choice questions you answered.
          <strong className="text-[#792E3A]"> This is a description of the options you picked — not a validated psychological
          measure, and not a judgement of your character.</strong>
        </p>
        <div className="mt-6 space-y-4">
          {ordered.map((d) => (
            <div key={d.key}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-semibold" style={{ color: d.color }}>{d.label}</span>
                <span className="text-xs text-[#7A5B33]">{scores.pct[d.key]}% of available emphasis</span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#E9D9B6]">
                <div className="h-full rounded-full transition-[width] duration-1000" style={{ width: `${scores.pct[d.key]}%`, background: `linear-gradient(90deg, ${d.color}aa, ${d.color})` }} />
              </div>
              <p className="mt-1 text-[12px] text-[#7A5B33]">{d.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#5A3410]">Your stated influences</h3>
          {factors.length === 0 ? (
            <p className="mt-3 text-sm text-[#7A5B33]">You did not record any reasoning factors. The reasoning prompt appears after key decisions.</p>
          ) : (
            <ul className="mt-4 space-y-2.5">
              {factors.map(([f, n]) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="w-48 shrink-0 text-sm text-[#5A4028]">{f}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E9D9B6]">
                    <div className="h-full rounded-full bg-[linear-gradient(90deg,#087F8C,#1769AA)]" style={{ width: `${(n / factors[0][1]) * 100}%` }} />
                  </div>
                  <span className="w-6 text-right text-xs text-[#7A5B33]">{n}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#5A3410]">How your reasoning moved</h3>
          <p className="mt-2 text-sm text-[#6B553A]">Comparing the first half of the journey (Q1–25) with the second (Q26–50).</p>
          <ul className="mt-4 space-y-2">
            {DIMS.map((d) => {
              const delta = lateDims[d.key] - earlyDims[d.key];
              return (
                <li key={d.key} className="flex items-center justify-between gap-3 border-b border-[#D8A642]/25 pb-1.5 text-sm">
                  <span className="text-[#5A4028]">{d.label}</span>
                  <span className={delta > 0 ? 'text-[#42582F]' : delta < 0 ? 'text-[#A33A2B]' : 'text-[#7A5B33]'}>
                    {delta > 0 ? '▲ increased' : delta < 0 ? '▼ decreased' : '— unchanged'}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-[12px] text-[#7A5B33]">Direction only; with a small number of questions these shifts are suggestive, not conclusive.</p>
        </Card>
      </div>

      {/* decision path */}
      <Card className="mt-6 p-6 sm:p-8">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-[#5A3410]">Your decision path</h3>
        <div className="mt-5 space-y-3">
          {chapterProgress.map(({ c, done }) => (
            <div key={c.id} className="flex items-center gap-3">
              <span className="w-8 font-[family-name:var(--font-display)] text-sm" style={{ color: c.palette.accent }}>{String(c.id).padStart(2, '0')}</span>
              <span className="min-w-0 flex-1 truncate text-sm text-[#5A4028]">{c.title}</span>
              <span className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="h-2.5 w-6 rounded-full" style={{ background: i < done ? c.palette.accent : '#E9D9B6' }} />
                ))}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* overlooked + gita */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#5A3410]">What you may have under-weighted</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">
            Your selections emphasised <strong style={{ color: strongest.color }}>{strongest.label.toLowerCase()}</strong> most
            and <strong style={{ color: weakest.color }}>{weakest.label.toLowerCase()}</strong> least. That is not a fault —
            but a decision-maker who consistently leads with one consideration will eventually meet a situation it does not fit.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">
            Deliberately run your next real decision through the dimension you used least, and see whether the answer changes.
            If it does not, your judgement is more robust than before. If it does, you have found something worth knowing.
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#5A3410]">Gītā themes you encountered</h3>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#6B553A]">
            <li><strong className="text-[#8A5A12]">2.47</strong> — attention to the action you control rather than the result you do not.</li>
            <li><strong className="text-[#8A5A12]">2.48</strong> — samatva: evaluating the reasoning separately from the outcome.</li>
            <li><strong className="text-[#8A5A12]">3.19</strong> — withdrawal is itself an act, and must be justified as one.</li>
          </ul>
          <p className="mt-3 text-[12px] text-[#7A5B33]">These are VYŪHA’s educational applications of the verses, clearly distinguished from the text itself on the Krishna’s Guidance panels.</p>
        </Card>
      </div>

      {notes.length > 0 && (
        <Card className="mt-6 p-6">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#5A3410]">In your own words</h3>
          <div className="mt-4 space-y-3">
            {notes.map((n) => (
              <blockquote key={n.n} className="rounded-xl border-l-4 border-[#D8A642] bg-[#F4A623]/8 p-4">
                <span className="text-[11px] font-semibold uppercase tracking-[.16em] text-[#8A5A12]">Question {n.n}</span>
                <p className="mt-1 font-[family-name:var(--font-serif)] text-[17px] leading-relaxed text-[#5A3410]">“{n.text}”</p>
              </blockquote>
            ))}
          </div>
        </Card>
      )}

      <Card className="mt-6 p-6 sm:p-8">
        <Badge tone="lotus">Three reflection questions for you</Badge>
        <ol className="mt-4 space-y-4">
          {reflections.map((r, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-[family-name:var(--font-display)] text-2xl text-[#D8A642]">{i + 1}</span>
              <p className="font-[family-name:var(--font-serif)] text-[17px] leading-relaxed text-[#5A3410]">{r}</p>
            </li>
          ))}
        </ol>
      </Card>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button variant="secondary" onClick={() => onReview(1)}><BookOpen size={15} /> Review all 50 questions</Button>
        <Button variant="secondary" onClick={onMap}><LayoutGrid size={15} /> Explore an alternative path</Button>
        <Button variant="secondary" onClick={() => onReview(36)}><Shuffle size={15} /> Re-examine the consequences chapter</Button>
        <Button variant="teal" onClick={() => onReview(31)}><Sparkles size={15} /> Revisit Krishna’s guidance</Button>
        <Button onClick={onRestart}><RotateCcw size={15} /> Restart the journey</Button>
      </div>

      <Divider className="my-10" />
      <p className="mx-auto max-w-3xl text-center font-[family-name:var(--font-serif)] text-xl italic leading-relaxed text-[#5A3410] sm:text-2xl">
        “The true measure of a decision is not whether uncertainty disappears, but whether we learn to reason thoughtfully
        in its presence.”
      </p>
    </div>
  );
}



function dimAverage(journey: J, from: number, to: number) {
  const out: Record<string, number> = {};
  for (const d of DIMS) out[d.key] = 0;
  for (const q of QUESTIONS) {
    if (q.n < from || q.n > to || !q.options) continue;
    const a = journey.state.answers[q.n];
    const opt = q.options.find((o) => o.id === a?.choice);
    if (!opt) continue;
    for (const d of DIMS) out[d.key] += opt.scores[d.key] ?? 0;
  }
  return out as Record<(typeof DIMS)[number]['key'], number>;
}
