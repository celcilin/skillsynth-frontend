// app/privacy/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Shield, Lock, Eye, Database, Bell, Globe } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}
      /> */}

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 mx-auto mb-6">
            <Shield className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-[#888888] text-lg">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F]">
            <CardContent className="p-6 text-center">
              <Lock className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">
                Data Encryption
              </h3>
              <p className="text-xs text-[#888888]">
                All data is encrypted in transit and at rest
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F]">
            <CardContent className="p-6 text-center">
              <Eye className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">
                No Selling
              </h3>
              <p className="text-xs text-[#888888]">
                We never sell your personal data
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F]">
            <CardContent className="p-6 text-center">
              <Database className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white mb-2">
                Your Control
              </h3>
              <p className="text-xs text-[#888888]">Delete your data anytime</p>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-2xl shadow-black/40">
          <CardContent className="p-8 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                1. Introduction
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                Skill Synth ("we," "our," or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our
                Service.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                2. Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Database className="w-5 h-5 text-purple-400" />
                    Personal Information
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-[#CCCCCC] ml-6">
                    <li>Name and email address</li>
                    <li>Account credentials</li>
                    <li>Profile information</li>
                    <li>Payment and billing information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-400" />
                    Usage Information
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-[#CCCCCC] ml-6">
                    <li>Learning progress and activity</li>
                    <li>Roadmaps created and followed</li>
                    <li>Projects completed</li>
                    <li>Assessment results</li>
                    <li>Device and browser information</li>
                    <li>IP address and location data</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#CCCCCC] ml-4">
                <li>Provide, maintain, and improve our Service</li>
                <li>Personalize your learning experience</li>
                <li>Process your transactions and send related information</li>
                <li>
                  Send you technical notices, updates, and support messages
                </li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve our Service</li>
                <li>Detect, prevent, and address technical issues and fraud</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                4. Information Sharing and Disclosure
              </h2>
              <div className="space-y-4">
                <p className="text-[#CCCCCC] leading-relaxed">
                  We do not sell, trade, or rent your personal information to
                  third parties. We may share your information in the following
                  circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#CCCCCC] ml-4">
                  <li>
                    <strong className="text-white">Service Providers:</strong>{" "}
                    With third-party vendors who perform services on our behalf
                    (e.g., payment processing, analytics)
                  </li>
                  <li>
                    <strong className="text-white">Legal Requirements:</strong>{" "}
                    When required by law or to protect our rights
                  </li>
                  <li>
                    <strong className="text-white">Business Transfers:</strong>{" "}
                    In connection with a merger, acquisition, or sale of assets
                  </li>
                  <li>
                    <strong className="text-white">With Your Consent:</strong>{" "}
                    When you explicitly agree to share your information
                  </li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-green-400" />
                5. Data Security
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                We implement appropriate technical and organizational security
                measures to protect your personal information. This includes
                encryption of data in transit and at rest, regular security
                assessments, and access controls. However, no method of
                transmission over the Internet is 100% secure.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                6. Data Retention
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                We retain your personal information for as long as necessary to
                provide our Service and fulfill the purposes outlined in this
                Privacy Policy. When you delete your account, we will delete or
                anonymize your personal information within 30 days, except where
                we are required to retain it by law.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                7. Your Rights and Choices
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed mb-4">
                You have the following rights regarding your personal
                information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#CCCCCC] ml-4">
                <li>
                  <strong className="text-white">Access:</strong> Request a copy
                  of your personal information
                </li>
                <li>
                  <strong className="text-white">Correction:</strong> Update or
                  correct inaccurate information
                </li>
                <li>
                  <strong className="text-white">Deletion:</strong> Request
                  deletion of your personal information
                </li>
                <li>
                  <strong className="text-white">Export:</strong> Download your
                  data in a portable format
                </li>
                <li>
                  <strong className="text-white">Opt-out:</strong> Unsubscribe
                  from marketing communications
                </li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                8. Cookies and Tracking Technologies
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                We use cookies and similar tracking technologies to track
                activity on our Service. You can instruct your browser to refuse
                all cookies or to indicate when a cookie is being sent. However,
                if you do not accept cookies, some features of our Service may
                not function properly.
              </p>
            </section>

            {/* Third-Party Links */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                9. Third-Party Links
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                Our Service may contain links to third-party websites. We are
                not responsible for the privacy practices of these external
                sites. We encourage you to read their privacy policies.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                10. Children's Privacy
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                Our Service is not intended for children under 13 years of age.
                We do not knowingly collect personal information from children
                under 13. If you are a parent or guardian and believe your child
                has provided us with personal information, please contact us.
              </p>
            </section>

            {/* International Users */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-400" />
                11. International Data Transfers
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                Your information may be transferred to and maintained on servers
                located outside of your state, province, country, or other
                governmental jurisdiction. We ensure appropriate safeguards are
                in place for such transfers.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                12. Changes to This Privacy Policy
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. Significant
                changes will be communicated via email.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Bell className="w-6 h-6 text-purple-400" />
                13. Contact Us
              </h2>
              <p className="text-[#CCCCCC] leading-relaxed">
                If you have any questions about this Privacy Policy or our data
                practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg">
                <p className="text-[#CCCCCC]">
                  <strong className="text-white">Email:</strong>{" "}
                  <a
                    href="mailto:privacy@skillsynth.com"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    privacy@skillsynth.com
                  </a>
                </p>
                <p className="text-[#CCCCCC] mt-2">
                  <strong className="text-white">Address:</strong> Skill Synth
                  Inc., 123 Learning Street, Tech City, CA 94000
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
