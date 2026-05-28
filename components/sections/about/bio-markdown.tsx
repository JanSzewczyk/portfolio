import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type BioMarkdownProps = {
  content: string;
};

export function BioMarkdown({ content }: BioMarkdownProps) {
  return (
    <div className="flex flex-col gap-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="text-body-default text-muted-foreground">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary underline underline-offset-4 transition-opacity hover:opacity-80"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="list-disc space-y-1 pl-5">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal space-y-1 pl-5">{children}</ol>,
          li: ({ children }) => <li className="text-body-default text-muted-foreground">{children}</li>,
          code: ({ children }) => <code className="text-code">{children}</code>
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
