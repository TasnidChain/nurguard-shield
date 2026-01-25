import { useEffect, useState } from 'react';
import { useSearchParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const [downloadUrl, setDownloadUrl] = useState('');
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get order ID from URL params
    const orderId = searchParams.get('order_id');
    const userEmail = searchParams.get('email');

    if (orderId && userEmail) {
      setEmail(userEmail);
      // Generate download URL (would be from backend in production)
      setDownloadUrl(`https://nurguard-shield.manus.space/downloads/nurguard-v1.0.0.apk`);

      // Send APK link via email (backend call)
      sendEmailWithDownloadLink(userEmail, orderId);
    }
  }, [searchParams]);

  const sendEmailWithDownloadLink = async (email: string, orderId: string) => {
    try {
      await fetch('/api/trpc/system.sendDownloadEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'system.sendDownloadEmail',
          params: { email, orderId }
        })
      });
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAPK = () => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'nurguard-shield.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Success header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full mb-6">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Payment Successful!</h1>
          <p className="text-gray-400 text-lg">
            Your NurGuard Shield subscription is now active. Download the app to get started.
          </p>
        </div>

        {/* Download card */}
        <Card className="bg-gray-900 border-gray-800 mb-8 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">📱 Download NurGuard Shield</h2>
            <p className="text-gray-400">
              Get the Android app and start protecting your digital purity today.
            </p>
          </div>

          {/* Download options */}
          <div className="space-y-4 mb-8">
            {/* Direct download */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-4">Option 1: Direct Download</h3>
              <Button
                onClick={downloadAPK}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg"
              >
                ⬇️ Download APK (v1.0.0)
              </Button>
              <p className="text-sm text-gray-400 mt-3">
                File size: ~45 MB | Requires Android 7.0+
              </p>
            </div>

            {/* QR code */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-4">Option 2: QR Code</h3>
              <div className="flex justify-center bg-white p-4 rounded-lg mb-4">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(downloadUrl)}`}
                  alt="Download QR Code"
                  className="w-48 h-48"
                />
              </div>
              <p className="text-sm text-gray-400 text-center">
                Scan with your phone to download instantly
              </p>
            </div>

            {/* Copy link */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-4">Option 3: Copy Link</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={downloadUrl}
                  readOnly
                  className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
                />
                <Button
                  onClick={copyToClipboard}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </Button>
              </div>
            </div>
          </div>

          {/* Email confirmation */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-8">
            <p className="text-emerald-400 text-sm">
              ✓ Download link sent to <strong>{email}</strong>
            </p>
          </div>

          {/* Setup instructions */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="font-semibold text-white mb-4">📋 Setup Instructions</h3>
            <ol className="space-y-3 text-gray-300 text-sm">
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold">1.</span>
                <span>Download the APK file to your Android device</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold">2.</span>
                <span>Open the file and tap "Install" (you may need to enable unknown sources)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold">3.</span>
                <span>Launch NurGuard Shield and complete the 4-step setup</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold">4.</span>
                <span>Grant accessibility permissions and enable protection</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 font-bold">5.</span>
                <span>Configure your sacred hours and time budgets</span>
              </li>
            </ol>
          </div>
        </Card>

        {/* Next steps */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800 p-6">
            <h3 className="font-semibold text-white mb-3">❓ Need Help?</h3>
            <p className="text-gray-400 text-sm mb-4">
              Check our setup guide or contact support if you have any questions.
            </p>
              <a href="/support" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  View Support
                </Button>
              </a>
          </Card>

          <Card className="bg-gray-900 border-gray-800 p-6">
            <h3 className="font-semibold text-white mb-3">📖 Learn More</h3>
            <p className="text-gray-400 text-sm mb-4">
              Understand how NurGuard protects your digital purity.
            </p>
            <a href="/how-it-works" className="w-full">
              <Button
                variant="outline"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                How It Works
              </Button>
            </a>
          </Card>
        </div>

        {/* Account info */}
        <Card className="bg-gray-900 border-gray-800 p-6">
          <h3 className="font-semibold text-white mb-4">📊 Your Subscription</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Plan:</span>
              <span className="text-white font-semibold">Annual ($33/year)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-emerald-400 font-semibold">✓ Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Renews:</span>
              <span className="text-white">
                {new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}
              </span>
            </div>
            <div className="pt-3 border-t border-gray-800">
              <a href="/app" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 text-sm"
                >
                  Go to Dashboard
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
