// app/terms/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FileText, Shield, Scale } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Terms of Service" }]}
      /> */}

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 mx-auto mb-6">
            <Scale className="h-8 w-8 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-[#888888] text-lg">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Content */}
        <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-2xl shadow-black/40">
          <CardContent className="p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                By accessing and using Skill Synth ("Service"), you accept and
                agree to be bound by the terms and provision of this agreement.
                If you do not agree to these Terms of Service, please do not use
                our Service.
              </p>
            </section>

            {/* Use of Service */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Use of Service
              </h2>
              <div className="space-y-4">
                <p className="text-[#CCCCCC] leading-relaxed">
                  You agree to use the Service only for lawful purposes and in
                  accordance with these Terms. You agree not to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#CCCCCC] ml-4">
                  <li>
                    Use the Service in any way that violates any applicable
                    federal, state, local, or international law
                  </li>
                  <li>
                    Attempt to gain unauthorized access to any portion of the
                    Service
                  </li>
                  <li>
                    Interfere with or disrupt the Service or servers or networks
                    connected to the Service
                  </li>
                  <li>
                    Use any automated system to access the Service in a manner
                    that sends more requests than a human can produce
                  </li>
                  <li>Share your account credentials with any third party</li>
                </ul>
              </div>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                3. User Accounts
              </h2>
              <div className="space-y-4">
                <p className="text-[#CCCCCC] leading-relaxed">
                  When you create an account with us, you must provide accurate,
                  complete, and current information. Failure to do so
                  constitutes a breach of the Terms.
                </p>
                <p className="text-[#CCCCCC] leading-relaxed">
                  You are responsible for safeguarding the password that you use
                  to access the Service and for any activities or actions under
                  your password.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Intellectual Property
              </h2>
              <div className="space-y-4">
                <p className="text-[#CCCCCC] leading-relaxed">
                  The Service and its original content, features, and
                  functionality are owned by Skill Synth and are protected by
                  international copyright, trademark, patent, trade secret, and
                  other intellectual property laws.
                </p>
                <p className="text-[#CCCCCC] leading-relaxed">
                  You retain all rights to the content you submit, post, or
                  display on or through the Service. By submitting content, you
                  grant us a worldwide, non-exclusive, royalty-free license to
                  use, reproduce, and display such content.
                </p>
              </div>
            </section>

            {/* Subscriptions and Payments */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                5. Subscriptions and Payments
              </h2>
              <div className="space-y-4">
                <p className="text-[#CCCCCC] leading-relaxed">
                  Some parts of the Service are billed on a subscription basis.
                  You will be billed in advance on a recurring and periodic
                  basis.
                </p>
                <p className="text-[#CCCCCC] leading-relaxed">
                  A valid payment method is required to process the payment for
                  your subscription. You shall provide accurate and complete
                  billing information.
                </p>
                <p className="text-[#CCCCCC] leading-relaxed">
                  Subscriptions automatically renew unless canceled before the
                  renewal date. You may cancel your subscription at any time
                  through your account settings.
                </p>
              </div>
            </section>

            {/* Refund Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Refund Policy
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                We offer a 14-day money-back guarantee for new subscriptions.
                Refund requests must be submitted within 14 days of the initial
                purchase. Refunds are not available for renewal payments.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Termination
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                We may terminate or suspend your account immediately, without
                prior notice or liability, for any reason whatsoever, including
                without limitation if you breach the Terms. Upon termination,
                your right to use the Service will immediately cease.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                In no event shall Skill Synth, nor its directors, employees,
                partners, agents, suppliers, or affiliates, be liable for any
                indirect, incidental, special, consequential, or punitive
                damages, including without limitation, loss of profits, data,
                use, goodwill, or other intangible losses.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Changes to Terms
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                We reserve the right to modify or replace these Terms at any
                time. We will provide notice of any significant changes by
                posting the new Terms on this page and updating the "Last
                updated" date.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                10. Contact Us
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                If you have any questions about these Terms, please contact us
                at{" "}
                <a
                  href="mailto:legal@skillsynth.com"
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  legal@skillsynth.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
