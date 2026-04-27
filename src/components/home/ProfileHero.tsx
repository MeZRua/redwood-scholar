import type { SiteConfig } from '@/lib/config';

export default function ProfileHero({
  author,
  description,
}: {
  author: SiteConfig['author'];
  description: string;
}) {
  return (
    <section
      className="relative overflow-hidden rounded-[2rem] border border-neutral-200 p-8 shadow-[0_24px_60px_rgba(24,24,27,0.06)] sm:p-10"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 60%, #fde8e8 100%)',
      }}
    >
      <div className="absolute -top-12 right-0 h-44 w-44 rounded-full bg-accent/8 blur-3xl" />
      <div className="absolute -bottom-16 left-10 h-40 w-40 rounded-full bg-primary/6 blur-3xl" />
      <div className="relative">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
          Redwood Scholar
        </p>
        <h1 className="max-w-3xl text-4xl font-serif font-bold leading-tight text-primary sm:text-5xl">
          Albert
          <span className="mt-2 block text-[0.6em] font-sans font-medium tracking-normal text-neutral-600">
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
