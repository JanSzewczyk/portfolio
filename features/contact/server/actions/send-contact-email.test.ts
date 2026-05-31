// Use vi.hoisted to create mock that's accessible in vi.mock
const { mockSend } = vi.hoisted(() => {
  return {
    mockSend: vi.fn()
  };
});

// Mock dependencies BEFORE importing the module under test
vi.mock("resend", () => ({
  Resend: class MockResend {
    emails = {
      send: mockSend
    };
  }
}));

vi.mock("~/lib/logger", () => ({
  createLogger: vi.fn(() => ({
    debug: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn()
  }))
}));

vi.mock("~/data/env/server", () => ({
  env: {
    RESEND_API_KEY: "test-api-key",
    RESEND_FROM_EMAIL: "noreply@test.com",
    RESEND_TO_EMAIL: "contact@test.com"
  }
}));

import type { ContactFormData } from "~/features/contact/schemas/contact.schema";
import type { ActionStateFailed } from "~/lib/server-action";

import { sendContactEmail } from "./send-contact-email";

describe("sendContactEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("successful email sending", () => {
    test("sends email successfully with valid form data", async () => {
      // Arrange
      const formData: ContactFormData = {
        email: "john@example.com",
        message: "This is a test message from John Doe.",
        name: "John Doe"
      };

      const mockEmailResponse = {
        data: { id: "email-123" },
        error: null
      };

      mockSend.mockResolvedValue(mockEmailResponse);

      // Act
      const result = await sendContactEmail(formData);

      // Assert
      expect(result).toEqual({
        data: { id: "email-123" },
        success: true
      });

      expect(mockSend).toHaveBeenCalledOnce();
      expect(mockSend).toHaveBeenCalledWith({
        from: "noreply@test.com",
        react: expect.any(Object), // React element
        replyTo: "john@example.com",
        subject: "Portfolio Contact: John Doe",
        to: "contact@test.com"
      });
    });

    test("handles long messages correctly", async () => {
      // Arrange
      const longMessage = "A".repeat(500);
      const formData: ContactFormData = {
        email: "alice@example.com",
        message: longMessage,
        name: "Alice"
      };

      mockSend.mockResolvedValue({
        data: { id: "email-456" },
        error: null
      });

      // Act
      const result = await sendContactEmail(formData);

      // Assert
      expect(result.success).toBe(true);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          replyTo: "alice@example.com",
          subject: "Portfolio Contact: Alice"
        })
      );
    });

    test("uses correct email addresses from environment", async () => {
      // Arrange
      const formData: ContactFormData = {
        email: "test@example.com",
        message: "Test message content here.",
        name: "Test User"
      };

      mockSend.mockResolvedValue({
        data: { id: "email-789" },
        error: null
      });

      // Act
      await sendContactEmail(formData);

      // Assert
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          from: "noreply@test.com",
          to: "contact@test.com"
        })
      );
    });
  });

  describe("error handling", () => {
    test("returns error when Resend API fails", async () => {
      // Arrange
      const formData: ContactFormData = {
        email: "fail@example.com",
        message: "This will fail to send.",
        name: "Failed User"
      };

      const mockError = {
        data: null,
        error: {
          message: "API rate limit exceeded",
          name: "RateLimitError"
        }
      };

      mockSend.mockResolvedValue(mockError);

      // Act
      const result = await sendContactEmail(formData);

      // Assert
      expect(result).toEqual({
        error: "Failed to send email. Please try again later or contact me directly via email.",
        success: false
      });
    });

    test("handles unexpected exceptions gracefully", async () => {
      // Arrange
      const formData: ContactFormData = {
        email: "exception@example.com",
        message: "This will throw an exception.",
        name: "Exception User"
      };

      mockSend.mockRejectedValue(new Error("Network connection failed"));

      // Act
      const result = await sendContactEmail(formData);

      // Assert
      expect(result).toEqual({
        error: "An unexpected error occurred. Please try again later.",
        success: false
      });
    });

    it("handles non-Error exceptions", async () => {
      // Arrange
      const formData: ContactFormData = {
        email: "unknown@example.com",
        message: "This will throw a non-Error object.",
        name: "Unknown Error User"
      };

      mockSend.mockRejectedValue("String error");

      // Act
      const result = await sendContactEmail(formData);

      // Assert
      expect(result.success).toBeFalsy();
      expect((result as ActionStateFailed).error).toContain("unexpected error");
    });

    test("handles Resend API error with missing error name", async () => {
      // Arrange
      const formData: ContactFormData = {
        email: "partial@example.com",
        message: "This has a partial error response.",
        name: "Partial Error User"
      };

      mockSend.mockResolvedValue({
        data: null,
        error: {
          message: "Something went wrong"
          // name is missing
        }
      });

      // Act
      const result = await sendContactEmail(formData);

      // Assert
      expect(result.success).toBe(false);
    });
  });

  describe("email content", () => {
    test("includes sender name in subject line", async () => {
      // Arrange
      const formData: ContactFormData = {
        email: "jane@example.com",
        message: "Hello from Jane!",
        name: "Jane Smith"
      };

      mockSend.mockResolvedValue({
        data: { id: "email-subject-test" },
        error: null
      });

      // Act
      await sendContactEmail(formData);

      // Assert
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: "Portfolio Contact: Jane Smith"
        })
      );
    });

    test("sets reply-to to sender email", async () => {
      // Arrange
      const senderEmail = "sender@domain.com";
      const formData: ContactFormData = {
        email: senderEmail,
        message: "Please reply to this email.",
        name: "Sender"
      };

      mockSend.mockResolvedValue({
        data: { id: "email-reply-test" },
        error: null
      });

      // Act
      await sendContactEmail(formData);

      // Assert
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          replyTo: senderEmail
        })
      );
    });
  });
});
