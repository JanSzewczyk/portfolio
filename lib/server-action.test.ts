import { type ActionStateFailed, isActionFailed, isActionSuccess } from "~/lib/server-action";

describe("server-action type guards", () => {
  describe("isActionSuccess", () => {
    test("returns true for successful action result", () => {
      const result = {
        data: { id: "user-1", name: "Jan" },
        message: "Saved successfully",
        success: true as const
      };

      expect(isActionSuccess(result)).toBe(true);
    });

    test("returns false for failed action result", () => {
      const result: ActionStateFailed = {
        error: "Validation failed",
        success: false
      };

      expect(isActionSuccess(result)).toBe(false);
    });
  });

  describe("isActionFailed", () => {
    test("returns true for failed action result", () => {
      const result: ActionStateFailed = {
        error: "Unexpected error",
        fieldErrors: {
          email: ["Invalid email address"]
        },
        success: false
      };

      expect(isActionFailed(result)).toBe(true);
    });

    test("returns false for successful action result", () => {
      const result = {
        data: { created: true },
        success: true as const
      };

      expect(isActionFailed(result)).toBe(false);
    });
  });
});
