import { beforeAll, vi } from "vitest";

import preview from "../../.storybook/preview";

// Mock server actions that import Resend (browser incompatible)
vi.mock("~/features/contact/server/actions/send-contact-email", () => ({
  sendContactEmail: vi.fn(async () => ({
    success: true,
    data: { id: "mock-email-id" },
  })),
}));

// Mock Sanity Live (uses server-side env vars)
vi.mock("~/lib/sanity/live", () => ({
  sanityFetch: vi.fn(async () => ({
    data: null,
  })),
  SanityLive: () => null,
}));

// Mock Sanity image URL builder to avoid environment variable issues in tests
// Supports chained API: urlFor().auto().width().height().url()
const mockUrlBuilder = {
  auto: vi.fn(() => mockUrlBuilder),
  width: vi.fn(() => mockUrlBuilder),
  height: vi.fn(() => mockUrlBuilder),
  url: vi.fn(() => "https://example.com/mock-image.jpg"),
};

vi.mock("~/lib/sanity/image", () => ({
  urlFor: vi.fn(() => mockUrlBuilder),
}));

beforeAll(preview.composed.beforeAll);
