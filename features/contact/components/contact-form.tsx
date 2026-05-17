"use client";

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
import { MailboxIcon, SendIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import type { CreateEmailResponseSuccess } from "resend";
import { type ContactFormData, contactFormSchema } from "~/features/contact/schemas/contact.schema";
import type { PortfolioPageQueryResult } from "~/lib/sanity/types";
import type { ActionResponse } from "~/lib/server-action";

export type ContactFormProps = {
  onSubmitAction(data: ContactFormData): ActionResponse<CreateEmailResponseSuccess>;
  contactFormContent: NonNullable<NonNullable<PortfolioPageQueryResult>["contact"]>["form"];
};

export function ContactForm({ onSubmitAction, contactFormContent }: ContactFormProps) {
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "" // Honeypot field
    }
  });

  async function handleSubmit(formData: ContactFormData) {
    const actionResponse = await onSubmitAction(formData);

    if (!actionResponse.success) {
      // Show error toast
      toast.error("Failed to send message", {
        description: actionResponse.error
      });
    } else {
      toast.success("Message sent!", {
        description: contactFormContent?.successMessage
      });

      setIsSubmitted(true);
      form.reset();
    }
  }

  function handleSendAnother() {
    setIsSubmitted(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{contactFormContent?.title}</CardTitle>
        {!isSubmitted ? <CardDescription>{contactFormContent?.description}</CardDescription> : null}
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <MailboxIcon className="size-24 text-input" />
            <h3 className="mt-8 mb-2 text-foreground text-heading-h2">{contactFormContent?.successView?.title}</h3>
            <p className="mb-8 max-w-md text-muted-foreground">{contactFormContent?.successView?.description}</p>
            <Button onClick={handleSendAnother} variant="secondary">
              {contactFormContent?.successView?.buttonText}
            </Button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              {/* Honeypot field - hidden from users, visible to bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input type="text" id="website" tabIndex={-1} autoComplete="off" {...form.register("website")} />
              </div>

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

              <Button type="submit" fullWidth loading={form.formState.isSubmitting} startIcon={<SendIcon />}>
                Send Message
              </Button>
            </FieldGroup>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
