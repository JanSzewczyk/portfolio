import { beforeAll, vi } from "vitest";

import preview from "../../.storybook/preview";

// Mock server actions that import Resend (browser incompatible)
vi.mock("~/features/contact/server/actions/send-contact-email", () => ({
  sendContactEmail: vi.fn(async () => ({
    data: { id: "mock-email-id" },
    success: true
  }))
}));

// Mock Sanity Live (uses server-side env vars)
vi.mock("~/lib/sanity/live", () => ({
  SanityLive: () => null,
  sanityFetch: vi.fn(async () => ({
    data: null
  }))
}));

// Mock Sanity image URL builder to avoid environment variable issues in tests
// Supports chained API: urlFor().auto().width().height().url()
const mockUrlBuilder = {
  auto: vi.fn(() => mockUrlBuilder),
  height: vi.fn(() => mockUrlBuilder),
  url: vi.fn(() => "https://example.com/mock-image.jpg"),
  width: vi.fn(() => mockUrlBuilder)
};

vi.mock("~/lib/sanity/image", () => ({
  urlFor: vi.fn(() => mockUrlBuilder)
}));

beforeAll(preview.composed.beforeAll);
