import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';
import CollapsibleSection from '@/components/common/CollapsibleSection';

export default function RecentWriting({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) {
    return null;
  }

  return (
    <CollapsibleSection title="📝 Recent Writing" eyebrow="Blog">
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-3xl border border-neutral-200 bg-white/65 p-5">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
              <span>{post.emoji}</span>
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readingTime}</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-primary">
              <Link href={`/blog/${post.slug}`} className="hover:text-accent">
                {post.title}
              </Link>
            </h3>
            <p className="mt-2 text-neutral-700">{post.summary}</p>
          </article>
        ))}
        <div className="pt-2">
          <Link href="/blog" className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent-dark">
            Browse all posts →
          </Link>
        </div>
      </div>
    </CollapsibleSection>
  );
}
