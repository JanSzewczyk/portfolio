import { Button } from "@szum-tech/design-system/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@szum-tech/design-system/components/card";
import { cn } from "@szum-tech/design-system/utils";
import { Mail } from "lucide-react";
import type { CreateEmailResponseSuccess } from "resend";
import { type IconName, ReactIcon } from "~/components/ui/react-icon";
import { SectionHeading } from "~/components/ui/section-heading";
import { Section } from "~/constants/sections";
import { ContactForm } from "~/features/contact/components";
import type { ContactFormData } from "~/features/contact/schemas";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";
import type { ActionResponse } from "~/lib/server-action";

type ContactSectionProps = {
  personalInfo: NonNullable<PortfolioPageQueryResult>["personalInfo"];
  contact: NonNullable<PortfolioPageQueryResult>["contact"];
  documentId: string;
  documentType: string;
  sendContactAction(data: ContactFormData): ActionResponse<CreateEmailResponseSuccess>;
};

export function ContactSection({ personalInfo, contact, sendContactAction }: ContactSectionProps) {
  return (
    <section className="py-24" id={Section.CONTACT}>
      <div className="container">
        <SectionHeading description={contact?.heading?.description ?? ""} title={contact?.heading?.title ?? ""} />

        <div className={cn("mx-auto grid gap-8", contact?.form?.enabled ? "max-w-4xl lg:grid-cols-2" : "max-w-lg")}>
          {/* Contact Form */}
          {contact?.form?.enabled ? (
            <ContactForm contactFormContent={contact.form} onSubmitAction={sendContactAction} />
          ) : null}

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="flex gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="size-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a className="text-muted-foreground hover:text-primary" href={`mailto:${personalInfo?.email}`}>
                    {personalInfo?.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            {personalInfo?.socialLinks && personalInfo.socialLinks.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Connect with me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {personalInfo.socialLinks.map((link) => {
                      return (
                        <Button asChild key={link._key} size="icon" variant="outline">
                          <a
                            aria-label={link.platform ?? ""}
                            href={link.url ?? "#"}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <ReactIcon name={link.icon as IconName} />
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {contact?.quickChat ? (
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle>{contact?.quickChat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-body-sm text-card-foreground">{contact?.quickChat?.description}</p>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
