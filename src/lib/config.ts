import fs from 'fs';
import path from 'path';
import { parse } from 'smol-toml';
import type { I18nConfig } from '@/types/i18n';
import { execSync } from 'child_process'

// function getLastUpdated(): string {
//   try {
//     return execSync('git log -1 --format=%cd --date=format:"%B %Y"')
//       .toString()
//       .trim()
//   } catch {
//     return new Date().toLocaleDateString('en-US', {
//       month: 'long',
//       year:  'numeric',
//     })
//   }
// }

export interface SiteConfig {
  site: {
    title: string;
    description: string;
    favicon: string;
    last_updated?: string;
  };
  author: {
    name: string;
    title: string;
    institution: string;
    avatar: string;
  };
  social: {
    email?: string;
    location?: string;
    location_url?: string;
    location_details?: string[];
    google_scholar?: string;
    orcid?: string;
    github?: string;
    linkedin?: string;
    visitor_globe_provider?: string;
    visitor_globe_embed?: string;
    visitor_map_url?: string;
    blog?: string;
    [key: string]: string | string[] | undefined;
  };
  features: {
    enable_likes: boolean;
    enable_one_page_mode?: boolean;
    enable_visitor_globe?: boolean;
    enable_blog_preview?: boolean;
  };
  navigation: Array<{
    title: string;
    type: 'section' | 'page' | 'link';
    target: string;
    href: string;
  }>;
  sections?: Array<{
    id: string;
    type: 'markdown' | 'publications' | 'list' | 'cards';
    source?: string;
    title?: string;
    filter?: string;
    limit?: number;
  }>;
  i18n?: I18nConfig;
}

const DEFAULT_CONTENT_DIR = 'content';

function normalizeLocale(locale: string): string {
  return locale.trim().replace('_', '-').toLowerCase();
}

function readConfigFromPath(configPath: string): Partial<SiteConfig> | null {
  try {
    const fileContent = fs.readFileSync(configPath, 'utf-8');
    return parse(fileContent) as unknown as Partial<SiteConfig>;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

function getLastGitUpdated(): string | undefined {
  try {
    const gitDate = execSync('git log -1 --format=%cd --date=format:"%B %d, %Y"', {
      encoding: 'utf-8',
    }).trim();

    return gitDate || undefined;
  } catch (error) {
    console.warn('Failed to get last git updated date:', error);
    return undefined;
  }
}

function mergeConfig(base: SiteConfig, localized?: Partial<SiteConfig> | null): SiteConfig {
  if (!localized) return base;

  return {
    ...base,
    site: {
      ...base.site,
      ...(localized.site || {}),
    },
    author: {
      ...base.author,
      ...(localized.author || {}),
    },
    social: {
      ...base.social,
      ...(localized.social || {}),
    },
    features: base.features,
    navigation: localized.navigation || base.navigation,
    sections: localized.sections || base.sections,
    // i18n is always sourced from default content/config.toml
    i18n: base.i18n,
  };
}

function getDefaultConfig(): SiteConfig {
  const defaultPath = path.join(process.cwd(), DEFAULT_CONTENT_DIR, 'config.toml');
  const parsed = readConfigFromPath(defaultPath);

  if (!parsed) {
    throw new Error('Failed to load content/config.toml');
  }
  // 👇 加这一行，覆盖 config.toml 里的静态时间
  // if (parsed.site) parsed.site.last_updated = getLastUpdated();
  // return parsed as SiteConfig;
  const config = parsed as SiteConfig;
  const gitLastUpdated = getLastGitUpdated();

  return {
    ...config,
    site: {
      ...config.site,
      last_updated: gitLastUpdated || config.site.last_updated,
    },
  };
}

export function getConfig(locale?: string): SiteConfig {
  try {
    const baseConfig = getDefaultConfig();

    if (!locale) {
      return baseConfig;
    }

    const normalizedLocale = normalizeLocale(locale);
    const localizedPath = path.join(process.cwd(), `${DEFAULT_CONTENT_DIR}_${normalizedLocale}`, 'config.toml');
    const localizedConfig = readConfigFromPath(localizedPath);

    return mergeConfig(baseConfig, localizedConfig);
  } catch (error) {
    console.error('Error loading config:', error);
    throw new Error('Failed to load configuration');
  }
}
