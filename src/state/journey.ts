import { useCallback, useEffect, useMemo, useState } from 'react';
import { QUESTIONS } from '../data/questions';
import { DIMS, type Dim } from '../data/types';

export interface Answer {
  choice?: string;
  rank?: string[];
  multi?: string[];
  text?: string;
  factors?: string[];
  note?: string;
  changes?: number; // how many times this answer was revised
}

const KEY = 'vyuha-journey-v1';

export interface JourneyState {
  answers: Record<number, Answer>;
  current: number; // question number 1..50
  visited: number[];
}

const empty: JourneyState = { answers: {}, current: 1, visited: [1] };

function load(): JourneyState {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return empty;
    const p = JSON.parse(raw);
    if (p && typeof p === 'object' && p.answers) return { ...empty, ...p };
  } catch {
    /* session storage unavailable — progress simply will not persist */
  }
  return empty;
}

export function useJourney() {
  const [state, setState] = useState<JourneyState>(() => load());

  useEffect(() => {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  const setAnswer = useCallback((n: number, patch: Partial<Answer>) => {
    setState((s) => {
      const prev = s.answers[n] ?? {};
      const isChange = patch.choice !== undefined && prev.choice !== undefined && prev.choice !== patch.choice;
      return {
        ...s,
        answers: { ...s.answers, [n]: { ...prev, ...patch, changes: (prev.changes ?? 0) + (isChange ? 1 : 0) } },
      };
    });
  }, []);

  const goto = useCallback((n: number) => {
    const clamped = Math.min(50, Math.max(1, n));
    setState((s) => ({ ...s, current: clamped, visited: s.visited.includes(clamped) ? s.visited : [...s.visited, clamped] }));
  }, []);

  const reset = useCallback(() => setState({ ...empty, answers: {}, visited: [1] }), []);

  const answered = useMemo(() => {
    return QUESTIONS.filter((q) => isAnswered(state.answers[q.n], q.kind)).map((q) => q.n);
  }, [state.answers]);

  const scores = useMemo(() => computeScores(state.answers), [state.answers]);

  return { state, setAnswer, goto, reset, answered, scores };
}

export function isAnswered(a: Answer | undefined, kind: string): boolean {
  if (!a) return false;
  switch (kind) {
    case 'choice':
    case 'compare':
      return !!a.choice;
    case 'rank':
      return !!a.rank && a.rank.length > 0;
    case 'multi':
      return !!a.multi && a.multi.length > 0;
    case 'text':
      return !!a.text && a.text.trim().length > 3;
    default:
      return false;
  }
}

export function computeScores(answers: Record<number, Answer>) {
  const raw: Record<Dim, number> = { evidence: 0, risk: 0, ethics: 0, longterm: 0, stakeholder: 0, adaptability: 0 };
  const max: Record<Dim, number> = { evidence: 0, risk: 0, ethics: 0, longterm: 0, stakeholder: 0, adaptability: 0 };
  for (const q of QUESTIONS) {
    if (!q.options) continue;
    for (const d of DIMS) {
      const best = Math.max(0, ...q.options.map((o) => o.scores[d.key] ?? 0));
      max[d.key] += best;
    }
    const a = answers[q.n];
    if (!a?.choice) continue;
    const opt = q.options.find((o) => o.id === a.choice);
    if (!opt) continue;
    for (const d of DIMS) raw[d.key] += opt.scores[d.key] ?? 0;
  }
  const pct: Record<Dim, number> = { ...raw };
  for (const d of DIMS) pct[d.key] = max[d.key] ? Math.round((Math.max(0, raw[d.key]) / max[d.key]) * 100) : 0;
  return { raw, max, pct };
}

export function factorTally(answers: Record<number, Answer>) {
  const t: Record<string, number> = {};
  Object.values(answers).forEach((a) => a.factors?.forEach((f) => (t[f] = (t[f] ?? 0) + 1)));
  return Object.entries(t).sort((a, b) => b[1] - a[1]);
}
