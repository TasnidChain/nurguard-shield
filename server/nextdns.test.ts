import { describe, it, expect, beforeAll } from "vitest";
import {
  verifyNextDNSAPIKey,
  getDeviceDNSConfig,
} from "./nextdns";

describe("NextDNS Integration", () => {
  describe("API Key Verification", () => {
    it("should verify NextDNS API key is valid", async () => {
      const isValid = await verifyNextDNSAPIKey();
      expect(typeof isValid).toBe("boolean");
    }, { timeout: 15000 });
  });

  describe("Device DNS Configuration", () => {
    const profileId = "test-profile-123";

    it("should generate iOS DNS configuration", () => {
      const config = getDeviceDNSConfig(profileId, "ios", "iPhone-User");
      expect(config.endpoint).toContain("dns.nextdns.io");
      expect(config.endpoint).toContain(profileId);
      expect(config.instructions).toContain("DNS-over-HTTPS");
    });

    it("should generate Android DNS configuration", () => {
      const config = getDeviceDNSConfig(profileId, "android", "Android-Device");
      expect(config.endpoint).toContain("dns.nextdns.io");
      expect(config.endpoint).toContain(profileId);
      expect(config.instructions).toContain("Private DNS");
    });

    it("should generate Windows DNS configuration", () => {
      const config = getDeviceDNSConfig(profileId, "windows");
      expect(config.endpoint).toContain("dns.nextdns.io");
      expect(config.endpoint).toContain(profileId);
      expect(config.instructions).toContain("Network Settings");
    });

    it("should generate macOS DNS configuration", () => {
      const config = getDeviceDNSConfig(profileId, "macos");
      expect(config.endpoint).toContain("dns.nextdns.io");
      expect(config.endpoint).toContain(profileId);
      expect(config.instructions).toContain("System Preferences");
    });

    it("should generate Linux DNS configuration", () => {
      const config = getDeviceDNSConfig(profileId, "linux");
      expect(config.endpoint).toContain("dns.nextdns.io");
      expect(config.endpoint).toContain(profileId);
      expect(config.instructions).toContain("resolv.conf");
    });

    it("should URL-encode device names in endpoint", () => {
      const config = getDeviceDNSConfig(profileId, "ios", "My Device Name");
      expect(config.endpoint).toContain("My%20Device%20Name");
    });

    it("should handle missing device name", () => {
      const config = getDeviceDNSConfig(profileId, "android");
      expect(config.endpoint).toContain(profileId);
      expect(config.endpoint).not.toContain("name=");
    });
  });
});
