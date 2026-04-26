import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogFrontmatter, BlogPost } from '@/types/blog';

const BLOG_DIR = 'content/blog';

function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

function getBlogRoot(): string {
  return path.join(process.cwd(), BLOG_DIR);
}

export function getAllBlogPosts(): BlogPost[] {
  const blogRoot = getBlogRoot();

  if (!fs.existsSync(blogRoot)) {
    return [];
  }

  return fs
    .readdirSync(blogRoot)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const fullPath = path.join(blogRoot, file);
      const raw = fs.readFileSync(fullPath, 'utf-8');
      const { data, content } = matter(raw);
      const slug = file.replace(/\.(md|mdx)$/, '');
      const frontmatter = data as BlogFrontmatter;

      return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || new Date().toISOString(),
        summary: frontmatter.summary || '',
        tags: frontmatter.tags || [],
        emoji: frontmatter.emoji || '📝',
        type: frontmatter.type || 'post',
        draft: frontmatter.draft || false,
        content,
        readingTime: estimateReadingTime(content),
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  return getAllBlogPosts().find((post) => post.slug === slug) || null;
}

export function getRecentBlogPosts(limit = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, limit);
}
