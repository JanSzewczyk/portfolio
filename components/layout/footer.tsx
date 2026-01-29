import { Button } from "@szum-tech/design-system";
import { ReactIcon, type IconName } from "~/components/ui/react-icon";
import { PERSONAL_INFO } from "~/constants";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";

const iconMap: Record<string, IconName> = {
  github: "SiGithub",
  linkedin: "SiLinkedin",
  twitter: "SiX"
};

type FooterProps = {
  footer: NonNullable<PortfolioPageQueryResult>["footer"];
};

export function Footer({ footer }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-semibold">{PERSONAL_INFO.name}</p>
            <p className="text-muted-foreground text-sm">{PERSONAL_INFO.title}</p>
          </div>

          <div className="flex items-center gap-2">
            {footer?.socialLinks &&
              footer.socialLinks.length > 0 &&
              footer.socialLinks.map((link) => {
                const iconName = link.icon ? iconMap[link.icon] : undefined;
                return (
                  <Button key={link._key} variant="ghost" size="icon" asChild>
                    <a
                      href={link.url ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform ?? ""}
                    >
                      {iconName && <ReactIcon name={iconName} className="size-5" />}
                    </a>
                  </Button>
                );
              })}
          </div>
        </div>

        {footer?.copyrightText && (
          <div className="text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
            <p>
              &copy; {currentYear} {footer.copyrightText}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
