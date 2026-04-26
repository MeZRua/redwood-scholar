import CollapsibleSection from '@/components/common/CollapsibleSection';

export default function ResearchSnapshot({ interests }: { interests?: string[] }) {
  if (!interests?.length) {
    return null;
  }

  const descriptions = [
    'Thinking about how we align model behavior with useful decision-making workflows.',
    'Designing systems that make large-scale learning reliable, efficient, and practical.',
    'Bridging research notes, papers, and prototypes into one coherent narrative.',
  ];

  return (
    <CollapsibleSection title="🧠 Research Snapshot" eyebrow="Focus">
      <div className="grid gap-4 md:grid-cols-3">
        {interests.map((interest, index) => (
          <div key={interest} className="rounded-[1.5rem] border border-neutral-200 bg-white/70 p-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              0{index + 1}
            </p>
            <h3 className="text-lg font-serif font-bold text-primary">{interest}</h3>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              {descriptions[index % descriptions.length]}
            </p>
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}
