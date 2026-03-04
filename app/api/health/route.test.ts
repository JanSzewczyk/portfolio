import { GET } from "./route";

describe("GET /api/health", () => {
  test("should return status ok", async () => {
    const response = GET();
    const json = (await response.json()) as { status: string; timestamp: string };
    expect(response.status).toBe(200);
    expect(json).toMatchObject({ status: "ok" });
    expect(typeof json.timestamp).toBe("string");
  });
});
