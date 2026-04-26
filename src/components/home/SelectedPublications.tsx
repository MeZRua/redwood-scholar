'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import CollapsibleSection from '@/components/common/CollapsibleSection';
import { stripHtmlTags } from '@/lib/utils';

interface SelectedPublicationsProps {
    publications: Publication[];
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
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                            className="rounded-[1.5rem] border border-neutral-200 bg-white/72 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-500">
                                <span className="redwood-chip rounded-full px-3 py-1 text-accent">{pub.abbr || pub.year}</span>
                                {pub.selected && <span className="rounded-full border border-accent/20 px-3 py-1 text-accent">✨ selected</span>}
                            </div>
                            <h3 className="font-serif text-xl font-bold text-primary leading-tight">
                                {stripHtmlTags(pub.title)}
                            </h3>
                            <p className="mt-2 text-sm text-neutral-600">
                                {pub.authors.map((author, idx) => (
                                    <span key={idx}>
                                        <span className={`${author.isHighlighted ? 'font-semibold text-accent' : ''} ${author.isCoAuthor ? `underline underline-offset-4 ${author.isHighlighted ? 'decoration-accent' : 'decoration-neutral-400'}` : ''}`}>
                                            {author.name}
                                        </span>
                                        {idx < pub.authors.length - 1 && ', '}
                                    </span>
                                ))}
                            </p>
                            <p className="mt-2 text-sm text-neutral-600">{pub.venueDetail || pub.journal || pub.conference}</p>
                            {pub.description && <p className="mt-3 text-sm leading-7 text-neutral-700">{pub.description}</p>}
                        </motion.div>
                    ))}
                </div>
            </CollapsibleSection>
        </motion.div>
    );
}
