import { type ContactFormData } from "../schemas/contact.schema";

/**
 * Generates HTML email template for contact form submissions
 */
export function generateContactEmail(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #2563eb;
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 30px 20px;
    }
    .field {
      margin-bottom: 20px;
    }
    .field-label {
      font-weight: 600;
      color: #4b5563;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
      display: block;
    }
    .field-value {
      background-color: #f9fafb;
      padding: 12px 16px;
      border-radius: 6px;
      border: 1px solid #e5e7eb;
      color: #111827;
      word-wrap: break-word;
    }
    .message-field {
      white-space: pre-wrap;
      line-height: 1.8;
    }
    .footer {
      background-color: #f9fafb;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #6b7280;
      border-top: 1px solid #e5e7eb;
    }
    .timestamp {
      color: #9ca3af;
      font-size: 13px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>

    <div class="content">
      <div class="field">
        <span class="field-label">From</span>
        <div class="field-value">${escapeHtml(data.name)}</div>
      </div>

      <div class="field">
        <span class="field-label">Email</span>
        <div class="field-value">
          <a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb; text-decoration: none;">
            ${escapeHtml(data.email)}
          </a>
        </div>
      </div>

      <div class="field">
        <span class="field-label">Message</span>
        <div class="field-value message-field">${escapeHtml(data.message)}</div>
      </div>

      <div class="timestamp">
        Submitted on ${new Date().toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "long"
        })}
      </div>
    </div>

    <div class="footer">
      This email was sent from your portfolio contact form.
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generates plain text version of the contact email
 */
export function generateContactEmailText(data: ContactFormData): string {
  return `
NEW CONTACT FORM SUBMISSION

From: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
Submitted on ${new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "long"
  })}
  `.trim();
}

/**
 * Escapes HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, (char) => map[char] ?? char);
}
