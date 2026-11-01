import { describe, expect, test } from "vitest";

import { contactFormSchema } from "./contact.schema";

describe("contactFormSchema", () => {
  describe("valid data", () => {
    test("accepts valid contact form data", () => {
      const result = contactFormSchema.safeParse({
        email: "john@example.com",
        message: "Hello, this is a test message!",
        name: "John Doe"
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John Doe");
        expect(result.data.email).toBe("john@example.com");
        expect(result.data.message).toBe("Hello, this is a test message!");
      }
    });

    test("trims whitespace from all fields", () => {
      const result = contactFormSchema.safeParse({
        email: "  john@example.com  ",
        message: "  Hello, this is a test message!  ",
        name: "  John Doe  "
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John Doe");
        expect(result.data.email).toBe("john@example.com");
        expect(result.data.message).toBe("Hello, this is a test message!");
      }
    });

    test("converts email to lowercase", () => {
      const result = contactFormSchema.safeParse({
        email: "JOHN@EXAMPLE.COM",
        message: "Hello, this is a test message!",
        name: "John Doe"
      });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe("john@example.com");
      }
    });
  });

  describe("name validation", () => {
    test("rejects name shorter than 2 characters", () => {
      const result = contactFormSchema.safeParse({
        email: "john@example.com",
        message: "Hello, this is a test message!",
        name: "J"
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Name must be at least 2 characters");
      }
    });

    test("rejects name longer than 100 characters", () => {
      const result = contactFormSchema.safeParse({
        email: "john@example.com",
        message: "Hello, this is a test message!",
        name: "A".repeat(101)
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Name must be less than 100 characters");
      }
    });
  });

  describe("email validation", () => {
    test("rejects invalid email format", () => {
      const result = contactFormSchema.safeParse({
        email: "not-an-email",
        message: "Hello, this is a test message!",
        name: "John Doe"
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Please enter a valid email address");
      }
    });

    test("rejects email without domain", () => {
      const result = contactFormSchema.safeParse({
        email: "john@",
        message: "Hello, this is a test message!",
        name: "John Doe"
      });

      expect(result.success).toBe(false);
    });

    test("rejects email without @", () => {
      const result = contactFormSchema.safeParse({
        email: "johnexample.com",
        message: "Hello, this is a test message!",
        name: "John Doe"
      });

      expect(result.success).toBe(false);
    });
  });

  describe("message validation", () => {
    test("rejects message shorter than 10 characters", () => {
      const result = contactFormSchema.safeParse({
        email: "john@example.com",
        message: "Short",
        name: "John Doe"
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Message must be at least 10 characters");
      }
    });

    test("rejects message longer than 1000 characters", () => {
      const result = contactFormSchema.safeParse({
        email: "john@example.com",
        message: "A".repeat(1001),
        name: "John Doe"
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Message must be less than 1000 characters");
      }
    });

    test("accepts message with exactly 10 characters", () => {
      const result = contactFormSchema.safeParse({
        email: "john@example.com",
        message: "1234567890",
        name: "John Doe"
      });

      expect(result.success).toBe(true);
    });

    test("accepts message with exactly 1000 characters", () => {
      const result = contactFormSchema.safeParse({
        email: "john@example.com",
        message: "A".repeat(1000),
        name: "John Doe"
      });

      expect(result.success).toBe(true);
    });
  });

  describe("edge cases", () => {
    test("rejects empty name", () => {
      const result = contactFormSchema.safeParse({
        email: "john@example.com",
        message: "Hello, this is a test message!",
        name: ""
      });

      expect(result.success).toBe(false);
    });

    test("rejects empty email", () => {
      const result = contactFormSchema.safeParse({
        email: "",
        message: "Hello, this is a test message!",
        name: "John Doe"
      });

      expect(result.success).toBe(false);
    });

    test("rejects empty message", () => {
      const result = contactFormSchema.safeParse({
        email: "john@example.com",
        message: "",
        name: "John Doe"
      });

      expect(result.success).toBe(false);
    });

    test("rejects name with only whitespace", () => {
      const result = contactFormSchema.safeParse({
        email: "john@example.com",
        message: "Hello, this is a test message!",
        name: "   "
      });

      expect(result.success).toBe(false);
    });
  });
});
