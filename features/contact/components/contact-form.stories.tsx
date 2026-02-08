import { type CreateEmailResponseSuccess } from "resend";

import { expect, fn, waitFor } from "storybook/test";
import { ContactForm } from "~/features/contact/components/contact-form";
import { contactFormContentBuilder } from "~/tests/builders";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Features/Contact/Contact Form",
  component: ContactForm,
  parameters: {
    layout: "padded"
  },
  args: {
    contactFormContent: contactFormContentBuilder.one(),
    onSubmitAction: fn(async () => ({
      success: true as const,
      data: { id: "test-id" } as CreateEmailResponseSuccess
    }))
  },
  decorators: [(Story) => <div className="w-full max-w-xl">{Story()}</div>]
});

// Story named after component (single story)
export const ContactForm_ = meta.story({});

// Test 1: Initial render
ContactForm_.test("Renders all form fields and submit button", async ({ canvas }) => {
  const nameInput = canvas.getByLabelText(/username/i);
  const emailInput = canvas.getByLabelText(/email/i);
  const messageInput = canvas.getByLabelText(/message/i);
  const submitButton = canvas.getByRole("button", { name: /send message/i });

  await expect(nameInput).toBeVisible();
  await expect(emailInput).toBeVisible();
  await expect(messageInput).toBeVisible();
  await expect(submitButton).toBeVisible();
});

// Test 2: Empty form validation
ContactForm_.test("Shows validation errors when submitting empty form", async ({ canvas, step, userEvent }) => {
  const submitButton = canvas.getByRole("button", { name: /send message/i });

  await step("Submit empty form", async () => {
    await userEvent.click(submitButton);
  });

  await step("Wait for validation errors", async () => {
    await waitFor(async () => {
      const errorMessages = canvas.queryAllByRole("alert");
      await expect(errorMessages.length).toBeGreaterThan(0);
    });
  });
});

// Test 3: Valid form submission
ContactForm_.test("Successfully submits valid form data", async ({ canvas, args, step, userEvent }) => {
  const nameInput = canvas.getByLabelText(/username/i);
  const emailInput = canvas.getByLabelText(/email/i);
  const messageInput = canvas.getByLabelText(/message/i);
  const submitButton = canvas.getByRole("button", { name: /send message/i });

  await step("Fill out form", async () => {
    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(messageInput, "This is a test message that is long enough to pass validation");
  });

  await step("Submit form", async () => {
    await userEvent.click(submitButton);
  });

  await step("Verify submission", async () => {
    await waitFor(async () => {
      await expect(args.onSubmitAction).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        message: "This is a test message that is long enough to pass validation",
        website: ""
      });
    });
  });
});

// Test 4: Shows success state after submission
ContactForm_.test("Shows success state after successful submission", async ({ canvas, step, userEvent }) => {
  const nameInput = canvas.getByLabelText(/username/i);
  const emailInput = canvas.getByLabelText(/email/i);
  const messageInput = canvas.getByLabelText(/message/i);
  const submitButton = canvas.getByRole("button", { name: /send message/i });

  await step("Fill and submit form", async () => {
    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(messageInput, "This is a test message that is long enough to pass validation");
    await userEvent.click(submitButton);
  });

  await step("Verify success state is shown", async () => {
    await waitFor(
      async () => {
        const thankYouMessage = canvas.getByText(/thank you for your message/i);
        await expect(thankYouMessage).toBeVisible();
      },
      { timeout: 3000 }
    );
  });

  await step("Verify send another button is visible", async () => {
    const sendAnotherButton = canvas.getByRole("button", { name: /send another message/i });
    await expect(sendAnotherButton).toBeVisible();
  });
});

// Test 5: Double submission using "Send another message" button
ContactForm_.test(
  "Allows second submission after clicking send another message",
  async ({ canvas, args, step, userEvent }) => {
    await step("First submission", async () => {
      const nameInput = canvas.getByLabelText(/username/i);
      const emailInput = canvas.getByLabelText(/email/i);
      const messageInput = canvas.getByLabelText(/message/i);
      const submitButton = canvas.getByRole("button", { name: /send message/i });

      await userEvent.type(nameInput, "John Doe");
      await userEvent.type(emailInput, "john@example.com");
      await userEvent.type(messageInput, "This is the first test message that is long enough");
      await userEvent.click(submitButton);

      // Wait for success state
      await waitFor(
        async () => {
          const thankYouMessage = canvas.getByText(/thank you for your message/i);
          await expect(thankYouMessage).toBeVisible();
        },
        { timeout: 3000 }
      );
    });

    await step("Click send another message", async () => {
      const sendAnotherButton = canvas.getByRole("button", { name: /send another message/i });
      await userEvent.click(sendAnotherButton);

      // Wait for form to reappear
      await waitFor(async () => {
        const nameInput = canvas.getByLabelText(/username/i);
        await expect(nameInput).toBeVisible();
      });
    });

    await step("Second submission with new data", async () => {
      // Clear the mock to check second call
      (args.onSubmitAction as ReturnType<typeof fn>).mockClear();

      const nameInput = canvas.getByLabelText(/username/i);
      const emailInput = canvas.getByLabelText(/email/i);
      const messageInput = canvas.getByLabelText(/message/i);
      const submitButton = canvas.getByRole("button", { name: /send message/i });

      // Fill form again with different data
      await userEvent.type(nameInput, "Jane Smith");
      await userEvent.type(emailInput, "jane@example.com");
      await userEvent.type(messageInput, "This is the second test message that should also work fine");

      // Submit again
      await userEvent.click(submitButton);
    });

    await step("Verify second submission succeeded", async () => {
      await waitFor(async () => {
        await expect(args.onSubmitAction).toHaveBeenCalledWith({
          name: "Jane Smith",
          email: "jane@example.com",
          message: "This is the second test message that should also work fine",
          website: ""
        });
      });
    });

    await step("Verify success state shown again", async () => {
      await waitFor(async () => {
        const thankYouMessage = canvas.getByText(/thank you for your message/i);
        await expect(thankYouMessage).toBeVisible();
      });
    });
  }
);

// Test 6: Field validation - name
ContactForm_.test("Validates name field correctly", async ({ canvas, step, userEvent }) => {
  const nameInput = canvas.getByLabelText(/username/i);
  const submitButton = canvas.getByRole("button", { name: /send message/i });

  await step("Test short name", async () => {
    await userEvent.type(nameInput, "J");
    await userEvent.click(submitButton);

    await waitFor(async () => {
      const error = canvas.getByText(/name must be at least 2 characters/i);
      await expect(error).toBeVisible();
    });
  });
});

// Test 7: Field validation - email
ContactForm_.test("Validates email field correctly", async ({ canvas, args, step, userEvent }) => {
  const emailInput = canvas.getByLabelText(/email/i);
  const nameInput = canvas.getByLabelText(/username/i);
  const messageInput = canvas.getByLabelText(/message/i);
  const submitButton = canvas.getByRole("button", { name: /send message/i });

  await step("Test invalid email format prevents submission", async () => {
    // Fill other fields validly
    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "invalid-email");
    await userEvent.type(messageInput, "This is a valid test message that is long enough");
    await userEvent.click(submitButton);

    // Wait and verify the action was NOT called
    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(args.onSubmitAction).not.toHaveBeenCalled();
  });
});

// Test 8: Field validation - message
ContactForm_.test("Validates message field correctly", async ({ canvas, step, userEvent }) => {
  const messageInput = canvas.getByLabelText(/message/i);
  const submitButton = canvas.getByRole("button", { name: /send message/i });

  await step("Test short message", async () => {
    await userEvent.type(messageInput, "Short");
    await userEvent.click(submitButton);

    await waitFor(async () => {
      const error = canvas.getByText(/message must be at least 10 characters/i);
      await expect(error).toBeVisible();
    });
  });
});

// Test 9: Honeypot field (anti-spam)
ContactForm_.test("Honeypot field is hidden from users", async ({ canvas }) => {
  const honeypotField = canvas.queryByLabelText(/website/i);

  // Honeypot should exist but be hidden
  await expect(honeypotField).not.toBeVisible();
});

// Test 10: Loading state
ContactForm_.test("Shows loading state during submission", async ({ canvas, args, step, userEvent }) => {
  // Mock slow submission (2 seconds)
  (args.onSubmitAction as ReturnType<typeof fn>).mockImplementation(
    async () =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              success: true as const,
              data: { id: "test-id" } as CreateEmailResponseSuccess
            }),
          2000
        )
      )
  );

  const nameInput = canvas.getByLabelText(/username/i);
  const emailInput = canvas.getByLabelText(/email/i);
  const messageInput = canvas.getByLabelText(/message/i);
  const submitButton = canvas.getByRole("button", { name: /send message/i });

  await step("Fill and submit form", async () => {
    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(messageInput, "This is a test message that is long enough");
    await userEvent.click(submitButton);
  });

  await step("Verify loading state", async () => {
    await waitFor(
      async () => {
        await expect(submitButton).toBeDisabled();
      },
      { timeout: 1000 }
    );
  });

  await step("Wait for submission to complete", async () => {
    await waitFor(
      async () => {
        const thankYouMessage = canvas.queryByText(/thank you for your message/i);
        await expect(thankYouMessage).toBeVisible();
      },
      { timeout: 3000 }
    );
  });
});

// Test 11: Error handling
ContactForm_.test("Handles submission error gracefully", async ({ canvas, args, step, userEvent }) => {
  // Mock error response
  (args.onSubmitAction as ReturnType<typeof fn>).mockImplementation(async () => ({
    success: false as const,
    error: "Failed to send message. Please try again."
  }));

  const nameInput = canvas.getByLabelText(/username/i);
  const emailInput = canvas.getByLabelText(/email/i);
  const messageInput = canvas.getByLabelText(/message/i);
  const submitButton = canvas.getByRole("button", { name: /send message/i });

  await step("Fill and submit form", async () => {
    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");
    await userEvent.type(messageInput, "This is a test message for error handling");
    await userEvent.click(submitButton);
  });

  await step("Verify error handling", async () => {
    await waitFor(async () => {
      await expect(args.onSubmitAction).toHaveBeenCalled();
    });
  });

  await step("Form should not be cleared on error", async () => {
    await expect((nameInput as HTMLInputElement).value).toBe("John Doe");
    await expect((emailInput as HTMLInputElement).value).toBe("john@example.com");
  });
});
