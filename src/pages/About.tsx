import { ArrowRight, ShieldCheck, BookMarked, Accessibility, Database } from 'lucide-react';
import { Divider, Mandala, Section } from '../components/Ornaments';
import { Button, Card, SectionTitle } from '../components/ui';
import type { Page } from '../nav-types';
import { HERITAGE_REFERENCES } from '../data/heritage';

export default function About({ go }: { go: (p: Page) => void }) {
  return (
    <div className="parchment pt-24">
      <Section>
        <SectionTitle
          kicker="About"
          title="What VYŪHA is — and what it is not"
          intro="A vyūha is a battlefield formation: an arrangement of commitments, each strength bought with a weakness elsewhere. That is also a fair description of a decision."
        />
        <Divider className="my-12" />
        <div className="relative grid gap-5 md:grid-cols-2">
          <div className="pointer-events-none absolute -right-36 top-10 hidden w-[24rem] lg:block">
            <Mandala className="anim-spin-slow w-full" opacity={0.14} />
          </div>
          {[
            { icon: BookMarked, t: 'An educational instrument', d: 'VYŪHA uses the dilemmas of the Mahābhārata to make decision-making practisable. It is not a religious text, a commentary, or a substitute for studying the epic itself.' },
            { icon: ShieldCheck, t: 'Honest about sources', d: 'Every scenario is labelled as epic-grounded, educational hypothetical, or modern parallel. No quotation, date or attribution has been invented, and gaps are declared rather than filled.' },
            { icon: Database, t: 'Entirely client-side', d: 'There is no backend and no account. Your answers live in this browser tab’s session storage and are cleared when the tab closes. Nothing is transmitted anywhere.' },
            { icon: Accessibility, t: 'Built to be usable', d: 'Keyboard-operable controls, visible focus rings, a motion toggle in the navigation bar, respect for the operating system’s reduced-motion setting, and layouts that work down to small phones.' },
          ].map((x) => (
            <Card key={x.t} className="p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-[#D8A642]/50 bg-[#F4A623]/12 text-[#B4761B]"><x.icon size={19} /></span>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl text-[#5A3410]">{x.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B553A]">{x.d}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-6 p-6 sm:p-8">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#5A3410]">On representing the epic respectfully</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">
            Krishna and Arjuna are depicted here in stylised illustration, in the posture the text describes — the
            charioteer and the archer, between two armies at dawn. They are not caricatured, gamified, or used as
            mascots. The Gītā passages appear with Sanskrit, transliteration, an identified translation, chapter and
            verse references, and a clearly separated educational application. Where the commentarial tradition
            disagrees, VYŪHA says so rather than choosing for the learner.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">
            Equally, the platform does not pretend that a dilemma this old has a calculable answer. There is no score of
            correctness anywhere in the Arena. The indicators in the consequence panels describe what an option
            emphasises inside this project’s own authored scheme, and are explicitly labelled as such.
          </p>
        </Card>

        <Card className="mt-6 p-6 sm:p-8">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#5A3410]">How the learning report works</h3>
          <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">The report uses predefined scores attached to selected answer options to summarise six learning dimensions. It also compares responses across parts of the journey and offers reflection prompts. These percentages describe the choices recorded within VYŪHA; they are not scientifically validated measurements of personality, intelligence, or decision-making ability. Consequences and educational interpretations are authored content, not guaranteed predictions.</p>
          <p className="mt-3 text-sm leading-relaxed text-[#6B553A]">Questions labelled as epic-grounded, educational hypothetical, or modern parallel serve different purposes. The label identifies the type of scenario; it does not by itself prove that every interpretation or scoring choice is supported by a primary text.</p>
        </Card>

        <Card className="mt-6 p-6 sm:p-8">
          <h3 className="font-[family-name:var(--font-display)] text-xl text-[#5A3410]">References & further reading</h3>
          <div className="mt-4 space-y-4">
            {HERITAGE_REFERENCES.map((ref) => (
              <div key={ref.title} className="border-b border-[#D8A642]/25 pb-4 last:border-0 last:pb-0">
                <a href={ref.url} target="_blank" rel="noreferrer" className="font-semibold text-[#087F8C] underline underline-offset-4 hover:text-[#1F4A4F]">{ref.title} ↗</a>
                <p className="mt-1 text-xs font-medium text-[#8A5A12]">{ref.institution} · {ref.area}</p>
                <p className="mt-1 text-sm leading-relaxed text-[#6B553A]">{ref.description}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-[#7A5B33]">These are curated further-reading resources, not a claim that each one was used to write every question. Specific claims should be checked against the relevant passage, edition, or page.</p>
        </Card>

        <div className="mt-10 text-center">
          <Button onClick={() => go('arena')}>Enter the Decision Arena <ArrowRight size={16} /></Button>
        </div>
      </Section>
    </div>
  );
}
