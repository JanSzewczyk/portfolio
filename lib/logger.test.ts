import { describe, it, expect, vi, beforeEach } from "vitest";

// Use vi.hoisted to create mocks that are accessible in vi.mock
const { mockChild, mockLogger } = vi.hoisted(() => {
  const mockChild = vi.fn();
  const mockLogger = {
    child: mockChild,
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
    fatal: vi.fn(),
    trace: vi.fn()
  };

  return { mockChild, mockLogger };
});

// Mock pino before importing logger
vi.mock("pino", () => {
  const mockPino = vi.fn(() => mockLogger);
  mockPino.stdTimeFunctions = {
    isoTime: vi.fn()
  };

  return {
    default: mockPino
  };
});

import { createLogger } from "./logger";
import logger from "./logger";

describe("logger", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createLogger", () => {
    it("creates a child logger with provided context", () => {
      // Arrange
      const mockChildLogger = {
        info: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        debug: vi.fn()
      };
      mockChild.mockReturnValue(mockChildLogger);

      // Act
      const context = { module: "test-module", feature: "auth" };
      const childLogger = createLogger(context);

      // Assert
      expect(mockChild).toHaveBeenCalledWith(context);
      expect(childLogger).toBe(mockChildLogger);
    });

    it("creates child logger with single context property", () => {
      // Arrange
      const mockChildLogger = { info: vi.fn() };
      mockChild.mockReturnValue(mockChildLogger);

      // Act
      const childLogger = createLogger({ requestId: "req-123" });

      // Assert
      expect(mockChild).toHaveBeenCalledWith({ requestId: "req-123" });
      expect(childLogger).toBe(mockChildLogger);
    });

    it("creates child logger with multiple context properties", () => {
      // Arrange
      const mockChildLogger = { info: vi.fn() };
      mockChild.mockReturnValue(mockChildLogger);

      // Act
      const context = {
        module: "api",
        endpoint: "/users",
        method: "GET",
        userId: 42
      };
      const childLogger = createLogger(context);

      // Assert
      expect(mockChild).toHaveBeenCalledWith(context);
      expect(childLogger).toBe(mockChildLogger);
    });

    it("creates child logger with empty context object", () => {
      // Arrange
      const mockChildLogger = { info: vi.fn() };
      mockChild.mockReturnValue(mockChildLogger);

      // Act
      const childLogger = createLogger({});

      // Assert
      expect(mockChild).toHaveBeenCalledWith({});
      expect(childLogger).toBe(mockChildLogger);
    });

    it("allows creating multiple child loggers with different contexts", () => {
      // Arrange
      const mockChildLogger1 = { info: vi.fn() };
      const mockChildLogger2 = { info: vi.fn() };
      mockChild.mockReturnValueOnce(mockChildLogger1).mockReturnValueOnce(mockChildLogger2);

      // Act
      const logger1 = createLogger({ module: "auth" });
      const logger2 = createLogger({ module: "db" });

      // Assert
      expect(mockChild).toHaveBeenCalledTimes(2);
      expect(mockChild).toHaveBeenNthCalledWith(1, { module: "auth" });
      expect(mockChild).toHaveBeenNthCalledWith(2, { module: "db" });
      expect(logger1).toBe(mockChildLogger1);
      expect(logger2).toBe(mockChildLogger2);
    });

    it("supports nested context properties", () => {
      // Arrange
      const mockChildLogger = { info: vi.fn() };
      mockChild.mockReturnValue(mockChildLogger);

      // Act
      const context = {
        service: "api",
        request: {
          id: "req-456",
          method: "POST"
        }
      };
      const childLogger = createLogger(context);

      // Assert
      expect(mockChild).toHaveBeenCalledWith(context);
    });
  });

  describe("default logger export", () => {
    it("exports default logger instance", () => {
      // Assert
      expect(logger).toBe(mockLogger);
      expect(logger).toHaveProperty("info");
      expect(logger).toHaveProperty("error");
      expect(logger).toHaveProperty("warn");
      expect(logger).toHaveProperty("debug");
    });

    it("default logger has child method", () => {
      // Assert
      expect(logger).toHaveProperty("child");
      expect(typeof logger.child).toBe("function");
    });
  });
});
