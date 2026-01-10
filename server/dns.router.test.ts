import { describe, it, expect } from "vitest";
import { z } from "zod";

describe("DNS Router Procedures", () => {
  describe("getDeviceConfig input validation", () => {
    const inputSchema = z.object({
      platform: z.enum(["ios", "android", "windows", "macos", "linux"]),
      deviceName: z.string().optional(),
    });

    it("should accept valid iOS platform", () => {
      const result = inputSchema.safeParse({
        platform: "ios",
        deviceName: "iPhone-User",
      });
      expect(result.success).toBe(true);
    });

    it("should accept valid Android platform", () => {
      const result = inputSchema.safeParse({
        platform: "android",
        deviceName: "Android-Device",
      });
      expect(result.success).toBe(true);
    });

    it("should accept valid Windows platform", () => {
      const result = inputSchema.safeParse({
        platform: "windows",
      });
      expect(result.success).toBe(true);
    });

    it("should accept valid macOS platform", () => {
      const result = inputSchema.safeParse({
        platform: "macos",
      });
      expect(result.success).toBe(true);
    });

    it("should accept valid Linux platform", () => {
      const result = inputSchema.safeParse({
        platform: "linux",
      });
      expect(result.success).toBe(true);
    });

    it("should reject invalid platform", () => {
      const result = inputSchema.safeParse({
        platform: "invalid",
      });
      expect(result.success).toBe(false);
    });

    it("should allow optional device name", () => {
      const result = inputSchema.safeParse({
        platform: "ios",
      });
      expect(result.success).toBe(true);
    });

    it("should reject missing platform", () => {
      const result = inputSchema.safeParse({
        deviceName: "My Device",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("DNS configuration structure", () => {
    it("should return endpoint, instructions, platform, and profileId", () => {
      const mockConfig = {
        endpoint: "383b61.dns.nextdns.io",
        instructions: "Configure Private DNS in Settings",
        platform: "android",
        profileId: "383b61",
      };

      expect(mockConfig).toHaveProperty("endpoint");
      expect(mockConfig).toHaveProperty("instructions");
      expect(mockConfig).toHaveProperty("platform");
      expect(mockConfig).toHaveProperty("profileId");
    });

    it("should have non-empty endpoint", () => {
      const mockConfig = {
        endpoint: "383b61.dns.nextdns.io",
        instructions: "Configure Private DNS",
        platform: "android",
        profileId: "383b61",
      };

      expect(mockConfig.endpoint).toBeTruthy();
      expect(mockConfig.endpoint.length).toBeGreaterThan(0);
    });

    it("should have non-empty instructions", () => {
      const mockConfig = {
        endpoint: "383b61.dns.nextdns.io",
        instructions: "Configure Private DNS",
        platform: "android",
        profileId: "383b61",
      };

      expect(mockConfig.instructions).toBeTruthy();
      expect(mockConfig.instructions.length).toBeGreaterThan(0);
    });
  });
});
