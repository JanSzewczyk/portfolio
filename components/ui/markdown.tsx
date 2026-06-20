import { cn } from "@szum-tech/design-system/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export type MarkdownProps = {
  /** Raw Markdown string to render. */
  content: string;
  /** When true, render inline (phrasing content in a `<span>`) instead of block elements. */
  inline?: boolean;
  /**
   * Base text color and typography for the rendered content — supplied by the caller and applied to
   * the wrapper so it cascades to paragraphs/list items. The component sets no base color or font size
   * itself (only structural styling: lists, links, code, emphasis), so every usage defines its own.
   */
  className?: string;
};

/**
 * Renders a Markdown string with design-system token styling.
 *
 * Raw HTML in `content` is NOT executed (no `rehype-raw`) — CMS content is rendered safely.
 * The `inline` variant maps the paragraph to a `<span>` so it can sit inside a sentence
 * (e.g. project highlights); the default variant renders block elements.
 */
export function Markdown({ content, inline = false, className }: MarkdownProps) {
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
        ol: ({ children }) => <ol className="list-decimal space-y-1 pl-5">{children}</ol>,
        p: ({ children }) => (inline ? <span>{children}</span> : <p>{children}</p>),
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        ul: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );

  return inline ? (
    <span className={className}>{markdown}</span>
  ) : (
    <div className={cn("flex flex-col gap-4", className)}>{markdown}</div>
  );
}
