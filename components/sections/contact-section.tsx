"use client";

import { Button } from "@szum-tech/design-system/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@szum-tech/design-system/components/card";
import { cn } from "@szum-tech/design-system/utils";
import { Mail } from "lucide-react";
import { type IconName, ReactIcon } from "~/components/ui/react-icon";
import { SectionHeading } from "~/components/ui/section-heading";
import { Section } from "~/constants/sections";
import { ContactForm } from "~/features/contact/components/contact-form";
import { sendContactEmail } from "~/features/contact/server/actions/send-contact-email";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";

type ContactSectionProps = {
  personalInfo: NonNullable<PortfolioPageQueryResult>["personalInfo"];
  contact: NonNullable<PortfolioPageQueryResult>["contact"];
  documentId: string;
  documentType: string;
};

export function ContactSection({ personalInfo, contact }: ContactSectionProps) {
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
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="size-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a href={`mailto:${personalInfo?.email}`} className="text-muted-foreground hover:text-primary">
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
                        <Button key={link._key} variant="outline" size="icon" asChild>
                          <a
                            href={link.url ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.platform ?? ""}
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
