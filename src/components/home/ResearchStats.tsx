import CollapsibleSection from '@/components/common/CollapsibleSection';
import type { Publication } from '@/types/publication';

function statValue(publications: Publication[], mode: 'all' | 'selected' | 'recent' | 'firstAuthor'): number {
  switch (mode) {
    case 'selected':
      return publications.filter((pub) => pub.selected).length;
    case 'recent':
      return publications.filter((pub) => pub.year >= new Date().getFullYear() - 2).length;
    case 'firstAuthor':
      return publications.filter((pub) => pub.authors[0]?.isHighlighted).length;
    default:
      return publications.length;
  }
}

export default function ResearchStats({ publications }: { publications: Publication[] }) {
  if (!publications.length) {
    return null;
  }

  const stats = [
    { label: 'Total papers', value: statValue(publications, 'all'), emoji: '📚' },
    { label: 'Selected works', value: statValue(publications, 'selected'), emoji: '✨' },
    { label: 'Recent output', value: statValue(publications, 'recent'), emoji: '🚀' },
    { label: 'Lead/first author', value: statValue(publications, 'firstAuthor'), emoji: '🧭' },
  ];

  return (
    <CollapsibleSection title="📊 Research Signals" eyebrow="Stats" defaultOpen={false}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-[1.5rem] border border-neutral-200 bg-white/70 p-5">
            <p className="text-sm text-neutral-500">{stat.emoji} {stat.label}</p>
            <p className="mt-3 text-3xl font-serif font-bold text-primary">{stat.value}</p>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}
