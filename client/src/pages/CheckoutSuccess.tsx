import { useEffect, useState } from 'react';
import { useSearchParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Download, CheckCircle2 } from 'lucide-react';

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const [downloadUrl, setDownloadUrl] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const orderId = searchParams.get('order_id');
    const userEmail = searchParams.get('email');

    if (orderId && userEmail) {
      setEmail(userEmail);
      setDownloadUrl(`https://nurguard-shield.manus.space/downloads/nurguard-v1.0.0.apk`);
      sendEmailWithDownloadLink(userEmail, orderId);
    }
  }, [searchParams]);

  const sendEmailWithDownloadLink = async (email: string, orderId: string) => {
    try {
      await fetch('/api/trpc/downloads.sendDownloadEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'downloads.sendDownloadEmail',
          params: { email, orderId }
        })
      });
    } catch (error) {
      console.error('Failed to send email:', error);
    }
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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      <Navigation />
      
      <div className="flex-1 container max-w-2xl mx-auto px-4 py-16">
        {/* Success State */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500/20 rounded-full">
            <CheckCircle2 className="h-12 w-12 text-emerald-400" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-white">
              You're all set.
            </h1>
            <p className="text-xl text-slate-300">
              NurGuard is ready. This takes about 2 minutes.
            </p>
          </div>
        </div>

        {/* Primary Action */}
        <Card className="bg-slate-800 border-slate-700 p-8 mb-8">
          <div className="space-y-6">
            <Button
              onClick={downloadAPK}
              size="lg"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-6 text-lg"
            >
              <Download className="h-5 w-5 mr-2" />
              Download NurGuard for Android
            </Button>
            
            <p className="text-center text-sm text-slate-400">
              This is the official NurGuard app. Safe to install.
            </p>
          </div>
        </Card>

        {/* What Happens Next */}
        <Card className="bg-slate-800 border-slate-700 p-8 mb-8">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white">What happens next</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">
                  1
                </div>
                <div>
                  <p className="text-slate-200">Download the app</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">
                  2
                </div>
                <div>
                  <p className="text-slate-200">Install it</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold flex-shrink-0 text-sm">
                  3
                </div>
                <div>
                  <p className="text-slate-200">Open NurGuard and follow the prompts</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-400 pt-2">That's it.</p>
          </div>
        </Card>

        {/* Reassurance Block */}
        <Card className="bg-emerald-950/50 border-emerald-700/50 p-8 mb-8">
          <div className="space-y-3">
            <h3 className="font-semibold text-emerald-300">Android may ask for permission during setup.</h3>
            <p className="text-slate-300 text-sm">
              This is normal — it's how NurGuard protects you.
            </p>
            <p className="text-slate-300 text-sm">
              We never read your messages, photos, or personal data.
            </p>
          </div>
        </Card>

        {/* Email Confirmation */}
        <div className="text-center text-sm text-slate-400">
          <p>Download link also sent to <strong className="text-slate-200">{email}</strong></p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
