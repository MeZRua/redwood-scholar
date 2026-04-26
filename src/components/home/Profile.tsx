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

interface ProfileProps {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  researchInterests?: string[];
}

export default function Profile({ author, social, features, researchInterests }: ProfileProps) {
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
    <motion.aside
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="lg:sticky lg:top-24"
    >
      <div className="redwood-paper rounded-[2rem] p-6">
        <div className="relative mx-auto mb-6 h-64 w-64 overflow-hidden rounded-[1.75rem] border border-[rgba(182,67,61,0.14)] shadow-lg">
          <Image
            src={author.avatar}
            alt={author.name}
            width={256}
            height={256}
            className="h-full w-full object-cover object-[32%_center]"
            priority
          />
        </div>

        <div className="text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent">Albert • research profile</p>
          <h1 className="text-3xl font-serif font-bold text-primary">{author.name}</h1>
          <p className="mt-2 text-lg font-medium text-accent">{author.title}</p>
          <p className="mt-1 text-sm leading-7 text-neutral-600">{author.institution}</p>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="redwood-chip inline-flex h-11 w-11 items-center justify-center rounded-full text-accent transition hover:-translate-y-0.5 hover:bg-accent hover:text-white"
                aria-label={link.label}
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>

        {(social.location || social.location_details) && (
          <div className="mt-6 rounded-[1.5rem] border border-neutral-200 bg-white/70 p-4">
            <div className="flex items-start gap-3">
              <MapPinIcon className="mt-1 h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-semibold text-primary">{messages.profile.location}</p>
                {social.location && <p className="mt-1 text-sm text-neutral-700">{social.location}</p>}
                {social.location_details?.map((line, index) => (
                  <p key={index} className="text-sm text-neutral-600">{line}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {researchInterests?.length ? (
          <div className="mt-6 rounded-[1.5rem] border border-neutral-200 bg-white/70 p-5">
            <p className="mb-4 text-sm font-semibold text-primary">🧭 {messages.profile.researchInterests}</p>
            <div className="flex flex-wrap gap-2">
              {researchInterests.map((interest) => (
                <span key={interest} className="redwood-chip rounded-full px-3 py-1.5 text-sm text-accent">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {features.enable_likes && (
          <div className="mt-6 flex flex-col items-center">
            <button
              type="button"
              onClick={handleLike}
              className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/70 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent hover:text-white"
            >
              {hasLiked ? <HeartSolidIcon className="h-4 w-4" /> : <HeartIcon className="h-4 w-4" />}
              {hasLiked ? messages.profile.liked : messages.profile.like}
            </button>
            {showThanks && <p className="mt-2 text-xs text-neutral-500">{messages.profile.thanks} ✨</p>}
          </div>
        )}
      </div>
    </motion.aside>
  );
}
