'use client';

import { useEffect, useState } from 'react';
import type { ComponentType } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  AcademicCapIcon,
  HeartIcon,
  MapPinIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { Github, Linkedin } from 'lucide-react';
import type { SiteConfig } from '@/lib/config';
import { useMessages } from '@/lib/i18n/useMessages';

const OrcidIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
  </svg>
);

interface ProfileHeroProps {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  researchInterests?: string[];
  description?: string;
}

export default function ProfileHero({
  author,
  social,
  features,
  researchInterests,
  description,
}: ProfileHeroProps) {
  const messages = useMessages();
  const [hasLiked, setHasLiked] = useState(false);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    if (!features.enable_likes) return;
    setHasLiked(localStorage.getItem('redwood-scholar-user-liked') === 'true');
  }, [features.enable_likes]);

  const handleLike = () => {
    const next = !hasLiked;
    setHasLiked(next);
    if (next) {
      localStorage.setItem('redwood-scholar-user-liked', 'true');
      setShowThanks(true);
      setTimeout(() => setShowThanks(false), 1800);
    } else {
      localStorage.removeItem('redwood-scholar-user-liked');
    }
  };

  const links = [
    social.email ? { label: messages.profile.email, href: `mailto:${social.email}`, icon: EnvelopeIcon } : null,
    social.google_scholar ? { label: 'Google Scholar', href: social.google_scholar, icon: AcademicCapIcon } : null,
    social.orcid ? { label: 'ORCID', href: social.orcid, icon: OrcidIcon } : null,
    social.github ? { label: 'GitHub', href: social.github, icon: Github } : null,
    social.linkedin ? { label: 'LinkedIn', href: social.linkedin, icon: Linkedin } : null,
    social.blog ? { label: 'Blog', href: social.blog, icon: BookOpenIcon } : null,
  ].filter(Boolean) as Array<{ label: string; href: string; icon: ComponentType<{ className?: string }> }>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[2rem] border border-[rgba(204,26,16,0.09)] shadow-[0_24px_60px_rgba(139,16,16,0.07)]"
      style={{
        background:
          'linear-gradient(135deg, rgba(255,255,255,0.99) 0%, rgba(254,242,242,0.97) 60%, rgba(253,232,232,0.95) 100%)',
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[2rem] bg-gradient-to-r from-transparent via-accent/55 to-transparent" />
      <div className="pointer-events-none absolute -top-12 right-0 h-52 w-52 rounded-full bg-accent/6 blur-[72px]" />
      <div className="pointer-events-none absolute -bottom-16 left-1/3 h-48 w-48 rounded-full bg-primary/8 blur-[64px]" />

      <div className="relative flex flex-col-reverse gap-6 p-6 sm:p-8 md:flex-row md:items-center md:gap-10">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-serif font-bold leading-tight text-primary sm:text-4xl">
            {author.name}
          </h1>
          <p className="mt-1.5 text-sm font-semibold uppercase tracking-wider text-accent">
            {author.title}
          </p>
          <p className="mt-0.5 text-sm leading-6 text-neutral-400">{author.institution}</p>

          {description && (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600">
              {description}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                  className="redwood-chip inline-flex h-9 w-9 items-center justify-center rounded-full text-accent shadow-sm hover:bg-accent hover:text-white hover:shadow-md"
                  aria-label={link.label}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              );
            })}

            {features.enable_likes && (
              <motion.button
                type="button"
                onClick={handleLike}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                  hasLiked
                    ? 'border-accent bg-accent text-white shadow-md'
                    : 'border-accent/20 bg-white/70 text-accent hover:bg-accent hover:text-white'
                }`}
              >
                {hasLiked ? <HeartSolidIcon className="h-3.5 w-3.5" /> : <HeartIcon className="h-3.5 w-3.5" />}
                {hasLiked ? messages.profile.liked : messages.profile.like}
              </motion.button>
            )}
          </div>

          {showThanks && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5 text-xs text-neutral-400"
            >
              {messages.profile.thanks} ✨
            </motion.p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {(social.location || social.location_details) && (
              <div className="flex items-center gap-1.5 rounded-xl border border-neutral-200/80 bg-white/60 px-3 py-1.5">
                <MapPinIcon className="h-3.5 w-3.5 shrink-0 text-accent" />
                <span className="text-xs font-medium text-neutral-600">
                  {social.location}
                  {social.location_details?.[0] && (
                    <span className="ml-1 text-neutral-400">{social.location_details[0]}</span>
                  )}
                </span>
              </div>
            )}

            {researchInterests?.map((interest) => (
              <span
                key={interest}
                className="redwood-chip rounded-full px-3 py-1 text-xs font-medium text-accent"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="shrink-0 self-center">
          <div className="relative h-36 w-36 sm:h-48 sm:w-48">
            <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-accent/25 via-[#e52e24]/15 to-transparent blur-xl" />
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="relative h-full w-full overflow-hidden rounded-[1.5rem] border-2 border-[rgba(204,26,16,0.22)] shadow-2xl"
            >
              <Image
                src={author.avatar}
                alt={author.name}
                width={192}
                height={192}
                className="h-full w-full object-cover object-[32%_center] transition-transform duration-500 hover:scale-105"
                priority
              />
              <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] bg-gradient-to-t from-[rgba(139,16,16,0.1)] to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
