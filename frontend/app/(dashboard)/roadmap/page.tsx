"use client";

import { ModuleList } from "@/components/ModuleList";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Clock,
  BookOpen,
  ArrowRight,
  Target,
  Loader2,
  AlertCircle,
} from "lucide-react";
import type { Roadmap, Course } from "@/types/roadmap";
import { redirect, RedirectType, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { courseAPI } from "@/utils/api";
import { Card, CardContent } from "@/components/ui/card";

export default function RoadmapListPage() {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [module, setModule] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchcourse = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await courseAPI.getMyCourses();

        if (!res || res.length === 0) {
          // No courses found - this is OK, show create roadmap
          setLoading(false);
          return;
        }

        const courseData = res[0]?.course;
        const courseId = res[0]?.course_id;

        if (!courseData || !courseId) {
          setError("Invalid course data");
          setLoading(false);
          return;
        }

        setCourse(courseData);

        // Fetch modules
        const resmodule = await courseAPI.getCourseById(courseId);

        if (resmodule && resmodule.modules) {
          setModule(resmodule.modules);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError(err instanceof Error ? err.message : "Failed to load course");
      } finally {
        setLoading(false);
      }
    };

    fetchcourse();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
          <p className="text-[#888888] text-lg">Loading your roadmap...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="max-w-md mx-auto p-6">
          <div className="group bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] border border-[#333333] text-red-500 mb-6">
              <AlertCircle className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Error Loading Roadmap
            </h2>
            <p className="text-[#888888] mb-6">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-white text-black hover:bg-gray-200 font-semibold"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // No Course State - Show Create Roadmap
  if (!course) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="group items-center flex flex-col bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-12 hover:border-[#3A3A3A] transition-all duration-300 hover:shadow-xl hover:shadow-black/30 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] border border-[#333333] text-white mb-8 shadow-lg shadow-black/20">
              <GraduationCap className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white tracking-tight">
              Create Your First Roadmap
            </h1>
            <p className="text-[#888888] text-lg mb-8 max-w-md">
              Start your learning journey by creating a personalized roadmap
              tailored to your goals
            </p>
            <Button
              size="lg"
              onClick={() => router.push("/generate")}
              className="whitespace-nowrap bg-white text-black hover:bg-gray-200 font-semibold px-8 py-6 text-lg group"
            >
              Create Roadmap
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main Content - Course exists
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] border border-[#333333] text-white mb-6 shadow-lg shadow-black/20">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white tracking-tight">
            {course.course_name}
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto leading-relaxed">
            {course.course_description || course.course_domain}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-5xl mx-auto">
          <div className="group bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#3A3A3A] transition-all duration-300 hover:shadow-lg hover:shadow-black/30">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A] group-hover:border-[#3A3A3A] transition-colors">
                <BookOpen className="w-5 h-5 text-[#888888]" />
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              {module?.length || 0}
            </div>
            <div className="text-sm text-[#888888]">Total Modules</div>
          </div>

          <div className="group bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#3A3A3A] transition-all duration-300 hover:shadow-lg hover:shadow-black/30">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A] group-hover:border-[#3A3A3A] transition-colors">
                <Clock className="w-5 h-5 text-[#888888]" />
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              {course.course_time || "N/A"}
            </div>
            <div className="text-sm text-[#888888]">Total Learning Time</div>
          </div>

          <div className="group bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-6 hover:border-[#3A3A3A] transition-all duration-300 hover:shadow-lg hover:shadow-black/30">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A] group-hover:border-[#3A3A3A] transition-colors">
                <Target className="w-5 h-5 text-[#888888]" />
              </div>
            </div>
            <div className="text-4xl font-bold text-white mb-1 capitalize">
              {course.course_level || "N/A"}
            </div>
            <div className="text-sm text-[#888888]">Course Difficulty</div>
          </div>
        </div>

        {/* Module List */}
        {module && module.length > 0 ? (
          <ModuleList modules={module} />
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] rounded-2xl p-12 text-center">
              <BookOpen className="w-16 h-16 text-[#888888] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">
                No Modules Yet
              </h3>
              <p className="text-[#888888] mb-6">
                This course doesn't have any modules yet. Check back later or
                contact support.
              </p>
              <Button
                onClick={() => router.push("/generate")}
                className="bg-white text-black hover:bg-gray-200 font-semibold"
              >
                Create New Roadmap
              </Button>
            </div>
          </div>
        )}

        <Card className="mt-8 bg-gradient-to-r from-[#1F1F1F] via-[#252525] to-[#1A1A1A] border-[#2A2A2A] shadow-2xl shadow-black/40">
          <CardContent className="py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  Help us improve Skill Synth
                </h3>
                <p className="text-[#888888]">
                  providing your valuable feedback and reporting any bugs you
                  encounter
                </p>
              </div>
              <Button
                onClick={() =>
                  redirect(
                    "https://forms.gle/YSg3N1UZN7CkBQG87",
                    RedirectType.push
                  )
                }
                size="lg"
                className="cursor-pointer whitespace-nowrap bg-white text-black hover:bg-gray-200 font-semibold px-8 py-6 text-base"
              >
                Report Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
