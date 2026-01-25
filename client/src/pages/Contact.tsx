import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In production, this would call your backend API
      // For now, we'll just show a success message
      console.log("Contact form submitted:", { name, email, message });
      
      toast.success("Message sent! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navigation />

      <section className="container max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold text-white">Get in Touch</h1>
          <p className="text-slate-300">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                <a href="mailto:support@nurguard.app" className="text-emerald-400 hover:text-emerald-300">
                  support@nurguard.app
                </a>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2">Response Time</h3>
                <p className="text-slate-300">We typically respond within 24 hours</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2">What We Help With</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Setup and installation help</li>
                  <li>• Technical issues</li>
                  <li>• Billing questions</li>
                  <li>• Feature requests</li>
                  <li>• General inquiries</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-slate-300">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="bg-slate-900 border-slate-700 text-white placeholder-slate-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="bg-slate-900 border-slate-700 text-white placeholder-slate-500"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-slate-300">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 resize-none"
                    rows={5}
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Quick Answers</h2>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6 space-y-2">
              <h3 className="font-bold text-white">How long does setup take?</h3>
              <p className="text-slate-300">Usually 5-10 minutes. Check our Setup Guide for step-by-step instructions.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6 space-y-2">
              <h3 className="font-bold text-white">Can I get a refund?</h3>
              <p className="text-slate-300">Yes. 30-day money-back guarantee, no questions asked.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6 space-y-2">
              <h3 className="font-bold text-white">Does it work on all devices?</h3>
              <p className="text-slate-300">Yes. One subscription covers phones, tablets, laptops, and computers.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="pt-6 space-y-2">
              <h3 className="font-bold text-white">Do you track my data?</h3>
              <p className="text-slate-300">No. We don't track browsing, sell data, or use ads. See our Privacy Policy for details.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
