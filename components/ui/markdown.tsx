import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type MarkdownProps = {
  /** Raw Markdown string to render. */
  content: string;
  /** When true, render inline (phrasing content in a `<span>`) instead of block elements. */
  inline?: boolean;
};

/**
 * Renders a Markdown string with design-system token styling.
 *
 * Raw HTML in `content` is NOT executed (no `rehype-raw`) — CMS content is rendered safely.
 * The `inline` variant maps the paragraph to a `<span>` so it can sit inside a sentence
 * (e.g. project highlights); the default variant renders block elements.
 */
export function Markdown({ content, inline = false }: MarkdownProps) {
  const markdown = (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => (
          <a
            className="text-primary underline underline-offset-4 transition-opacity hover:opacity-80"
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {children}
          </a>
        ),
        code: ({ children }) => <code className="text-code">{children}</code>,
        em: ({ children }) => <em className="italic">{children}</em>,
        li: ({ children }) => <li className="text-body-default text-muted-foreground">{children}</li>,
        ol: ({ children }) => <ol className="list-decimal space-y-1 pl-5">{children}</ol>,
        p: ({ children }) =>
          inline ? <span>{children}</span> : <p className="text-body-default text-muted-foreground">{children}</p>,
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        ul: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );

  return inline ? (
    <span data-testid="markdown">{markdown}</span>
  ) : (
    <div className="flex flex-col gap-4" data-testid="markdown">
      {markdown}
    </div>
  );
}
