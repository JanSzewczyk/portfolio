import { Mail } from "lucide-react";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@szum-tech/design-system";
import { cn } from "@szum-tech/design-system/utils";
import { ReactIcon, type IconName } from "~/components/ui/react-icon";
import { SectionHeading } from "~/components/ui/section-heading";
import { Section } from "~/constants/sections";
import { ContactForm } from "~/features/contact/components/contact-form";
import { sendContactEmail } from "~/features/contact/server/actions/send-contact-email";
import { type PortfolioPageQueryResult } from "~/lib/sanity/types";

const iconMap: Record<string, IconName> = {
  github: "SiGithub",
  linkedin: "SiLinkedin",
  twitter: "SiX"
};

type ContactSectionProps = {
  contact: NonNullable<PortfolioPageQueryResult>["contact"];
  documentId: string;
  documentType: string;
};

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section id={Section.CONTACT} className="py-24">
      <div className="container">
        <SectionHeading title={contact?.heading?.title ?? ""} description={contact?.heading?.description ?? ""} />

        <div className={cn("mx-auto grid gap-8", contact?.form?.enabled ? "max-w-4xl lg:grid-cols-2" : "max-w-lg")}>
          {/* Contact Form */}
          {contact?.form?.enabled ? (
            <ContactForm contactFormContent={contact.form} onSubmitAction={sendContactEmail} />
          ) : null}

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="flex gap-4">
                <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
                  <Mail className="text-primary size-6" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a href={`mailto:${contact?.email}`} className="text-muted-foreground hover:text-primary">
                    {contact?.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connect with me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {contact?.socialLinks?.map((link) => {
                    const iconName = link.icon ? iconMap[link.icon] : undefined;
                    return (
                      <Button key={link._key} variant="outline" size="icon" asChild>
                        <a
                          href={link.url ?? "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.platform ?? ""}
                        >
                          {iconName ? <ReactIcon name={iconName} className="size-5" /> : null}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {contact?.quickChat ? (
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle>{contact?.quickChat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-body-sm">{contact?.quickChat?.description}</p>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
