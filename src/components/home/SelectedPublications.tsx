'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import CollapsibleSection from '@/components/common/CollapsibleSection';
import { stripHtmlTags } from '@/lib/utils';

interface SelectedPublicationsProps {
  publications: Publication[];
  allPublications?: Publication[];
  title?: string;
  enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title, enableOnePageMode = false }: SelectedPublicationsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedPublications;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <CollapsibleSection title={`📚 ${resolvedTitle}`} eyebrow="Highlights">
                <div className="mb-5 flex justify-end">
                    <Link
                        href={enableOnePageMode ? "/#publications" : "/publications"}
                        prefetch={true}
                        className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-dark"
                    >
                        {messages.home.viewAll} →
                    </Link>
                </div>
                <div className="space-y-4">
                    {publications.map((pub, index) => (
                        <motion.div
                            key={pub.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.08 * index }}
                            className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-gradient-to-br from-white/95 to-neutral-50/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/20 hover:shadow-lg"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-gradient-to-b from-accent/0 via-accent/0 to-accent/0 transition-all duration-300 group-hover:from-accent/60 group-hover:via-accent group-hover:to-accent-dark/60" />

                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <span className="redwood-chip rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-accent">{pub.abbr || pub.year}</span>
                                {pub.selected && (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-accent/25 bg-accent/5 px-2.5 py-0.5 text-[11px] text-accent">
                                        ✨ selected
                                    </span>
                                )}
                            </div>
                            <h3 className="font-serif text-lg font-bold leading-snug text-primary">
                                {stripHtmlTags(pub.title)}
                            </h3>
                            <p className="mt-2 text-[13px] leading-5 text-neutral-500">
                                {pub.authors.map((author, idx) => (
                                    <span key={idx}>
                                        <span className={`${author.isHighlighted ? 'font-semibold text-accent' : ''} ${author.isCoAuthor ? `underline underline-offset-4 ${author.isHighlighted ? 'decoration-accent' : 'decoration-neutral-400'}` : ''}`}>
                                            {author.name}
                                        </span>
                                        {idx < pub.authors.length - 1 && ', '}
                                    </span>
                                ))}
                            </p>
                            <p className="mt-1.5 text-[12px] font-medium uppercase tracking-wide text-neutral-400">{pub.venueDetail || pub.journal || pub.conference}</p>
                            {pub.description && <p className="mt-3 border-t border-neutral-100 pt-3 text-[13px] leading-6 text-neutral-600">{pub.description}</p>}
                        </motion.div>
                    ))}
                </div>
            </CollapsibleSection>
        </motion.div>
    );
}
