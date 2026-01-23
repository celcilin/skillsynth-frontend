// components/landing/faq-section.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "How do personalized roadmaps work?",
    answer:
      "Our AI-powered system analyzes your career goals, current skill level, and learning preferences to create a customized learning path. The roadmap includes curated tutorials, real-world projects, and assessments tailored specifically to your needs.",
  },
  {
    question: "What are real-world GitHub projects?",
    answer:
      "These are actual open-source projects and issues from GitHub repositories. You'll work on solving real problems, contributing to live codebases, and building a portfolio that demonstrates practical experience to potential employers.",
  },
  {
    question: "How does the code review process work?",
    answer:
      "After completing a project, you submit your code for review. Our AI system provides instant feedback on code quality, best practices, and improvements. Premium and Enterprise users also get human expert reviews for more detailed insights.",
  },
  {
    question: "Can I switch between pricing plans?",
    answer:
      "Absolutely! You can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to new features. When downgrading, changes take effect at the end of your current billing cycle.",
  },
  {
    question: "What if I'm a complete beginner?",
    answer:
      "Perfect! Our platform is designed for all skill levels. We have beginner-friendly roadmaps that start from the basics and gradually progress. You'll learn through hands-on projects with step-by-step guidance and support.",
  },
  {
    question: "How long does it take to complete a roadmap?",
    answer:
      "It varies based on the roadmap complexity and your learning pace. Most roadmaps are designed to be completed in 3-6 months with consistent effort (10-15 hours per week). You can always learn at your own pace.",
  },
  // {
  //   question: "Do I get a certificate upon completion?",
  //   answer:
  //     "Yes! Upon completing a roadmap and passing all assessments, you receive a verified certificate that you can share on LinkedIn and include in your resume. You also get badges for specific skills and milestones.",
  // },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes! All plans come with a 14-day free trial. No credit card required. You get full access to explore the platform, create roadmaps, and start projects before committing to a paid plan.",
  },
];

export function FAQSection() {
  return (
    <section className="relative bg-[#0A0A0A] py-20 sm:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute right-1/2 bottom-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A2A1a_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A1a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="container relative z-10 mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-[#CCCCCC] leading-relaxed">
            Everything you need to know about building your career roadmap.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="rounded-2xl bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] p-6 sm:p-8 shadow-xl shadow-black/40">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-[#2A2A2A] last:border-b-0"
              >
                <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-white hover:text-[#CCCCCC] transition-colors py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#888888] leading-relaxed pb-5 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] p-8">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20">
              <MessageCircle className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-[#888888] mb-6">
              Can't find the answer you're looking for? Our support team is here
              to help.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="border-[#2A2A2A] bg-[#161616] text-white hover:bg-[#1F1F1F] hover:border-[#3A3A3A]"
              >
                Contact Support
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-lg shadow-purple-500/30"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <a
            href="/docs"
            className="group p-4 rounded-xl bg-[#161616] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-all hover:shadow-lg hover:shadow-black/40"
          >
            <h4 className="text-white font-semibold mb-1 group-hover:text-[#CCCCCC] transition-colors">
              Documentation
            </h4>
            <p className="text-sm text-[#888888]">
              Detailed guides and tutorials
            </p>
          </a>
          <a
            href="/community"
            className="group p-4 rounded-xl bg-[#161616] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-all hover:shadow-lg hover:shadow-black/40"
          >
            <h4 className="text-white font-semibold mb-1 group-hover:text-[#CCCCCC] transition-colors">
              Community
            </h4>
            <p className="text-sm text-[#888888]">
              Connect with other learners
            </p>
          </a>
          <a
            href="/blog"
            className="group p-4 rounded-xl bg-[#161616] border border-[#2A2A2A] hover:border-[#3A3A3A] transition-all hover:shadow-lg hover:shadow-black/40"
          >
            <h4 className="text-white font-semibold mb-1 group-hover:text-[#CCCCCC] transition-colors">
              Blog
            </h4>
            <p className="text-sm text-[#888888]">Latest tips and insights</p>
          </a>
        </div>
      </div>
    </section>
  );
}
