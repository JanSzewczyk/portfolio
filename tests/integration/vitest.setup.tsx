import { beforeAll, vi } from "vitest";

import preview from "../../.storybook/preview";

// `next-themes` renders an inline anti-FOUC `<script>` from its provider. In Storybook's
// client-only test render (createRoot), React 19 logs a benign "Encountered a script tag while
// rendering React component" warning, since inline scripts never execute on the client. The
// provider applies the theme class via useEffect anyway, so the script is irrelevant here — we
// filter only this exact message and pass everything else through.
const originalConsoleError = console.error;
console.error = (...args: Array<unknown>) => {
  const first = args[0];
  if (typeof first === "string" && first.includes("Encountered a script tag while rendering React component")) {
    return;
  }
  originalConsoleError(...args);
};

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
