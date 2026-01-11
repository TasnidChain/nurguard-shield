import { ENV } from './_core/env';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send email using Manus built-in email service
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const response = await fetch(`${ENV.forgeApiUrl}/email/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ENV.forgeApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: options.to,
        subject: options.subject,
        html: options.html,
        from: 'NurGuard Shield <noreply@nurguard.app>',
      }),
    });

    if (!response.ok) {
      console.error('[Email] Failed to send:', response.statusText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[Email] Error:', error);
    return false;
  }
}

/**
 * Send setup instructions email after payment
 */
export async function sendSetupInstructionsEmail(
  email: string,
  userName: string,
  setupUrl: string
): Promise<boolean> {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #10b981; margin-bottom: 24px;">Welcome to NurGuard Shield! 🛡️</h1>
      
      <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 16px;">
        Hi ${userName},
      </p>
      
      <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 24px;">
        Your subscription is now active! Your digital protection is ready to activate.
      </p>
      
      <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; margin-bottom: 24px;">
        <h3 style="color: #10b981; margin-top: 0;">Next Step: Configure Your Device</h3>
        <p style="margin: 0; color: #333;">
          Click the button below to set up DNS protection on your device. It takes just 2 minutes.
        </p>
      </div>
      
      <a href="${setupUrl}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-bottom: 24px;">
        Start Device Setup
      </a>
      
      <div style="background: #f3f4f6; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
        <h4 style="margin-top: 0; color: #333;">What's Included:</h4>
        <ul style="margin: 8px 0; padding-left: 20px; color: #666;">
          <li>DNS-level protection on all devices</li>
          <li>Blocks explicit content, malware, trackers</li>
          <li>Works on WiFi and mobile data</li>
          <li>No app slowdown or battery drain</li>
        </ul>
      </div>
      
      <p style="font-size: 14px; color: #666; margin-bottom: 8px;">
        Questions? Check our <a href="https://nurguard.app/faq" style="color: #10b981; text-decoration: none;">FAQ</a> or <a href="https://nurguard.app/contact" style="color: #10b981; text-decoration: none;">contact us</a>.
      </p>
      
      <p style="font-size: 12px; color: #999; margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
        NurGuard Shield • The Digital Guardian for the Modern Believer
      </p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: '🛡️ Your NurGuard Shield is Ready – Setup Instructions Inside',
    html,
  });
}

/**
 * Send payout confirmation email
 */
export async function sendPayoutConfirmationEmail(
  email: string,
  userName: string,
  amount: number,
  paymentMethod: string
): Promise<boolean> {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #10b981; margin-bottom: 24px;">Payout Request Confirmed ✓</h1>
      
      <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 16px;">
        Hi ${userName},
      </p>
      
      <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 24px;">
        Your payout request has been received and is being processed.
      </p>
      
      <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; margin-bottom: 24px;">
        <h3 style="color: #10b981; margin-top: 0;">Payout Details</h3>
        <p style="margin: 8px 0; color: #333;"><strong>Amount:</strong> $${amount.toFixed(2)}</p>
        <p style="margin: 8px 0; color: #333;"><strong>Method:</strong> ${paymentMethod}</p>
        <p style="margin: 8px 0; color: #333;"><strong>Status:</strong> Processing</p>
      </div>
      
      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 24px;">
        <p style="margin: 0; color: #92400e;">
          <strong>⏱️ Processing Time:</strong> 5-7 business days
        </p>
      </div>
      
      <p style="font-size: 14px; color: #666; margin-bottom: 24px;">
        You'll receive another email once your payout has been sent.
      </p>
      
      <p style="font-size: 14px; color: #666; margin-bottom: 8px;">
        Questions? <a href="https://nurguard.app/contact" style="color: #10b981; text-decoration: none;">Contact us</a>.
      </p>
      
      <p style="font-size: 12px; color: #999; margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
        NurGuard Shield • Earn 30% by protecting others
      </p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: '✓ Payout Request Confirmed – $' + amount.toFixed(2),
    html,
  });
}

/**
 * Send weekly digest of blocked attempts
 */
export async function sendWeeklyDigestEmail(
  email: string,
  userName: string,
  stats: {
    totalBlocked: number;
    topCategories: Array<{ name: string; count: number }>;
    devicesProtected: number;
  }
): Promise<boolean> {
  const topCategoriesHtml = stats.topCategories
    .map((cat) => `<li>${cat.name}: <strong>${cat.count}</strong> blocked</li>`)
    .join('');

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #10b981; margin-bottom: 24px;">Your Weekly NurGuard Report 📊</h1>
      
      <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 16px;">
        Hi ${userName},
      </p>
      
      <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 24px;">
        Here's what NurGuard protected you from this week:
      </p>
      
      <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; margin-bottom: 24px;">
        <h3 style="color: #10b981; margin-top: 0;">This Week's Stats</h3>
        <p style="margin: 8px 0; color: #333; font-size: 24px; font-weight: bold;">${stats.totalBlocked}</p>
        <p style="margin: 0; color: #666;">harmful requests blocked</p>
      </div>
      
      <div style="background: #f3f4f6; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
        <h4 style="margin-top: 0; color: #333;">Top Blocked Categories:</h4>
        <ul style="margin: 8px 0; padding-left: 20px; color: #666;">
          ${topCategoriesHtml}
        </ul>
      </div>
      
      <p style="font-size: 14px; color: #666; margin-bottom: 24px;">
        <strong>Devices Protected:</strong> ${stats.devicesProtected}
      </p>
      
      <a href="https://nurguard.app/dashboard" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-bottom: 24px;">
        View Full Dashboard
      </a>
      
      <p style="font-size: 12px; color: #999; margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
        NurGuard Shield • Guard your Nur • Built for Muslims, useful for everyone
      </p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject: '📊 Your Weekly NurGuard Report – ' + stats.totalBlocked + ' Threats Blocked',
    html,
  });
}
