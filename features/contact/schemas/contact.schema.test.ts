import { describe, expect, it } from "vitest";

import { contactFormSchema } from "./contact.schema";

describe("contactFormSchema", () => {
  describe("valid data", () => {
    it("accepts valid contact form data", () => {
      const result = contactFormSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        message: "Hello, this is a test message!",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John Doe");
        expect(result.data.email).toBe("john@example.com");
        expect(result.data.message).toBe("Hello, this is a test message!");
      }
    });

    it("trims whitespace from all fields", () => {
      const result = contactFormSchema.safeParse({
        name: "  John Doe  ",
        email: "  john@example.com  ",
        message: "  Hello, this is a test message!  ",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John Doe");
        expect(result.data.email).toBe("john@example.com");
        expect(result.data.message).toBe("Hello, this is a test message!");
      }
    });

    it("converts email to lowercase", () => {
      const result = contactFormSchema.safeParse({
        name: "John Doe",
        email: "JOHN@EXAMPLE.COM",
        message: "Hello, this is a test message!",
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("john@example.com");
      }
    });
  });

  describe("name validation", () => {
    it("rejects name shorter than 2 characters", () => {
      const result = contactFormSchema.safeParse({
        name: "J",
        email: "john@example.com",
        message: "Hello, this is a test message!",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "Name must be at least 2 characters",
        );
      }
    });

    it("rejects name longer than 100 characters", () => {
      const result = contactFormSchema.safeParse({
        name: "A".repeat(101),
        email: "john@example.com",
        message: "Hello, this is a test message!",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "Name must be less than 100 characters",
        );
      }
    });
  });

  describe("email validation", () => {
    it("rejects invalid email format", () => {
      const result = contactFormSchema.safeParse({
        name: "John Doe",
        email: "not-an-email",
        message: "Hello, this is a test message!",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "Please enter a valid email address",
        );
      }
    });

    it("rejects email without domain", () => {
      const result = contactFormSchema.safeParse({
        name: "John Doe",
        email: "john@",
        message: "Hello, this is a test message!",
      });

      expect(result.success).toBe(false);
    });

    it("rejects email without @", () => {
      const result = contactFormSchema.safeParse({
        name: "John Doe",
        email: "johnexample.com",
        message: "Hello, this is a test message!",
      });

      expect(result.success).toBe(false);
    });
  });

  describe("message validation", () => {
    it("rejects message shorter than 10 characters", () => {
      const result = contactFormSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        message: "Short",
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "Message must be at least 10 characters",
        );
      }
    });

    it("rejects message longer than 1000 characters", () => {
      const result = contactFormSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        message: "A".repeat(1001),
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          "Message must be less than 1000 characters",
        );
      }
    });

    it("accepts message with exactly 10 characters", () => {
      const result = contactFormSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        message: "1234567890",
      });

      expect(result.success).toBe(true);
    });

    it("accepts message with exactly 1000 characters", () => {
      const result = contactFormSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        message: "A".repeat(1000),
      });

      expect(result.success).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("rejects empty name", () => {
      const result = contactFormSchema.safeParse({
        name: "",
        email: "john@example.com",
        message: "Hello, this is a test message!",
      });

      expect(result.success).toBe(false);
    });

    it("rejects empty email", () => {
      const result = contactFormSchema.safeParse({
        name: "John Doe",
        email: "",
        message: "Hello, this is a test message!",
      });

      expect(result.success).toBe(false);
    });

    it("rejects empty message", () => {
      const result = contactFormSchema.safeParse({
        name: "John Doe",
        email: "john@example.com",
        message: "",
      });

      expect(result.success).toBe(false);
    });

    it("rejects name with only whitespace", () => {
      const result = contactFormSchema.safeParse({
        name: "   ",
        email: "john@example.com",
        message: "Hello, this is a test message!",
      });

      expect(result.success).toBe(false);
    });
  });
});
