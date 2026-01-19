"use client";

import { useState } from "react";

import { SendIcon } from "lucide-react";
import { z } from "zod";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
  toast
} from "@szum-tech/design-system";
import { cn } from "@szum-tech/design-system/utils";
import { GitHubIcon, LinkedInIcon, MailIcon, TwitterIcon } from "~/components/ui/icons";
import { SectionHeading } from "~/components/ui/section-heading";
import { PERSONAL_INFO, SOCIAL_LINKS } from "~/constants/portfolio";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon
};

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // TODO: Implement actual form submission
    // This is a placeholder - simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message sent!", {
      description: "Thank you for reaching out. I'll get back to you soon."
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24">
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    invalid={!!errors.name}
                  />
                  {errors.name && <p className="text-error text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    invalid={!!errors.email}
                  />
                  {errors.email && <p className="text-error text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={cn(errors.message && "border-error")}
                  />
                  {errors.message && <p className="text-error text-sm">{errors.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting} loading={isSubmitting}>
                  {!isSubmitting && <SendIcon className="mr-2 size-4" />}
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-center gap-4 pt-6">
                <div className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
                  <MailIcon className="text-primary size-6" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-muted-foreground hover:text-primary">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Connect with me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = iconMap[link.icon];
                    return (
                      <Button key={link.platform} variant="outline" size="lg" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                          {Icon && <Icon className="size-5" />}
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-sm">
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
