// app/about/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Target,
  Users,
  Rocket,
  Heart,
  Sparkles,
  Code2,
  GitBranch,
  Award,
  TrendingUp,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";

export default function AboutPage() {
  const stats = [
    { label: "Active Learners", value: "10,000+", icon: Users },
    { label: "Career Roadmaps", value: "50+", icon: Target },
    { label: "GitHub Projects", value: "500+", icon: GitBranch },
    { label: "Success Rate", value: "95%", icon: Award },
  ];

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "We're on a mission to democratize tech education and make career transitions accessible to everyone.",
      color: "purple",
    },
    {
      icon: Heart,
      title: "Learner-Centric",
      description:
        "Every feature we build is designed with our learners' success in mind. Your growth is our priority.",
      color: "pink",
    },
    {
      icon: Sparkles,
      title: "Innovation First",
      description:
        "We leverage cutting-edge AI and technology to provide personalized learning experiences.",
      color: "blue",
    },
    {
      icon: Globe,
      title: "Global Community",
      description:
        "Join a worldwide community of learners supporting each other on their career journeys.",
      color: "green",
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former Tech Lead at Google. Passionate about making tech education accessible.",
      avatar: "SC",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Ex-Principal Engineer at Microsoft. Built learning platforms at scale.",
      avatar: "MR",
    },
    {
      name: "Emily Watson",
      role: "Head of Learning",
      bio: "10+ years in EdTech. Previously at Coursera and Udacity.",
      avatar: "EW",
    },
    {
      name: "David Kim",
      role: "Head of Engineering",
      bio: "Former Staff Engineer at Meta. Open-source contributor and mentor.",
      avatar: "DK",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "About Us" }]}
      /> */}

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 mx-auto mb-6">
            <Rocket className="h-10 w-10 text-purple-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Building the Future of{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Tech Education
            </span>
          </h1>
          <p className="text-xl text-[#CCCCCC] leading-relaxed max-w-3xl mx-auto">
            Skill Synth is transforming how people learn tech skills and build
            their dream careers. We combine AI-powered personalization with
            real-world projects to accelerate your learning journey.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] hover:border-[#3A3A3A] transition-all"
              >
                <CardContent className="p-6 text-center">
                  <Icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#888888]">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Our Story */}
        <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-2xl shadow-black/40 mb-16">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-blue-400" />
              <h2 className="text-3xl font-bold text-white">Our Story</h2>
            </div>
            <div className="space-y-4 text-[#CCCCCC] leading-relaxed">
              <p>
                Skill Synth was founded in 2023 by a team of engineers and
                educators who experienced firsthand the challenges of breaking
                into tech and advancing their careers. We saw talented
                individuals struggling with outdated learning resources, unclear
                career paths, and a lack of practical experience.
              </p>
              <p>
                We knew there had to be a better way. By combining our expertise
                in software engineering, machine learning, and education
                technology, we created Skill Synth—a platform that provides
                personalized learning paths, real-world GitHub projects, and
                AI-powered guidance.
              </p>
              <p>
                Today, we're proud to serve over 10,000 learners worldwide,
                helping them master new skills, build impressive portfolios, and
                land their dream jobs. But we're just getting started.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Our Values */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-[#888888] text-lg">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              const colorMap = {
                purple: {
                  bg: "bg-purple-500/10",
                  border: "border-purple-500/30",
                  text: "text-purple-400",
                },
                pink: {
                  bg: "bg-pink-500/10",
                  border: "border-pink-500/30",
                  text: "text-pink-400",
                },
                blue: {
                  bg: "bg-blue-500/10",
                  border: "border-blue-500/30",
                  text: "text-blue-400",
                },
                green: {
                  bg: "bg-green-500/10",
                  border: "border-green-500/30",
                  text: "text-green-400",
                },
              };
              const colors = colorMap[value.color as keyof typeof colorMap];

              return (
                <Card
                  key={index}
                  className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] hover:border-[#3A3A3A] transition-all"
                >
                  <CardContent className="p-6">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} border ${colors.border} mb-4`}
                    >
                      <Icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-[#888888] leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-[#888888] text-lg">
              Passionate experts dedicated to your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] hover:border-[#3A3A3A] transition-all text-center"
              >
                <CardContent className="p-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-500/30 mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {member.avatar}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-purple-400 mb-3">{member.role}</p>
                  <p className="text-sm text-[#888888] leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <Card className="border-[#2A2A2A] bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 border-purple-500/30 shadow-2xl shadow-purple-500/20 mb-16">
          <CardContent className="p-8 md:p-12 text-center">
            <Code2 className="w-12 h-12 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-[#CCCCCC] leading-relaxed max-w-3xl mx-auto">
              To empower millions of people worldwide to achieve their career
              goals through personalized, practical, and accessible tech
              education. We believe everyone deserves the opportunity to build a
              fulfilling career in technology.
            </p>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-2xl shadow-black/40">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Join Our Growing Community
                </h3>
                <p className="text-[#888888]">
                  Start your learning journey today and transform your career
                  with Skill Synth.
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  asChild
                  className="bg-white text-black hover:bg-white/90 font-semibold shadow-lg shadow-black/40"
                >
                  <Link href="/signup">Get Started Free</Link>
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="border-[#2A2A2A] bg-[#161616] text-white hover:bg-[#1F1F1F] hover:border-[#3A3A3A]"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
