import React from 'react';
import { cn } from '../utils/cn';

export function Button({
  children, variant = 'primary', className, ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'teal' }) {
  const base =
    'focusable inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-45';
  const styles = {
    primary:
      'text-[#4A1C10] bg-[linear-gradient(100deg,#F4A623,#FBD57E_45%,#D8A642)] shadow-[0_12px_28px_-14px_rgba(180,118,27,.9)] hover:shadow-[0_16px_34px_-12px_rgba(180,118,27,.95)] hover:-translate-y-0.5 border border-[#C8912F]',
    secondary:
      'text-[#1F4A4F] bg-white/70 border border-[#087F8C]/40 hover:bg-white hover:border-[#087F8C] hover:-translate-y-0.5',
    teal: 'text-white bg-[linear-gradient(100deg,#087F8C,#1769AA)] border border-[#07636E] hover:-translate-y-0.5 shadow-[0_12px_28px_-16px_rgba(8,127,140,.9)]',
    ghost: 'text-[#792E3A] hover:bg-[#792E3A]/8 border border-transparent',
  }[variant];
  return (
    <button className={cn(base, styles, className)} {...rest}>
      {children}
    </button>
  );
}

export function Badge({ children, tone = 'gold', className }: React.PropsWithChildren<{ tone?: 'gold' | 'teal' | 'maroon' | 'leaf' | 'lotus'; className?: string }>) {
  const tones = {
    gold: 'bg-[#F4A623]/15 text-[#8A5A12] border-[#D8A642]/50',
    teal: 'bg-[#087F8C]/12 text-[#0A5F69] border-[#087F8C]/40',
    maroon: 'bg-[#792E3A]/10 text-[#792E3A] border-[#792E3A]/35',
    leaf: 'bg-[#668653]/12 text-[#425B34] border-[#668653]/40',
    lotus: 'bg-[#E58AA8]/16 text-[#A3425F] border-[#E58AA8]/50',
  }[tone];
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[.14em]', tones, className)}>
      {children}
    </span>
  );
}

export function Card({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn('card-ornate rounded-2xl', className)}>{children}</div>;
}

export function Progress({ value, label }: { value: number; label?: string }) {
  return (
    <div className="w-full">
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#E4D2AC]" role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100} aria-label={label ?? 'Progress'}>
        <div className="h-full rounded-full bg-[linear-gradient(90deg,#087F8C,#F4A623_60%,#D8A642)] transition-[width] duration-700" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function SectionTitle({ kicker, title, intro, align = 'center' }: { kicker?: string; title: string; intro?: string; align?: 'center' | 'left' }) {
  return (
    <div className={cn('max-w-3xl', align === 'center' ? 'mx-auto text-center' : '')}>
      {kicker && <div className="mb-3 text-[11px] font-semibold uppercase tracking-[.3em] text-[#B4761B]">{kicker}</div>}
      <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-[#5A3410] sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 font-[family-name:var(--font-serif)] text-lg leading-relaxed text-[#6B553A]">{intro}</p>}
    </div>
  );
}
