import { Button } from "@szum-tech/design-system";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "~/components/ui/icons";
import { PERSONAL_INFO, SOCIAL_LINKS } from "~/constants/portfolio";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon
};

export function Footer() {
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
            {SOCIAL_LINKS.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <Button key={link.platform} variant="ghost" size="icon" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                    {Icon && <Icon className="size-5" />}
                  </a>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="text-muted-foreground mt-8 border-t pt-8 text-center text-sm">
          <p>
            &copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
