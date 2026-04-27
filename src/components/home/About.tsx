'use client';

import { motion } from 'framer-motion';
import { useMessages } from '@/lib/i18n/useMessages';
import MarkdownProse from '@/components/blog/MarkdownProse';

interface AboutProps {
    content: string;
    title?: string;
}

export default function About({ content, title }: AboutProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.about;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="py-2"
        >
            <h2 className="mb-4 border-b border-neutral-200 pb-3 text-2xl font-serif font-bold text-primary">
                👋 {resolvedTitle}
            </h2>
            <MarkdownProse content={content} />
        </motion.section>
    );
}
