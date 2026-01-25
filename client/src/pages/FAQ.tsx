import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Will this block Instagram and adult content?",
      answer:
        "Yes. NurGuard blocks Instagram, TikTok, Twitter, YouTube, and major browsers on Android. On iOS, it filters adult websites and gambling sites via DNS. You can also set time limits so these apps are only accessible during specific hours.",
    },
    {
      question: "Is this safe for my phone?",
      answer:
        "Completely. NurGuard uses Android's built-in Accessibility Service (the same system your phone uses for accessibility features) and iOS's Network Extension (used by VPN apps). We don't modify your system or install anything invasive. Your phone stays secure.",
    },
    {
      question: "Do you track my browsing?",
      answer:
        "No. NurGuard does not log, sell, or store your browsing history. DNS filtering happens securely on your device. We only collect the minimum data needed to keep protection active. Your privacy is protected by design.",
    },
    {
      question: "What happens after I pay?",
      answer:
        "After checkout, you'll receive a download link for the NurGuard app. Install it on your phone, complete the 2-minute setup (enable permissions and add DNS servers), and protection is active immediately. You'll see the Niyyah Gate the first time you try to open a blocked app.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-400">
              Everything you need to know about NurGuard
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-800 rounded-lg overflow-hidden hover:border-emerald-500/50 transition"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-900/50 transition"
                  >
                    <span className="text-lg font-semibold text-left">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-emerald-500 transition-transform ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openIndex === index && (
                    <div className="px-6 py-4 bg-gray-900/30 border-t border-gray-800">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 p-8 bg-gradient-to-r from-emerald-900/20 to-emerald-800/20 border border-emerald-500/30 rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-gray-400 mb-4">
                We're here to help. Reach out anytime.
              </p>
              <a
                href="/contact"
                className="inline-block px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
