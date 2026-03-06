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
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn()
  }))
}));

vi.mock("~/data/env/server", () => ({
  env: {
    RESEND_API_KEY: "test-api-key",
    RESEND_FROM_EMAIL: "noreply@test.com",
    RESEND_TO_EMAIL: "contact@test.com"
  }
}));

import { type ContactFormData } from "~/features/contact/schemas/contact.schema";
import { type ActionStateFailed } from "~/lib/server-action";

import { sendContactEmail } from "./send-contact-email";

describe("sendContactEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("successful email sending", () => {
    test("sends email successfully with valid form data", async () => {
      // Arrange
      const formData: ContactFormData = {
        name: "John Doe",
        email: "john@example.com",
        message: "This is a test message from John Doe."
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
        success: true,
        data: { id: "email-123" }
      });

      expect(mockSend).toHaveBeenCalledOnce();
      expect(mockSend).toHaveBeenCalledWith({
        from: "noreply@test.com",
        to: "contact@test.com",
        replyTo: "john@example.com",
        subject: "Portfolio Contact: John Doe",
        react: expect.any(Object) // React element
      });
    });

    test("handles long messages correctly", async () => {
      // Arrange
      const longMessage = "A".repeat(500);
      const formData: ContactFormData = {
        name: "Alice",
        email: "alice@example.com",
        message: longMessage
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
          subject: "Portfolio Contact: Alice",
          replyTo: "alice@example.com"
        })
      );
    });

    test("uses correct email addresses from environment", async () => {
      // Arrange
      const formData: ContactFormData = {
        name: "Test User",
        email: "test@example.com",
        message: "Test message content here."
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
        name: "Failed User",
        email: "fail@example.com",
        message: "This will fail to send."
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
        success: false,
        error: "Failed to send email. Please try again later or contact me directly via email."
      });
    });

    test("handles unexpected exceptions gracefully", async () => {
      // Arrange
      const formData: ContactFormData = {
        name: "Exception User",
        email: "exception@example.com",
        message: "This will throw an exception."
      };

      mockSend.mockRejectedValue(new Error("Network connection failed"));

      // Act
      const result = await sendContactEmail(formData);

      // Assert
      expect(result).toEqual({
        success: false,
        error: "An unexpected error occurred. Please try again later."
      });
    });

    it("handles non-Error exceptions", async () => {
      // Arrange
      const formData: ContactFormData = {
        name: "Unknown Error User",
        email: "unknown@example.com",
        message: "This will throw a non-Error object."
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
        name: "Partial Error User",
        email: "partial@example.com",
        message: "This has a partial error response."
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
        name: "Jane Smith",
        email: "jane@example.com",
        message: "Hello from Jane!"
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
        name: "Sender",
        email: senderEmail,
        message: "Please reply to this email."
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
