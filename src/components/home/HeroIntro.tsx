import type { SiteConfig } from '@/lib/config';

export default function HeroIntro({
  author,
  description,
}: {
  author: SiteConfig['author'];
  description: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-[rgba(182,67,61,0.14)] bg-[linear-gradient(135deg,rgba(255,253,249,0.92),rgba(247,227,222,0.92))] p-8 shadow-[0_24px_60px_rgba(79,29,26,0.08)] sm:p-10">
      <div className="absolute -top-12 right-0 h-44 w-44 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-[#c98b5f]/12 blur-3xl" />
      <div className="relative">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
          Redwood Scholar
        </p>
        <h1 className="max-w-3xl text-4xl font-serif font-bold leading-tight text-primary sm:text-5xl">
          Albert
          <span className="block text-[0.6em] font-sans font-medium tracking-normal text-neutral-600">
            Building research stories that feel precise, warm, and alive.
          </span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-700">
          {description || `${author.title} at ${author.institution}. This homepage blends papers, notes, and research signals into a site that feels more like a living lab notebook than a static academic profile.`}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="redwood-chip rounded-full px-4 py-2 text-accent">🧪 Research notes welcome</span>
          <span className="redwood-chip rounded-full px-4 py-2 text-accent">📐 Formula-friendly blog</span>
          <span className="redwood-chip rounded-full px-4 py-2 text-accent">🌱 Template-ready structure</span>
        </div>
      </div>
    </section>
  );
}
