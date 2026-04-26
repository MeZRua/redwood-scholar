import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default function MarkdownProse({ content }: { content: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h1: ({ children }) => <h1 className="mt-10 mb-4 text-4xl font-serif font-bold text-primary">{children}</h1>,
          h2: ({ children }) => <h2 className="mt-10 mb-4 border-b border-neutral-200 pb-3 text-2xl font-serif font-bold text-primary">{children}</h2>,
          h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-semibold text-primary">{children}</h3>,
          p: ({ children }) => <p className="mb-4 text-[1.03rem] leading-8 text-neutral-700">{children}</p>,
          ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6 text-neutral-700">{children}</ul>,
          ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-neutral-700">{children}</ol>,
          blockquote: ({ children }) => (
            <blockquote className="my-6 rounded-r-2xl border-l-4 border-accent bg-accent/5 px-5 py-4 italic text-neutral-600">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const inline = !className;
            if (inline) {
              return <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm text-accent">{children}</code>;
            }
            return (
              <code className="block overflow-x-auto rounded-2xl bg-[#2a1b1a] p-4 text-sm leading-7 text-[#f9eee7]">
                {children}
              </code>
            );
          },
          hr: () => <div className="redwood-divider my-8 h-px w-full" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
