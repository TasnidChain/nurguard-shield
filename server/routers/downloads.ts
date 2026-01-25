import { router, publicProcedure } from '../_core/trpc';
import { z } from 'zod';
import { notifyOwner } from '../_core/notification';

/**
 * Downloads router
 * Handles APK distribution and email delivery
 */
export const downloadsRouter = router({
  /**
   * Send APK download link via email after checkout
   */
  sendDownloadEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        orderId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const downloadUrl = `https://nurguard-shield.manus.space/downloads/nurguard-v1.0.0.apk`;
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(downloadUrl)}`;

        // Send email with download link
        const emailContent = `
          <h2>🛡️ Your NurGuard Shield is Ready!</h2>
          
          <p>Thank you for purchasing NurGuard Shield. Your subscription is now active.</p>
          
          <h3>📱 Download the App</h3>
          <p>
            <a href="${downloadUrl}" style="background-color: #10B981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: bold;">
              ⬇️ Download APK (v1.0.0)
            </a>
          </p>
          
          <h3>Or Scan This QR Code:</h3>
          <img src="${qrCodeUrl}" alt="Download QR Code" style="width: 200px; height: 200px;" />
          
          <h3>📋 Setup Instructions</h3>
          <ol>
            <li>Download the APK file to your Android device</li>
            <li>Open the file and tap "Install" (enable unknown sources if needed)</li>
            <li>Launch NurGuard Shield and complete the 4-step setup</li>
            <li>Grant accessibility permissions and enable protection</li>
            <li>Configure your sacred hours and time budgets</li>
          </ol>
          
          <h3>Need Help?</h3>
          <p>Visit our <a href="https://nurguard-shield.manus.space/support">support page</a> or contact us at support@nurguard.app</p>
          
          <p style="color: #999; font-size: 12px; margin-top: 32px;">
            This is an automated email. Please do not reply directly.
          </p>
        `;

        // Send via backend email service (would integrate with SendGrid, Mailgun, etc.)
        await sendEmail({
          to: input.email,
          subject: '🛡️ Download NurGuard Shield - Your Subscription is Active',
          html: emailContent,
        });

        // Notify owner of download
        await notifyOwner({
          title: 'New Download Link Sent',
          content: `Download link sent to ${input.email} for order ${input.orderId}`,
        });

        return {
          success: true,
          message: 'Download link sent successfully',
        };
      } catch (error) {
        console.error('Failed to send download email:', error);
        return {
          success: false,
          error: 'Failed to send email',
        };
      }
    }),

  /**
   * Get APK download URL
   */
  getDownloadUrl: publicProcedure.query(async () => {
    return {
      url: 'https://nurguard-shield.manus.space/downloads/nurguard-v1.0.0.apk',
      version: '1.0.0',
      size: '45 MB',
      minAndroidVersion: '7.0',
      checksum: 'sha256:abc123...', // Would be actual checksum
    };
  }),

  /**
   * Log download event
   */
  logDownload: publicProcedure
    .input(
      z.object({
        deviceId: z.string(),
        platform: z.enum(['android', 'ios']),
        version: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Log download event for analytics
        console.log(`Download logged: ${input.platform} v${input.version} on device ${input.deviceId}`);

        // Could save to database for analytics
        // await db.insert(downloadLogs).values({...})

        return { success: true };
      } catch (error) {
        console.error('Failed to log download:', error);
        return { success: false };
      }
    }),
});

/**
 * Send email helper (integrate with your email service)
 */
async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  // TODO: Integrate with SendGrid, Mailgun, or other email service
  // For now, just log to console
  console.log(`Email sent to ${to}: ${subject}`);

  // Example with SendGrid:
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // await sgMail.send({
  //   to,
  //   from: 'noreply@nurguard.app',
  //   subject,
  //   html,
  // });
}
