import { Markdown } from "~/components/ui/markdown";

type BioMarkdownProps = {
  content: string;
};

export function BioMarkdown({ content }: BioMarkdownProps) {
  return <Markdown content={content} />;
}
