import { Button } from "@szum-tech/design-system";
import { type IconName, ReactIcon } from "~/components/ui/react-icon";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";

type FooterProps = {
  footer: NonNullable<PortfolioPageQueryResult>["footer"];
  personalInfo: NonNullable<PortfolioPageQueryResult>["personalInfo"];
};

export function Footer({ footer, personalInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-semibold">{personalInfo?.name}</p>
            <p className="text-muted-foreground text-sm">{personalInfo?.title}</p>
          </div>

          <div className="flex items-center gap-2">
            {personalInfo?.socialLinks &&
              personalInfo.socialLinks.length > 0 &&
              personalInfo.socialLinks.map((link) => {
                return (
                  <Button key={link._key} variant="ghost" size="icon" asChild>
                    <a
                      href={link.url ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform ?? ""}
                    >
                      <ReactIcon name={link.icon as IconName} className="size-5" />
                    </a>
                  </Button>
                );
              })}
          </div>
        </div>

        <div className="text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
          <p>{footer?.copyrightText ? `© ${currentYear} ${footer.copyrightText}` : null}</p>
        </div>
      </div>
    </footer>
  );
}
