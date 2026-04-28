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
    <div className="py-2">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="group mb-4 flex w-full items-center justify-between border-b border-neutral-200 pb-3"
      >
        <span className="text-2xl font-serif font-bold text-primary">
          🔥 {resolvedTitle}
        </span>
        <ChevronDownIcon
          className={cn(
            'h-5 w-5 text-neutral-400 transition-transform duration-200 group-hover:text-accent',
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
            <div className="relative space-y-0 pl-5">
              <div className="absolute left-[7px] top-1 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="group/item relative pb-4 last:pb-0"
                >
                  <div className="absolute -left-5 top-[7px] h-3 w-3 rounded-full border-2 border-accent bg-white shadow-sm transition-transform duration-200 group-hover/item:scale-125" />
                  <span className="mb-1 block text-sm font-bold uppercase tracking-[0.14em] text-accent">
                    {item.date}
                  </span>
                  <p className="text-[1.03rem] leading-8 text-neutral-700">
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
