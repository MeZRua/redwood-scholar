'use client';

import { useEffect, useRef } from 'react';
import CollapsibleSection from '@/components/common/CollapsibleSection';
import type { SiteConfig } from '@/lib/config';

export default function VisitorGlobe({
  social,
  enabled,
}: {
  social: SiteConfig['social'];
  enabled?: boolean;
}) {
  const embedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!social.visitor_globe_embed || !embedRef.current) {
      return;
    }

    const container = embedRef.current;
    container.innerHTML = '';

    const match = social.visitor_globe_embed.match(/<script[^>]*src="([^"]+)"[^>]*><\/script>/i);
    if (match?.[1]) {
      const script = document.createElement('script');
      script.src = match[1];
      script.async = true;
      script.id = 'redwood-visitor-globe';
      container.appendChild(script);
      return;
    }

    container.innerHTML = social.visitor_globe_embed;
  }, [social.visitor_globe_embed]);

  if (!enabled || (!social.visitor_globe_embed && !social.visitor_map_url)) {
    return null;
  }

  return (
    <CollapsibleSection title="🌍 Visitors" eyebrow="Signals" defaultOpen={false}>
      <div className="space-y-4 text-neutral-700">
        <p className="max-w-2xl text-sm leading-7 text-neutral-600">
          A little globe for the wandering paths that brought readers here. The module is configurable so this template can use ClustrMaps, FlagCounter, or any embeddable visitor widget.
        </p>
        {social.visitor_globe_embed && (
          <div
            ref={embedRef}
            className="overflow-hidden rounded-[1.5rem] border border-neutral-200 bg-white/75 p-4"
          />
        )}
        {!social.visitor_globe_embed && social.visitor_map_url && (
          <img
            src={social.visitor_map_url}
            alt="Visitor globe"
            className="max-w-full rounded-[1.5rem] border border-neutral-200"
          />
        )}
      </div>
    </CollapsibleSection>
  );
}
