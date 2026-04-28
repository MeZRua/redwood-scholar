'use client';

import About from '@/components/home/About';
import SelectedPublications from '@/components/home/SelectedPublications';
import News, { NewsItem } from '@/components/home/News';
import PublicationsList from '@/components/publications/PublicationsList';
import TextPage from '@/components/pages/TextPage';
import CardPage from '@/components/pages/CardPage';
import type { SiteConfig } from '@/lib/config';
import { Publication } from '@/types/publication';
import { CardPageConfig, PublicationPageConfig, TextPageConfig } from '@/types/page';
import { useLocaleStore } from '@/lib/stores/localeStore';
import type { BlogPost } from '@/types/blog';
import ProfileHero from '@/components/home/ProfileHero';
import ResearchSnapshot from '@/components/home/ResearchSnapshot';
import RecentWriting from '@/components/blog/RecentWriting';
import VisitorGlobe from '@/components/home/VisitorGlobe';

interface SectionConfig {
  id: string;
  type: 'markdown' | 'publications' | 'list';
  title?: string;
  source?: string;
  filter?: string;
  limit?: number;
  content?: string;
  publications?: Publication[];
  items?: NewsItem[];
}

type PageData =
  | { type: 'about'; id: string; sections: SectionConfig[] }
  | { type: 'publication'; id: string; config: PublicationPageConfig; publications: Publication[] }
  | { type: 'text'; id: string; config: TextPageConfig; content: string }
  | { type: 'card'; id: string; config: CardPageConfig };

export interface HomePageLocaleData {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  features: SiteConfig['features'];
  enableOnePageMode?: boolean;
  researchInterests?: string[];
  pagesToShow: PageData[];
  recentPosts: BlogPost[];
  allPublications: Publication[];
  description: string;
}

interface HomePageClientProps {
  dataByLocale: Record<string, HomePageLocaleData>;
  defaultLocale: string;
}

export default function HomePageClient({ dataByLocale, defaultLocale }: HomePageClientProps) {
  const locale = useLocaleStore((state) => state.locale);
  const fallback = dataByLocale[defaultLocale] || Object.values(dataByLocale)[0];
  const data = dataByLocale[locale] || fallback;

  if (!data) {
    return null;
  }

  const newsSections: SectionConfig[] = [];
  data.pagesToShow.forEach((page) => {
    if (page.type === 'about') {
      page.sections.forEach((section) => {
        if (section.type === 'list') {
          newsSections.push(section);
        }
      });
    }
  });
  const hasNews = newsSections.length > 0;

  return (
    <div className="relative mx-auto max-w-[1600px]">
      {hasNews && (
        <aside className="absolute top-[30rem] right-2 hidden w-60 xl:block 2xl:right-4 2xl:w-64">
          {newsSections.map((section) => (
            <News
              key={section.id}
              items={section.items || []}
              title={section.title}
            />
          ))}
        </aside>
      )}

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <ProfileHero
            author={data.author}
            social={data.social}
            features={data.features}
            researchInterests={data.researchInterests}
            description={data.description}
        />

        <div className="mt-8 space-y-8">
          {false && <ResearchSnapshot interests={data.researchInterests} />}

          {data.pagesToShow.map((page) => (
            <section key={page.id} id={page.id} className="scroll-mt-24 space-y-8">
              {page.type === 'about' && page.sections
                .filter((section: SectionConfig) => section.type !== 'list')
                .map((section: SectionConfig) => {
                switch (section.type) {
                  case 'markdown':
                    return (
                      <About
                        key={section.id}
                        content={section.content || ''}
                        title={section.title}
                      />
                    );
                  case 'publications':
                      return (
                        <SelectedPublications
                          key={section.id}
                          publications={section.publications || []}
                          allPublications={data.allPublications}
                          title={section.title}
                          enableOnePageMode={data.enableOnePageMode}
                        />
                      );
                  default:
                    return null;
                }
              })}
              {page.type === 'publication' && (
                <PublicationsList
                  config={page.config}
                  publications={page.publications}
                  embedded={true}
                />
              )}
              {page.type === 'text' && (
                <TextPage
                  config={page.config}
                  content={page.content}
                  embedded={true}
                />
              )}
              {page.type === 'card' && (
                <CardPage
                  config={page.config}
                  embedded={true}
                />
              )}
            </section>
          ))}

          {data.features.enable_blog_preview !== false && (
            <RecentWriting posts={data.recentPosts} />
          )}

          <VisitorGlobe social={data.social} enabled={data.features.enable_visitor_globe} />
        </div>
      </div>
    </div>
  );
}
