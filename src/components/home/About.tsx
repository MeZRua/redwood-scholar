'use client';

import { motion } from 'framer-motion';
import { useMessages } from '@/lib/i18n/useMessages';
import CollapsibleSection from '@/components/common/CollapsibleSection';
import MarkdownProse from '@/components/blog/MarkdownProse';

interface AboutProps {
    content: string;
    title?: string;
}

export default function About({ content, title }: AboutProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.about;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <CollapsibleSection title={`👋 ${resolvedTitle}`} eyebrow="Introduction">
                <MarkdownProse content={content} />
            </CollapsibleSection>
        </motion.div>
    );
}
