// app/(dashboard)/explore/page.tsx
"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  Users,
  Clock,
  Search,
  Filter,
  Eye,
  Heart,
  BookOpen,
  Sparkles,
  IceCream,
  CheckCircle2,
} from "lucide-react";
import { H2Icon } from "@heroicons/react/16/solid";
import { roadmapData } from "@/lib/data";
import { courseAPI } from "@/utils/api";
import { useEffect, useState } from "react";

interface TRMSchema {
  course_module_count: number;
  users: string[];
  completed: string[];
  created_by: string;
  views: number;
  created_at: string;
  course_name: string;
  course_domain: string;
  course_time: string;
  course_description: string;
  course_level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

const trendingRoadmaps: TRMSchema[] = [
  {
    course_name: "Complete Machine Learning Path",
    users: ["user1", "user2"],
    created_by: "Sarah Johnson",
    views: 23,
    completed: ["user1", "user2"],
    course_domain: "AI & ML",
    created_at: "2 days ago",
    course_description:
      "Comprehensive guide to becoming a machine learning engineer",
    course_level: "Intermediate",
    course_time: "6 - 12 month",
    course_module_count: 5,
  },
  {
    course_name: "Full Stack Web Development 2024",
    created_by: "Mike Chen",
    views: 1,
    users: ["user2", "user3"],
    completed: ["user1", "user2"],
    course_domain: "Web Development",
    created_at: "5 days ago",
    course_description:
      "Modern web development with React, Node.js, and databases",
    course_level: "Beginner",
    course_time: "3 - 6 month",
    course_module_count: 3,
  },
  {
    course_name: "DevOps Engineering Roadmap",
    created_by: "Alex Rivera",
    views: 3,
    users: ["user2", "user3"],
    completed: ["user1", "user2"],
    course_domain: "DevOps",
    created_at: "1 week ago",
    course_description: "Master CI/CD, Docker, Kubernetes, and cloud platforms",
    course_level: "Advanced",
    course_time: "8 - 12 month",
    course_module_count: 7,
  },
  {
    course_name: "Data Science Fundamentals",
    created_by: "Emma Wilson",
    views: 1,
    users: ["user2", "user3"],
    completed: ["user1", "user2"],
    course_domain: "Data Science",
    created_at: "3 days ago",
    course_description: "Learn Python, statistics, and data visualization",
    course_level: "Beginner",
    course_time: "8 - 12 month",
    course_module_count: 7,
  },
  {
    course_name: "Cybersecurity Specialist Path",
    created_by: "James Lee",
    views: 2,
    users: ["user2", "user3"],
    completed: ["user1", "user2"],
    course_domain: "Security",
    created_at: "4 days ago",
    course_description: "Essential skills for cybersecurity professionals",
    course_level: "Intermediate",
    course_time: "5 - 12 month",
    course_module_count: 6,
  },
  {
    course_name: "Cloud Architecture Mastery",
    created_by: "Maria Garcia",
    views: 1,
    users: ["user2", "user3"],
    completed: ["user1", "user2"],
    course_domain: "Cloud",
    created_at: "1 week ago",
    course_description: "Design scalable systems on AWS, Azure, and GCP",
    course_level: "Advanced",
    course_time: "8 - 12 month",
    course_module_count: 7,
  },
];

const categoryColors: Record<string, string> = {
  "AI & ML": "bg-purple-500/10 text-purple-400 border-purple-500/30",
  "Web Development": "bg-blue-500/10 text-blue-400 border-blue-500/30",
  DevOps: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  "Data Science": "bg-orange-500/10 text-orange-400 border-orange-500/30",
  Security: "bg-red-500/10 text-red-400 border-red-500/30",
  Cloud: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
};

const difficultyColors: Record<string, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Intermediate: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Advanced: "bg-purple-500/10 text-purple-400 border-purple-500/30",
};

export default function ExplorePage() {
  const [courses, setCourses] = useState<TRMSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseAPI.getAllCourses();
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await courseAPI.enrollInCourse(courseId);
      alert("Enrolled successfully!");
    } catch (err: any) {
      alert(err.response?.data?.error || "Enrollment failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] border border-[#333333]">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  Explore Roadmaps
                </h1>
              </div>
              <p className="text-[#888888] text-lg">
                Discover learning paths from the community
              </p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#666666]" />
              <Input
                placeholder="Search roadmaps by title, author, or category..."
                className="pl-12 h-12 border-[#2A2A2A] bg-[#161616] text-white placeholder:text-[#666666] focus:border-[#3A3A3A] focus:ring-1 focus:ring-[#3A3A3A] rounded-xl transition-all"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-6 border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A] rounded-xl transition-all"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                <BookOpen className="w-5 h-5 text-[#888888]" />
              </div>
              <div className="text-3xl font-bold text-white">
                {trendingRoadmaps.length}
              </div>
            </div>
            <div className="text-sm text-[#888888]">Available Roadmaps</div>
          </div>

          <div className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                <Users className="w-5 h-5 text-[#888888]" />
              </div>
              <div className="text-3xl font-bold text-white">12.5k</div>
            </div>
            <div className="text-sm text-[#888888]">Active Learners</div>
          </div>

          <div className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                <TrendingUp className="w-5 h-5 text-[#888888]" />
              </div>
              <div className="text-3xl font-bold text-white">6</div>
            </div>
            <div className="text-sm text-[#888888]">Categories</div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="trending" className="space-y-6">
          <TabsList className="bg-[#161616] border border-[#2A2A2A] p-1 rounded-xl">
            <TabsTrigger
              value="trending"
              className="data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white text-[#888888] rounded-lg transition-all"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending
            </TabsTrigger>
            <TabsTrigger
              value="popular"
              className="data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white text-[#888888] rounded-lg transition-all"
            >
              <Users className="mr-2 h-4 w-4" />
              Popular
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className="data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white text-[#888888] rounded-lg transition-all"
            >
              <Clock className="mr-2 h-4 w-4" />
              Recent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="space-y-4">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {trendingRoadmaps.length ? (
                trendingRoadmaps.map((roadmap, index) => (
                  <Card
                    key={index}
                    className="group cursor-pointer bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] hover:border-[#3A3A3A] transition-all duration-300 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <Badge
                          variant="outline"
                          className={`${
                            categoryColors[roadmap.course_domain]
                          } border font-medium`}
                        >
                          {roadmap.course_domain}
                        </Badge>
                        <span className="text-xs text-[#666666]">
                          {roadmap.created_at}
                        </span>
                      </div>
                      <CardTitle className="text-lg text-white group-hover:text-white/90 transition-colors leading-tight">
                        {roadmap.course_name}
                      </CardTitle>
                      <CardDescription className="text-[#888888] text-sm leading-relaxed">
                        {roadmap.course_description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`${
                            difficultyColors[roadmap.course_level]
                          } text-xs`}
                        >
                          {roadmap.course_level}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`${categoryColors["Data Science"]} text-xs`}
                        >
                          {roadmap.course_time}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`${categoryColors["Cloud"]} text-xs`}
                        >
                          {roadmap.course_module_count} Module
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
                        <div className="flex items-center gap-4 text-sm text-[#888888]">
                          <span className="flex items-center gap-1.5">
                            <Eye className="w-4 h-4" />
                            {roadmap.views}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            {roadmap.completed}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-[#666666] pt-2">
                        by{" "}
                        <span className="text-[#888888] font-medium">
                          {roadmap.created_by}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <TabsContent value="trending" className="space-y-4">
                  <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
                    <CardContent className="p-12 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1F1F1F] border border-[#2A2A2A] mb-4">
                        <Users className="h-8 w-8 text-[#666666]" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Create Your First Roadmap
                      </h3>
                      <p className="text-[#888888] max-w-md mx-auto">
                        Personalize your roadmap for you carreer growth
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="space-y-4">
            <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1F1F1F] border border-[#2A2A2A] mb-4">
                  <Users className="h-8 w-8 text-[#666666]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Most Popular Roadmaps
                </h3>
                <p className="text-[#888888] max-w-md mx-auto">
                  Roadmaps with the most likes and engagement will appear here
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1F1F1F] border border-[#2A2A2A] mb-4">
                  <Clock className="h-8 w-8 text-[#666666]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Recently Updated
                </h3>
                <p className="text-[#888888] max-w-md mx-auto">
                  Recently created and updated roadmaps will be displayed here
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-[#1F1F1F] via-[#252525] to-[#1A1A1A] border-[#2A2A2A] shadow-2xl shadow-black/40">
          <CardContent className="py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  Can't Find What You're Looking For?
                </h3>
                <p className="text-[#888888]">
                  Create your own custom learning roadmap and share it with the
                  community
                </p>
              </div>
              <Button
                size="lg"
                className="whitespace-nowrap bg-white text-black hover:bg-gray-200 font-semibold px-8"
              >
                Create Roadmap
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
