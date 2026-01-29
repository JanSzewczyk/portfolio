import { SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { type CreateEmailResponseSuccess } from "resend";

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
  Textarea
} from "@szum-tech/design-system";
import { type ContactFormData, contactFormSchema } from "~/features/contact/schemas/contact.schema";
import { type ActionResponse } from "~/lib/action-types";

export type ContactFormProps = {
  onSubmit(data: ContactFormData): ActionResponse<CreateEmailResponseSuccess>;
  title: string;
  description: string;
};

export function ContactForm({ onSubmit, description, title }: ContactFormProps) {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      website: "" // Honeypot field
    }
  });

  async function handleSubmit(data: ContactFormData) {
    const actionResponse = await onSubmit(data);

    if (actionResponse.success) {
      form.reset();
    } else {
      form.setError("root", { message: actionResponse.error });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
