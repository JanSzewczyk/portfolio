import { isActionFailed, isActionSuccess, type ActionStateFailed } from "~/lib/server-action";

describe("server-action type guards", () => {
  describe("isActionSuccess", () => {
    test("returns true for successful action result", () => {
      const result = {
        success: true as const,
        data: { id: "user-1", name: "Jan" },
        message: "Saved successfully"
      };

      expect(isActionSuccess(result)).toBe(true);
    });

    test("returns false for failed action result", () => {
      const result: ActionStateFailed = {
        success: false,
        error: "Validation failed"
      };

      expect(isActionSuccess(result)).toBe(false);
    });
  });

  describe("isActionFailed", () => {
    test("returns true for failed action result", () => {
      const result: ActionStateFailed = {
        success: false,
        error: "Unexpected error",
        fieldErrors: {
          email: ["Invalid email address"]
        }
      };

      expect(isActionFailed(result)).toBe(true);
    });

    test("returns false for successful action result", () => {
      const result = {
        success: true as const,
        data: { created: true }
      };

      expect(isActionFailed(result)).toBe(false);
    });
  });
});
