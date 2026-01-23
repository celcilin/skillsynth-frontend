// app/contact/page.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  Mail,
  MessageSquare,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Loader2,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@skillsynth.com",
      link: "mailto:support@skillsynth.com",
      color: "purple",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      color: "blue",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Learning Street, Tech City, CA 94000",
      link: "https://maps.google.com",
      color: "pink",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      content: "Available Mon-Fri, 9AM-6PM PST",
      link: "#",
      color: "green",
    },
  ];

  const socialLinks = [
    { icon: Twitter, label: "Twitter", url: "https://twitter.com" },
    { icon: Github, label: "GitHub", url: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      /> */}

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 mx-auto mb-6">
            <Mail className="h-8 w-8 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-lg text-[#CCCCCC] max-w-2xl mx-auto">
            Have a question or feedback? We'd love to hear from you. Our team
            typically responds within 24 hours.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            const colorMap = {
              purple: {
                bg: "bg-purple-500/10",
                border: "border-purple-500/30",
                text: "text-purple-400",
              },
              blue: {
                bg: "bg-blue-500/10",
                border: "border-blue-500/30",
                text: "text-blue-400",
              },
              pink: {
                bg: "bg-pink-500/10",
                border: "border-pink-500/30",
                text: "text-pink-400",
              },
              green: {
                bg: "bg-green-500/10",
                border: "border-green-500/30",
                text: "text-green-400",
              },
            };
            const colors = colorMap[info.color as keyof typeof colorMap];

            return (
              <a
                key={index}
                href={info.link}
                target={info.link.startsWith("http") ? "_blank" : undefined}
                rel={
                  info.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="block"
              >
                <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] hover:border-[#3A3A3A] transition-all h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} border ${colors.border} mx-auto mb-4`}
                    >
                      <Icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2">
                      {info.title}
                    </h3>
                    <p className="text-sm text-[#888888]">{info.content}</p>
                  </CardContent>
                </Card>
              </a>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-2xl shadow-black/40">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Send us a Message
              </h2>

              {isSubmitted && (
                <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-sm text-green-400">
                    Thank you! Your message has been sent successfully. We'll
                    get back to you soon.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-[#CCCCCC] mb-2">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="border-[#2A2A2A] bg-[#1F1F1F] text-white placeholder:text-[#666666] focus:border-[#3A3A3A] focus:ring-0"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#CCCCCC] mb-2">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="border-[#2A2A2A] bg-[#1F1F1F] text-white placeholder:text-[#666666] focus:border-[#3A3A3A] focus:ring-0"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-[#CCCCCC] mb-2">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="border-[#2A2A2A] bg-[#1F1F1F] text-white placeholder:text-[#666666] focus:border-[#3A3A3A] focus:ring-0"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-[#CCCCCC] mb-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="border-[#2A2A2A] bg-[#1F1F1F] text-white placeholder:text-[#666666] focus:border-[#3A3A3A] focus:ring-0 min-h-[150px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black hover:bg-white/90 font-semibold transition-all shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/60 h-12"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="space-y-6">
            {/* Business Inquiries */}
            <Card className="border-[#2A2A2A] bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-2">
                  Business Inquiries
                </h3>
                <p className="text-[#888888] mb-4 text-sm">
                  Interested in partnerships, enterprise solutions, or bulk
                  licensing?
                </p>
                <Button
                  variant="outline"
                  asChild
                  className="w-full border-purple-500/30 bg-purple-500/10 text-white hover:bg-purple-500/20 hover:border-purple-500/50"
                >
                  <a href="mailto:business@skillsynth.com">
                    Contact Sales Team
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Support Resources */}
            <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F]">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Support Resources
                </h3>
                <div className="space-y-3">
                  <a
                    href="/docs"
                    className="block p-3 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A] hover:border-[#3A3A3A] hover:bg-[#252525] transition-all"
                  >
                    <h4 className="text-sm font-semibold text-white mb-1">
                      Documentation
                    </h4>
                    <p className="text-xs text-[#888888]">
                      Comprehensive guides and tutorials
                    </p>
                  </a>
                  <a
                    href="/community"
                    className="block p-3 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A] hover:border-[#3A3A3A] hover:bg-[#252525] transition-all"
                  >
                    <h4 className="text-sm font-semibold text-white mb-1">
                      Community Forum
                    </h4>
                    <p className="text-xs text-[#888888]">
                      Connect with other learners
                    </p>
                  </a>
                  <a
                    href="/blog"
                    className="block p-3 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A] hover:border-[#3A3A3A] hover:bg-[#252525] transition-all"
                  >
                    <h4 className="text-sm font-semibold text-white mb-1">
                      Blog & Updates
                    </h4>
                    <p className="text-xs text-[#888888]">
                      Latest news and insights
                    </p>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Social Media */}
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F]">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
              <p className="text-[#888888] mb-6 text-sm">
                Stay connected with us on social media for updates, tips, and
                community highlights.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1F1F1F] border border-[#2A2A2A] hover:border-[#3A3A3A] hover:bg-[#252525] transition-all"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-[#888888] hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          {/* FAQ Quick Links */}
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F]">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">
                Quick Answers
              </h3>
              <p className="text-[#888888] mb-6 text-sm">
                Looking for instant answers? Check out our FAQ section for
                common questions.
              </p>
              <Button
                variant="outline"
                asChild
                className="w-full border-[#2A2A2A] bg-[#1F1F1F] text-white hover:bg-[#252525] hover:border-[#3A3A3A]"
              >
                <a href="/faq">Visit FAQ</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Office Hours */}
        <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-2xl shadow-black/40 mt-8">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Office Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                    <span className="text-sm text-[#CCCCCC]">
                      Monday - Friday
                    </span>
                    <span className="text-sm font-semibold text-white">
                      9:00 AM - 6:00 PM PST
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                    <span className="text-sm text-[#CCCCCC]">Saturday</span>
                    <span className="text-sm font-semibold text-white">
                      10:00 AM - 4:00 PM PST
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                    <span className="text-sm text-[#CCCCCC]">Sunday</span>
                    <span className="text-sm font-semibold text-white">
                      Closed
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Response Time
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-green-400" />
                      <span className="text-sm font-semibold text-white">
                        Email Support
                      </span>
                    </div>
                    <p className="text-sm text-[#888888]">
                      Average response time: 2-4 hours
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-blue-400" />
                      <span className="text-sm font-semibold text-white">
                        Live Chat
                      </span>
                    </div>
                    <p className="text-sm text-[#888888]">
                      Instant responses during office hours
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-2 w-2 rounded-full bg-purple-400" />
                      <span className="text-sm font-semibold text-white">
                        Phone Support
                      </span>
                    </div>
                    <p className="text-sm text-[#888888]">
                      Premium & Enterprise customers only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#666666]">
            For urgent technical issues affecting your account, please email{" "}
            <a
              href="mailto:urgent@skillsynth.com"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              urgent@skillsynth.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
