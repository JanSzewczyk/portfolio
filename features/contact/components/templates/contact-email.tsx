import { Body, Container, Head, Heading, Html, Link, Section, Text } from "@react-email/components";
import type { ContactFormData } from "~/features/contact/schemas/contact.schema";

/**
 * Minimal React Email component for contact form submissions
 */
export function ContactEmail({ name, email, message }: ContactFormData) {
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "long"
  });

  return (
    <Html lang="en">
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header */}
          <Section style={styles.header}>
            <Heading style={styles.headerTitle}>New Contact Form Submission</Heading>
          </Section>

          {/* Content */}
          <Section style={styles.content}>
            {/* From Field */}
            <Section style={styles.field}>
              <Text style={styles.fieldLabel}>FROM</Text>
              <Text style={styles.fieldValue}>{name}</Text>
            </Section>

            {/* Email Field */}
            <Section style={styles.field}>
              <Text style={styles.fieldLabel}>EMAIL</Text>
              <Text style={styles.fieldValue}>
                <Link href={`mailto:${email}`} style={styles.emailLink}>
                  {email}
                </Link>
              </Text>
            </Section>

            {/* Message Field */}
            <Section style={styles.field}>
              <Text style={styles.fieldLabel}>MESSAGE</Text>
              <Text style={styles.messageField}>{message}</Text>
            </Section>

            {/* Timestamp */}
            <Text style={styles.timestamp}>Submitted on {timestamp}</Text>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>Sent from portfolio contact form</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/**
 * Minimal inline styles for email compatibility
 */
const styles = {
  body: {
    backgroundColor: "#ffffff",
    color: "#1a1a1a",
    fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    lineHeight: "1.6",
    margin: "0",
    padding: "48px 24px"
  },
  container: {
    margin: "0 auto",
    maxWidth: "560px"
  },
  content: {
    padding: "32px 0"
  },
  emailLink: {
    color: "#2563eb",
    textDecoration: "none"
  },
  field: {
    marginBottom: "24px"
  },
  fieldLabel: {
    color: "#737373",
    fontSize: "12px",
    fontWeight: "500",
    letterSpacing: "0.05em",
    marginBottom: "6px",
    marginTop: "0",
    textTransform: "uppercase" as const
  },
  fieldValue: {
    color: "#1a1a1a",
    fontSize: "15px",
    lineHeight: "1.5",
    margin: "0",
    wordWrap: "break-word" as const
  },
  footer: {
    padding: "24px 0 0 0"
  },
  footerText: {
    color: "#a3a3a3",
    fontSize: "12px",
    margin: "0"
  },
  header: {
    borderBottom: "1px solid #e5e5e5",
    padding: "0 0 32px 0"
  },
  headerTitle: {
    color: "#1a1a1a",
    fontSize: "20px",
    fontWeight: "600",
    letterSpacing: "-0.01em",
    margin: "0"
  },
  messageField: {
    color: "#1a1a1a",
    fontSize: "15px",
    lineHeight: "1.7",
    margin: "0",
    whiteSpace: "pre-wrap" as const,
    wordWrap: "break-word" as const
  },
  timestamp: {
    color: "#a3a3a3",
    fontSize: "12px",
    marginBottom: "0",
    marginTop: "24px"
  }
};
