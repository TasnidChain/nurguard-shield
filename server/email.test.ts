import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  sendEmail,
  sendSetupInstructionsEmail,
  sendPayoutConfirmationEmail,
  sendWeeklyDigestEmail,
} from "./email";

// Mock fetch
global.fetch = vi.fn();

describe("Email Service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("sendEmail", () => {
    it("should send email with correct headers", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      const result = await sendEmail({
        to: "test@example.com",
        subject: "Test Subject",
        html: "<p>Test</p>",
      });

      expect(result).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/email/send"),
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
            "Authorization": expect.stringContaining("Bearer"),
          }),
        })
      );
    });

    it("should return false on send failure", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        statusText: "Unauthorized",
      });

      const result = await sendEmail({
        to: "test@example.com",
        subject: "Test",
        html: "<p>Test</p>",
      });

      expect(result).toBe(false);
    });

    it("should handle network errors", async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error("Network error"));

      const result = await sendEmail({
        to: "test@example.com",
        subject: "Test",
        html: "<p>Test</p>",
      });

      expect(result).toBe(false);
    });
  });

  describe("sendSetupInstructionsEmail", () => {
    it("should send setup instructions with correct content", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      const result = await sendSetupInstructionsEmail(
        "user@example.com",
        "John",
        "https://nurguard.app/setup"
      );

      expect(result).toBe(true);
      const callArgs = (global.fetch as any).mock.calls[0][1];
      expect(callArgs.body).toContain("Welcome to NurGuard Shield");
      expect(callArgs.body).toContain("John");
      expect(callArgs.body).toContain("https://nurguard.app/setup");
    });
  });

  describe("sendPayoutConfirmationEmail", () => {
    it("should send payout confirmation with amount", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      const result = await sendPayoutConfirmationEmail(
        "user@example.com",
        "Jane",
        150.5,
        "Bank Transfer"
      );

      expect(result).toBe(true);
      const callArgs = (global.fetch as any).mock.calls[0][1];
      expect(callArgs.body).toContain("Payout Request Confirmed");
      expect(callArgs.body).toContain("150.50");
      expect(callArgs.body).toContain("Bank Transfer");
    });
  });

  describe("sendWeeklyDigestEmail", () => {
    it("should send digest with stats", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      const result = await sendWeeklyDigestEmail(
        "user@example.com",
        "Ahmed",
        {
          totalBlocked: 523,
          topCategories: [
            { name: "Adult Sites", count: 200 },
            { name: "Malware", count: 150 },
          ],
          devicesProtected: 3,
        }
      );

      expect(result).toBe(true);
      const callArgs = (global.fetch as any).mock.calls[0][1];
      expect(callArgs.body).toContain("Weekly NurGuard Report");
      expect(callArgs.body).toContain("523");
      expect(callArgs.body).toContain("Adult Sites");
    });
  });
});
