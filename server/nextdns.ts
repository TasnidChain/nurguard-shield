/**
 * NextDNS API Integration
 * Handles per-user profile creation, management, and analytics
 */

import { ENV } from "./_core/env";

const env = ENV;

const NEXTDNS_API_BASE = "https://api.nextdns.io";
const NEXTDNS_DNS_BASE = "https://dns.nextdns.io";

interface NextDNSProfile {
  id: string;
  name: string;
  created: string;
  updated: string;
  settings?: {
    blockPage?: boolean;
    logging?: boolean;
    threatIntelligenceFeeds?: boolean;
  };
}

interface NextDNSAnalytics {
  blocked: number;
  allowed: number;
  categories: Record<string, number>;
  topBlockedDomains: Array<{ domain: string; count: number }>;
  devices: Array<{ name: string; lastSeen: string; status: "online" | "offline" }>;
}

/**
 * Create a new NextDNS profile for a user
 */
export async function createNextDNSProfile(
  userId: string,
  userName: string
): Promise<{ profileId: string; dnsEndpoint: string }> {
  try {
    const response = await fetch(`${NEXTDNS_API_BASE}/profiles`, {
      method: "POST",
      headers: {
        "X-Api-Key": env.nextdnsApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `NurGuard - ${userName}`,
        description: `Auto-created profile for NurGuard user ${userId}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`NextDNS API error: ${response.statusText}`);
    }

    const profile = (await response.json()) as NextDNSProfile;

    return {
      profileId: profile.id,
      dnsEndpoint: `${profile.id}.dns.nextdns.io`,
    };
  } catch (error) {
    console.error("Failed to create NextDNS profile:", error);
    throw error;
  }
}

/**
 * Delete a NextDNS profile when subscription ends
 */
export async function deleteNextDNSProfile(profileId: string): Promise<boolean> {
  try {
    const response = await fetch(`${NEXTDNS_API_BASE}/profiles/${profileId}`, {
      method: "DELETE",
      headers: {
        "X-Api-Key": env.nextdnsApiKey,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to delete NextDNS profile:", error);
    throw error;
  }
}

/**
 * Update profile settings (blocklists, logging, etc.)
 */
export async function updateNextDNSProfileSettings(
  profileId: string,
  settings: {
    blockAdult?: boolean;
    blockGambling?: boolean;
    blockSocialMedia?: boolean;
    blockTrackers?: boolean;
    logging?: boolean;
  }
): Promise<NextDNSProfile> {
  try {
    const response = await fetch(`${NEXTDNS_API_BASE}/profiles/${profileId}`, {
      method: "PATCH",
      headers: {
        "X-Api-Key": env.nextdnsApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        settings: {
          logging: settings.logging !== false,
          threatIntelligenceFeeds: true,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`NextDNS API error: ${response.statusText}`);
    }

    return (await response.json()) as NextDNSProfile;
  } catch (error) {
    console.error("Failed to update NextDNS profile settings:", error);
    throw error;
  }
}

/**
 * Get analytics for a profile (blocked requests, categories, devices)
 */
export async function getNextDNSAnalytics(
  profileId: string,
  period: "1h" | "24h" | "7d" = "24h"
): Promise<NextDNSAnalytics> {
  try {
    const response = await fetch(
      `${NEXTDNS_API_BASE}/profiles/${profileId}/analytics?period=${period}`,
      {
        headers: {
          "X-Api-Key": env.nextdnsApiKey,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`NextDNS API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Transform NextDNS response to NurGuard format
    return {
      blocked: data.stats?.blocked || 0,
      allowed: data.stats?.allowed || 0,
      categories: data.categories || {},
      topBlockedDomains: data.topBlockedDomains || [],
      devices: data.devices || [],
    };
  } catch (error) {
    console.error("Failed to fetch NextDNS analytics:", error);
    throw error;
  }
}

/**
 * Get device status for a profile
 */
export async function getNextDNSDevices(profileId: string): Promise<
  Array<{
    name: string;
    ip: string;
    status: "online" | "offline";
    lastSeen: string;
  }>
> {
  try {
    const response = await fetch(`${NEXTDNS_API_BASE}/profiles/${profileId}/devices`, {
      headers: {
        "X-Api-Key": env.nextdnsApiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`NextDNS API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.devices || [];
  } catch (error) {
    console.error("Failed to fetch NextDNS devices:", error);
    throw error;
  }
}

/**
 * Get DNS configuration endpoint for a device
 * Supports iOS, Android, Windows, macOS, Linux
 */
export function getDeviceDNSConfig(
  profileId: string,
  platform: "ios" | "android" | "windows" | "macos" | "linux",
  deviceName?: string
): {
  endpoint: string;
  instructions: string;
} {
  const encodedDeviceName = deviceName ? encodeURIComponent(deviceName) : "";

  const configs = {
    ios: {
      endpoint: `https://dns.nextdns.io/${profileId}${encodedDeviceName ? `?name=${encodedDeviceName}` : ""}`,
      instructions:
        "Install DNS-over-HTTPS profile via Settings → VPN & Device Management → DNS",
    },
    android: {
      endpoint: `${profileId}.dns.nextdns.io${encodedDeviceName ? `?name=${encodedDeviceName}` : ""}`,
      instructions:
        "Configure Private DNS in Settings → Network & Internet → Private DNS",
    },
    windows: {
      endpoint: `https://dns.nextdns.io/${profileId}${encodedDeviceName ? `?name=${encodedDeviceName}` : ""}`,
      instructions:
        "Configure DNS in Network Settings → Change adapter options → IPv4 Properties",
    },
    macos: {
      endpoint: `https://dns.nextdns.io/${profileId}${encodedDeviceName ? `?name=${encodedDeviceName}` : ""}`,
      instructions:
        "Configure DNS in System Preferences → Network → Advanced → DNS",
    },
    linux: {
      endpoint: `https://dns.nextdns.io/${profileId}${encodedDeviceName ? `?name=${encodedDeviceName}` : ""}`,
      instructions: "Configure DNS in /etc/resolv.conf or network manager",
    },
  };

  return configs[platform];
}

/**
 * Verify API key is valid
 */
export async function verifyNextDNSAPIKey(): Promise<boolean> {
  try {
    const response = await fetch(`${NEXTDNS_API_BASE}/profiles`, {
      method: "GET",
      headers: {
        "X-Api-Key": env.nextdnsApiKey,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to verify NextDNS API key:", error);
    return false;
  }
}
