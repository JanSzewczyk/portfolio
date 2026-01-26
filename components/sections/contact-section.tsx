"use client";

import { Mail, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Textarea,
  toast
} from "@szum-tech/design-system";
import { ReactIcon, type IconName } from "~/components/ui/react-icon";
import { SectionHeading } from "~/components/ui/section-heading";
import { type PersonalInfo, type SocialLink } from "~/constants/portfolio";
import { Section } from "~/constants/sections";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

const iconMap: Record<string, IconName> = {
  github: "SiGithub",
  linkedin: "SiLinkedin",
  twitter: "SiX"
};

type ContactSectionProps = {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
};

export function ContactSection({ personalInfo, socialLinks }: ContactSectionProps) {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  async function onSubmit(_data: ContactFormData) {
    // TODO: Implement actual form submission
    // This is a placeholder - simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message sent!", {
      description: "Thank you for reaching out. I'll get back to you soon."
    });

    form.reset();
  }

  return (
    <section id={Section.CONTACT} className="py-24">
      <div className="container">
        <SectionHeading
          title="Get in Touch"
          description="Have a project in mind or just want to say hello? I'd love to hear from you."
        />

        <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>Fill out the form and I&apos;ll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Field data-invalid={!!form.formState.errors.name}>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                      id="username"
                      placeholder="Your name"
                      invalid={!!form.formState.errors.name}
                      {...form.register("name")}
                    />
                    <FieldError errors={[form.formState.errors.name]} />
                  </Field>
                  <Field data-invalid={!!form.formState.errors.email}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      placeholder="your@email.com"
                      invalid={!!form.formState.errors.email}
                      type="email"
                      {...form.register("email")}
                    />
                    <FieldError errors={[form.formState.errors.email]} />
                  </Field>
                  <Field data-invalid={!!form.formState.errors.message}>
                    <FieldLabel htmlFor="message">Message</FieldLabel>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      rows={5}
                      invalid={!!form.formState.errors.message}
                      {...form.register("message")}
                    />
                    <FieldError errors={[form.formState.errors.message]} />
                  </Field>

                  <Button
                    type="submit"
                    fullWidth
                    disabled={form.formState.isSubmitting}
                    loading={form.formState.isSubmitting}
                    startIcon={<SendIcon />}
                  >
                    Send Message
                  </Button>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="flex gap-4">
                <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
                  <Mail className="text-primary size-6" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a href={`mailto:${personalInfo.email}`} className="text-muted-foreground hover:text-primary">
                    {personalInfo.email}
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
                  {socialLinks.map((link) => {
                    const iconName = iconMap[link.icon];
                    return (
                      <Button key={link.platform} variant="outline" size="icon" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                          {iconName ? <ReactIcon name={iconName} className="size-5" /> : null}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent>
                <p className="text-muted-foreground text-body-sm">
                  <strong className="text-foreground">Prefer a quick chat?</strong>
                  <br />
                  Feel free to reach out on LinkedIn or Twitter for a faster response.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
