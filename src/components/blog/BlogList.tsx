import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import type { BlogPost } from '@/types/blog';

export default function BlogList({
  posts,
  title,
  description,
}: {
  posts: BlogPost[];
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-serif font-bold text-primary sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-neutral-600">{description}</p>}
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="redwood-paper rounded-[1.75rem] p-6 sm:p-7">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
              <span>{post.emoji}</span>
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
              <span className="redwood-chip rounded-full px-3 py-1 text-xs font-medium text-accent">
                {post.type === 'note' ? '📐 Note' : '📝 Post'}
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-primary">
              <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-accent">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-neutral-700">{post.summary}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
