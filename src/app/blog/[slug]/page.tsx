import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog';
import MarkdownProse from '@/components/blog/MarkdownProse';
import { formatDate } from '@/lib/utils';

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="redwood-paper rounded-[2rem] p-7 sm:p-10">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
          <span>{post.emoji}</span>
          <span>{formatDate(post.date)}</span>
          <span>•</span>
          <span>{post.readingTime}</span>
          <span className="redwood-chip rounded-full px-3 py-1 text-xs font-medium text-accent">
            {post.type === 'note' ? '📐 Note' : '📝 Post'}
          </span>
        </div>

        <h1 className="text-4xl font-serif font-bold text-primary sm:text-5xl">{post.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-700">{post.summary}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8">
          <MarkdownProse content={post.content} />
        </div>
      </div>
    </article>
  );
}
