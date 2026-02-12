import { beforeAll, vi } from "vitest";

import preview from "../../.storybook/preview";

// Mock server actions that import Resend (browser incompatible)
vi.mock("~/features/contact/server/actions/send-contact-email", () => ({
  sendContactEmail: vi.fn(async () => ({
    success: true,
    data: { id: "mock-email-id" }
  }))
}));

// Mock Sanity Live (uses server-side env vars)
vi.mock("~/lib/sanity/live", () => ({
  sanityFetch: vi.fn(async () => ({
    data: null
  })),
  SanityLive: () => null
}));

beforeAll(preview.composed.beforeAll);
