'use client';

import { motion } from 'framer-motion';
import { useMessages } from '@/lib/i18n/useMessages';
import CollapsibleSection from '@/components/common/CollapsibleSection';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

export default function News({ items, title }: NewsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.news;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <CollapsibleSection title={`🔥 ${resolvedTitle}`} eyebrow="Signals" defaultOpen={false}>
                <div className="space-y-3">
                    {items.map((item, index) => (
                        <div key={index} className="grid gap-2 rounded-2xl border border-neutral-200 bg-white/70 p-4 sm:grid-cols-[90px_1fr]">
                            <span className="text-xs font-semibold uppercase tracking-wide text-accent">{item.date}</span>
                            <p className="text-sm leading-7 text-neutral-700">{item.content}</p>
                        </div>
                    ))}
                </div>
            </CollapsibleSection>
        </motion.div>
    );
}
