'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useMessages } from '@/lib/i18n/useMessages';
import { cn } from '@/lib/utils';

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
    <div className="sticky top-24">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="group mb-4 flex w-full items-center justify-between border-b border-neutral-200 pb-2"
      >
        <span className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
          🔥 {resolvedTitle}
        </span>
        <ChevronDownIcon
          className={cn(
            'h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 group-hover:text-accent',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="relative space-y-0 pl-4">
              <div className="absolute left-[5px] top-1 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="group/item relative pb-4 last:pb-0"
                >
                  <div className="absolute -left-4 top-[5px] h-2.5 w-2.5 rounded-full border-2 border-accent bg-white shadow-sm transition-transform duration-200 group-hover/item:scale-125" />
                  <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                    {item.date}
                  </span>
                  <p className="text-[12px] leading-[1.65] text-neutral-600">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
