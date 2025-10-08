// components/landing/pricing-section.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Sparkles, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Standard",
    price: "$20",
    period: "/month",
    description: "Focus on one Roadmap",
    features: [
      "Create 1 - 3 Roadmap",
      "Basic roadmap features",
      "Live GitHub Projects",
      "Free Code Review",
      "Free AI Assessment Review",
    ],
    icon: Sparkles,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    popular: false,
  },
  {
    name: "Premium",
    price: "$45",
    period: "/month",
    description: "Explore Multiple Roadmaps",
    features: [
      "Create 3 - 10 Roadmaps",
      "Advanced roadmap features",
      "Live GitHub Projects",
      "Priority Code Review",
      "Advanced AI Assessment Review",
      "Career Guidance",
    ],
    icon: Zap,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/10",
    borderColor: "border-blue-500/50",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$75",
    period: "/month",
    description: "For ambitious learners",
    features: [
      "Create Unlimited Roadmaps",
      "All Premium features",
      "Live GitHub Projects",
      "24/7 Code Review",
      "Priority AI Assessment Review",
      "1-on-1 Career Mentorship",
      "Custom Learning Path",
    ],
    icon: Crown,
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/10",
    borderColor: "border-pink-500/20",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section
      className="relative bg-[#0A0A0A] py-20 sm:py-32 overflow-hidden"
      id="pricing"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A2A1a_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A1a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge className="mb-4 border-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-white hover:from-purple-500/20 hover:to-blue-500/20 border border-purple-500/20 px-4 py-1.5 text-sm font-medium">
            Simple & Transparent Pricing
          </Badge>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Invest in Your{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Future Career
            </span>
          </h2>
          <p className="text-lg text-[#CCCCCC] leading-relaxed">
            Choose the perfect plan to accelerate your learning journey. All
            plans include core features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`group relative overflow-hidden border-2 transition-all duration-300 ${
                  plan.popular
                    ? "scale-105 lg:scale-110 border-blue-500/50 shadow-2xl shadow-blue-500/20"
                    : `${plan.borderColor} shadow-lg hover:shadow-xl hover:shadow-black/40`
                } bg-gradient-to-br from-[#161616] to-[#0F0F0F] hover:border-[#3A3A3A]`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500" />
                )}
                {plan.popular && (
                  <Badge className="absolute right-4 top-4 border-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="pb-8 pt-8">
                  {/* Icon */}
                  <div
                    className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${plan.iconBg} border ${plan.borderColor}`}
                  >
                    <Icon className={`h-7 w-7 ${plan.iconColor}`} />
                  </div>

                  <CardTitle className="text-2xl text-white mb-2">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-base text-[#888888]">
                    {plan.description}
                  </CardDescription>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-[#888888] text-lg">
                      {plan.period}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 pb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="h-5 w-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                            <Check className="h-3 w-3 text-green-400" />
                          </div>
                        </div>
                        <span className="text-sm text-[#CCCCCC]">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4">
                  <Button
                    className={`group/btn w-full font-semibold transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50"
                        : "border-[#2A2A2A] bg-[#1F1F1F] text-white hover:bg-[#252525] hover:border-[#3A3A3A]"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.popular ? "Start Free Trial" : "Get Started"}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardFooter>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            );
          })}
        </div>

        {/* Bottom Info Section */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] p-8 sm:p-10">
            <h3 className="text-2xl font-bold text-white mb-4">
              Not sure which plan is right for you?
            </h3>
            <p className="text-[#888888] mb-6 text-base leading-relaxed">
              All plans come with a 14-day free trial. No credit card required.
              Cancel anytime.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-[#CCCCCC]">
                <Check className="h-5 w-5 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2 text-[#CCCCCC]">
                <Check className="h-5 w-5 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-[#CCCCCC]">
                <Check className="h-5 w-5 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
            <div className="mt-8">
              <Button
                variant="outline"
                size="lg"
                className="border-[#2A2A2A] bg-[#161616] text-white hover:bg-[#1F1F1F] hover:border-[#3A3A3A]"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Prompt */}
        <div className="mt-12 text-center">
          <p className="text-[#888888] text-sm">
            Have questions?{" "}
            <a
              href="/faq"
              className="text-[#CCCCCC] hover:text-white underline transition-colors"
            >
              Check out our FAQ
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
