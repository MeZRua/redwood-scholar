'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface CollapsibleSectionProps {
  title: string;
  eyebrow?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function CollapsibleSection({
  title,
  eyebrow,
  defaultOpen = true,
  children,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="redwood-paper rounded-[1.75rem] p-6 sm:p-8">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div>
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-serif font-bold text-primary sm:text-3xl">
            {title}
          </h2>
        </div>
        <span className="redwood-chip mt-1 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-accent">
          {isOpen ? 'Collapse' : 'Expand'}
          <ChevronDownIcon
            className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </span>
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
            <div className="mt-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
