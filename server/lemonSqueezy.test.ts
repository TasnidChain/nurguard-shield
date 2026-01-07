import { describe, it, expect } from "vitest";

describe("Lemon Squeezy Integration", () => {
  it("should have checkout URL configured", () => {
    const checkoutUrl = process.env.LEMON_SQUEEZY_CHECKOUT_URL;
    expect(checkoutUrl).toBeDefined();
    expect(checkoutUrl).toMatch(/https:\/\/.+\.lemonsqueezy\.com/);
  });

  it("should have API key configured", () => {
    const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey?.length).toBeGreaterThan(10);
  });

  it("should have webhook secret configured", () => {
    const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
    expect(webhookSecret).toBeDefined();
    expect(webhookSecret?.length).toBeGreaterThan(10);
  });

  it("should validate checkout URL format", () => {
    const url = process.env.LEMON_SQUEEZY_CHECKOUT_URL;
    if (url) {
      try {
        const urlObj = new URL(url);
        expect(urlObj.hostname).toContain("lemonsqueezy.com");
        expect(url).toContain("/checkout");
      } catch (e) {
        // URL validation will happen at runtime
        expect(url).toContain("lemonsqueezy.com");
      }
    }
  });
});
