import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BioMarkdownProps = {
  content: string;
};

export function BioMarkdown({ content }: BioMarkdownProps) {
  return (
    <div className="flex flex-col gap-4">
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
          p: ({ children }) => <p className="text-body-default text-muted-foreground">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          ul: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>
        }}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
