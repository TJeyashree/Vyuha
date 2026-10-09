export type Dim =
  | 'evidence'
  | 'risk'
  | 'ethics'
  | 'longterm'
  | 'stakeholder'
  | 'adaptability';

export const DIMS: { key: Dim; label: string; desc: string; color: string }[] = [
  { key: 'evidence', label: 'Evidence-based reasoning', desc: 'Seeking facts, testing assumptions, naming what is unknown.', color: '#1769AA' },
  { key: 'risk', label: 'Risk awareness', desc: 'Noticing exposure, downside and irreversibility.', color: '#C94735' },
  { key: 'ethics', label: 'Ethical reflection', desc: 'Weighing duty, fairness, harm and values.', color: '#792E3A' },
  { key: 'longterm', label: 'Long-term thinking', desc: 'Looking beyond the immediate moment.', color: '#668653' },
  { key: 'stakeholder', label: 'Stakeholder consideration', desc: 'Accounting for everyone a decision touches.', color: '#087F8C' },
  { key: 'adaptability', label: 'Adaptability', desc: 'Revising judgement when circumstances change.', color: '#E58AA8' },
];

export type SourceKind = 'epic' | 'hypothetical' | 'modern';

export const SOURCE_LABEL: Record<SourceKind, string> = {
  epic: 'Grounded in the Mahābhārata / Bhagavad Gītā',
  hypothetical: 'Educational hypothetical inspired by the epic',
  modern: 'Contemporary parallel (modern application)',
};

export interface Option {
  id: string;
  label: string;
  tradeoff: string;
  consequence: string;
  scores: Partial<Record<Dim, number>>;
  /** optional branch note shown when a later question references this choice */
  tag?: string;
}

export type Kind = 'choice' | 'rank' | 'multi' | 'text' | 'compare';

export interface Question {
  n: number;
  chapter: number;
  kind: Kind;
  source: SourceKind;
  context: string;
  prompt: string;
  options?: Option[];
  items?: string[];
  takeaway: string;
  skill: string;
  /** links this question back to an earlier decision number */
  linkBack?: number;
  /** show the "what influenced you most" reasoning prompt */
  reason?: boolean;
}

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  atmosphere: string;
  palette: { from: string; via: string; to: string; accent: string; ink: string };
}
