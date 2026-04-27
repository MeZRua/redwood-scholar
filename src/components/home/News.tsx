'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useMessages } from '@/lib/i18n/useMessages';

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
    const [isOpen, setIsOpen] = useState(true);

    return (
        <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="sticky top-24"
        >
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="mb-4 flex w-full items-center justify-between border-b border-neutral-200 pb-3 text-left"
            >
                <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">Signals</p>
                    <h2 className="mt-1 text-lg font-serif font-bold text-primary">🔥 {resolvedTitle}</h2>
                </div>
                <ChevronDownIcon className={`h-4 w-4 text-neutral-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.24 }}
                        className="overflow-hidden"
                    >
                        <div className="relative pl-4">
                            <div className="absolute left-[5px] top-1 bottom-1 w-px bg-neutral-200" />
                            <div className="space-y-4">
                                {items.map((item, index) => (
                                    <div key={index} className="relative">
                                        <span className="absolute -left-[13px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{item.date}</p>
                                        <p className="mt-1 text-sm leading-7 text-neutral-700">{item.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.aside>
    );
}
