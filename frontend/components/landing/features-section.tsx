// components/landing/features-section.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Target,
  Code2,
  GitBranch,
  BookOpen,
  Trophy,
  Lightbulb,
} from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Personalized Roadmaps",
    description:
      "AI-powered career paths customized to your goals, experience level, and learning pace.",
    color: "purple",
  },
  {
    icon: Code2,
    title: "Real-World Projects",
    description:
      "Solve actual GitHub issues and contribute to open-source projects while building your portfolio.",
    color: "blue",
  },
  {
    icon: GitBranch,
    title: "GitHub Integration",
    description:
      "Seamlessly connect with GitHub to track contributions, fork repos, and showcase your work.",
    color: "pink",
  },
  {
    icon: BookOpen,
    title: "Curated Learning Resources",
    description:
      "Access hand-picked tutorials, documentation, and courses for each step of your journey.",
    color: "green",
  },
  {
    icon: Trophy,
    title: "Skill Assessments",
    description:
      "Test your knowledge with interactive quizzes and challenges to validate your progress.",
    color: "yellow",
  },
  {
    icon: Lightbulb,
    title: "Career Guidance",
    description:
      "Get expert recommendations on skills to learn, projects to build, and career paths to explore.",
    color: "cyan",
  },
];

const colorClasses = {
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    hover: "group-hover:bg-purple-500/20",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
    hover: "group-hover:bg-blue-500/20",
  },
  pink: {
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    text: "text-pink-400",
    hover: "group-hover:bg-pink-500/20",
  },
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    text: "text-green-400",
    hover: "group-hover:bg-green-500/20",
  },
  yellow: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    text: "text-yellow-400",
    hover: "group-hover:bg-yellow-500/20",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-400",
    hover: "group-hover:bg-cyan-500/20",
  },
};

export function FeaturesSection() {
  return (
    <section
      className="relative bg-[#0A0A0A] py-20 sm:py-32 overflow-hidden"
      id="features"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-purple-500/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2A2A2A1a_1px,transparent_1px),linear-gradient(to_bottom,#2A2A2A1a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="container relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Accelerate
            </span>{" "}
            Your Career
          </h2>
          <p className="text-lg text-[#CCCCCC] leading-relaxed">
            Comprehensive tools and resources to help you master new skills and
            land your dream job.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const colors =
              colorClasses[feature.color as keyof typeof colorClasses];
            return (
              <Card
                key={feature.title}
                className="group border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-lg transition-all hover:border-[#3A3A3A] hover:shadow-xl hover:shadow-black/40 overflow-hidden relative"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <CardHeader className="relative">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.hover} border ${colors.border} transition-all duration-300`}
                  >
                    <feature.icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <CardTitle className="text-white text-xl font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base text-[#888888] leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] p-8 sm:p-12">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Start Your Journey?
            </h3>
            <p className="text-[#888888] mb-6">
              Join thousands of learners building their dream careers with
              personalized roadmaps.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[#CCCCCC]">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span>100% Free to start</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#CCCCCC]">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#CCCCCC]">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
