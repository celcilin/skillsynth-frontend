"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Clock,
  BookOpen,
  Target,
  Code,
  GitBranch,
  CheckCircle2,
  ExternalLink,
  Play,
  Award,
  AlertCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { getLevelColor, getYouTubeThumbnail } from "@/lib/utils";
import type { Roadmap } from "@/types/roadmap";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { use, useEffect, useState } from "react";
import { courseAPI } from "@/utils/api";
import Loading from "./loading";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RoadmapDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await courseAPI.getModuleById(id);
        console.log("Module data:", res);

        if (!res || res.length === 0) {
          setError("Module not found");
          return;
        }

        setRoadmap(res[0]);
      } catch (err) {
        console.error("Error fetching module:", err);
        setError(err instanceof Error ? err.message : "Failed to load module");
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      // <Loading />
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
          <p className="text-[#888888] text-lg">Loading module details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !roadmap) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] max-w-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Module Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#888888]">
              {error || "The module you're looking for doesn't exist."}
            </p>
            <div className="flex gap-3">
              <Link href="/roadmap" className="flex-1">
                <Button className="w-full bg-white text-black hover:bg-gray-200 font-semibold">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Roadmaps
                </Button>
              </Link>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F]"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Breadcrumb
        items={[
          { label: "Roadmaps", href: "/roadmap" },
          { label: roadmap.title || "Module" },
        ]}
      />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
            <div className="flex-1 min-w-[280px]">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
                {roadmap.title}
              </h1>
              <p className="text-[#888888] text-lg leading-relaxed">
                {roadmap.description || "No description available"}
              </p>
            </div>
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-3 items-center">
            <Badge
              variant="outline"
              className={`${getLevelColor(
                roadmap.level || "beginner"
              )} border font-medium px-3 py-1`}
            >
              <Target className="w-3 h-3 mr-1.5" />
              {roadmap.level || "Beginner"}
            </Badge>
            <Badge
              variant="outline"
              className="bg-[#1F1F1F] text-[#CCCCCC] border-[#2A2A2A] font-medium px-3 py-1"
            >
              <Clock className="w-3 h-3 mr-1.5" />
              {roadmap.time || "N/A"}
            </Badge>
            <Badge
              variant="outline"
              className="bg-[#1F1F1F] text-[#CCCCCC] border-[#2A2A2A] font-medium px-3 py-1"
            >
              <BookOpen className="w-3 h-3 mr-1.5" />
              {roadmap.tutorial?.length || 0} Tutorials
            </Badge>
            <Badge
              variant="outline"
              className="bg-[#1F1F1F] text-[#CCCCCC] border-[#2A2A2A] font-medium px-3 py-1"
            >
              <CheckCircle2 className="w-3 h-3 mr-1.5" />
              {roadmap.assessment?.length || 0} Assessments
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-[#161616] border border-[#2A2A2A] p-1 rounded-xl">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white text-[#888888] rounded-lg transition-all"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="curriculum"
              className="data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white text-[#888888] rounded-lg transition-all"
            >
              Curriculum
            </TabsTrigger>
            <TabsTrigger
              value="project"
              className="data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white text-[#888888] rounded-lg transition-all"
            >
              Project
            </TabsTrigger>
            <TabsTrigger
              value="assessment"
              className="data-[state=active]:bg-[#2A2A2A] data-[state=active]:text-white text-[#888888] rounded-lg transition-all"
            >
              Assessment
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skills Card */}
              <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] hover:border-[#3A3A3A] transition-all shadow-lg hover:shadow-xl hover:shadow-black/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Code className="w-5 h-5 text-[#888888]" />
                    Skills You'll Learn
                  </CardTitle>
                  <CardDescription className="text-[#888888]">
                    Master these essential technologies and concepts
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {roadmap.skills && roadmap.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {roadmap.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-sm py-1.5 px-3 bg-[#1F1F1F] text-[#AAAAAA] border border-[#2A2A2A] hover:bg-[#252525] hover:text-white transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[#888888] text-sm">
                      No skills listed for this module
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Quick Info Card */}
              <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] hover:border-[#3A3A3A] transition-all shadow-lg hover:shadow-xl hover:shadow-black/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Target className="w-5 h-5 text-[#888888]" />
                    Learning Path Details
                  </CardTitle>
                  <CardDescription className="text-[#888888]">
                    What to expect from this roadmap
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-[#888888] font-medium">
                      Duration
                    </span>
                    <span className="font-semibold text-white">
                      {roadmap.time || "N/A"}
                    </span>
                  </div>
                  <Separator className="bg-[#2A2A2A]" />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-[#888888] font-medium">
                      Difficulty
                    </span>
                    <Badge
                      className={getLevelColor(roadmap.level || "beginner")}
                    >
                      {roadmap.level || "Beginner"}
                    </Badge>
                  </div>
                  <Separator className="bg-[#2A2A2A]" />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-[#888888] font-medium">
                      Video Tutorials
                    </span>
                    <span className="font-semibold text-white">
                      {roadmap.tutorial?.length || 0}
                    </span>
                  </div>
                  <Separator className="bg-[#2A2A2A]" />
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm text-[#888888] font-medium">
                      Assessments
                    </span>
                    <span className="font-semibold text-white">
                      {roadmap.assessment?.length || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-6">
            <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Video Tutorials</CardTitle>
                <CardDescription className="text-[#888888]">
                  Follow these video tutorials to master the concepts
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {roadmap.tutorial && roadmap.tutorial.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {roadmap.tutorial.map((tutorialUrl, index) => (
                      <a
                        key={index}
                        href={tutorialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group"
                      >
                        <Card className="overflow-hidden hover:shadow-xl transition-all border-[#2A2A2A] hover:border-[#3A3A3A] bg-[#161616] hover:shadow-black/40">
                          <div className="relative aspect-video bg-[#1F1F1F]">
                            <Image
                              src={
                                getYouTubeThumbnail(tutorialUrl) ||
                                "/placeholder-tutorial.jpg"
                              }
                              alt={`Tutorial ${index + 1}`}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white transition-all flex items-center justify-center">
                                <Play
                                  className="w-8 h-8 text-black ml-1"
                                  fill="currentColor"
                                />
                              </div>
                            </div>
                            <Badge className="absolute top-2 left-2 bg-black/60 text-white border-0">
                              Tutorial {index + 1}
                            </Badge>
                          </div>
                          <CardContent className="p-4 bg-[#161616]">
                            <p className="text-sm text-[#888888] group-hover:text-[#AAAAAA] transition-colors flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Watch on YouTube
                            </p>
                          </CardContent>
                        </Card>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-[#888888] mx-auto mb-4" />
                    <p className="text-[#888888]">
                      No tutorials available for this module yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Project Tab */}
          <TabsContent value="project" className="space-y-6">
            {roadmap.project ? (
              <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-3 text-white">
                        Hands-on Project
                      </CardTitle>
                      <CardDescription className="text-base text-[#888888] leading-relaxed">
                        {roadmap.project.description ||
                          "No description available"}
                      </CardDescription>
                    </div>
                    {roadmap.project.id && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A]"
                        asChild
                      >
                        <Link href={`/project/${roadmap.project.id}`}>
                          <GitBranch className="w-4 h-4 mr-2" />
                          Project Detail
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {/* Project Type */}
                  {roadmap.project.type && roadmap.project.type.length > 0 && (
                    <>
                      <div>
                        <h3 className="font-semibold mb-3 text-sm text-[#888888] uppercase tracking-wide">
                          Project Type
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {roadmap.project.type.map((type, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-blue-500/10 text-blue-400 border-blue-500/30 py-1.5 px-3"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Separator className="bg-[#2A2A2A]" />
                    </>
                  )}

                  {/* Domain */}
                  {roadmap.project.domain &&
                    roadmap.project.domain.length > 0 && (
                      <>
                        <div>
                          <h3 className="font-semibold mb-3 text-sm text-[#888888] uppercase tracking-wide">
                            Domain
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {roadmap.project.domain.map((domain, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-purple-500/10 text-purple-400 border-purple-500/30 py-1.5 px-3"
                              >
                                {domain}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Separator className="bg-[#2A2A2A]" />
                      </>
                    )}

                  {/* Languages */}
                  {roadmap.project.language &&
                    roadmap.project.language.length > 0 && (
                      <>
                        <div>
                          <h3 className="font-semibold mb-3 text-sm text-[#888888] uppercase tracking-wide">
                            Languages & Technologies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {roadmap.project.language.map((lang, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 py-1.5 px-3"
                              >
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Separator className="bg-[#2A2A2A]" />
                      </>
                    )}

                  {/* Key Issues/Challenges */}
                  {roadmap.project.issue &&
                    roadmap.project.issue.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3 text-sm text-[#888888] uppercase tracking-wide">
                          Open Issues & Contributions
                        </h3>
                        <div className="space-y-2">
                          {roadmap.project.issue.map((issue, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-3 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A] hover:bg-[#252525] hover:border-[#3A3A3A] transition-colors"
                            >
                              <AlertCircle className="w-5 h-5 text-[#888888] mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-[#CCCCCC] font-medium">
                                {issue}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] shadow-lg">
                <CardContent className="py-12 text-center">
                  <GitBranch className="w-16 h-16 text-[#888888] mx-auto mb-4" />
                  <p className="text-[#888888]">
                    No project assigned to this module yet
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Assessment Tab */}
          <TabsContent value="assessment" className="space-y-6">
            <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">
                  Assessments & Knowledge Check
                </CardTitle>
                <CardDescription className="text-[#888888]">
                  Test your understanding with these assessment questions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {roadmap.assessment && roadmap.assessment.length > 0 ? (
                  <div className="space-y-4">
                    {roadmap.assessment.map((assessment, index) => (
                      <div key={index} className="group">
                        <div className="flex items-start gap-4 p-5 rounded-lg border border-[#2A2A2A] hover:border-[#3A3A3A] transition-all hover:shadow-md bg-[#161616] hover:bg-[#1A1A1A] hover:shadow-black/40">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1F1F1F] text-white font-bold flex-shrink-0 group-hover:bg-[#2A2A2A] transition-all border border-[#2A2A2A]">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1 text-white group-hover:text-white/90 transition-colors">
                              {assessment}
                            </h3>
                            <p className="text-sm text-[#888888]">
                              Answer this question to demonstrate your
                              understanding
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A]"
                          >
                            <Award className="w-4 h-4 mr-2" />
                            Answer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award className="w-16 h-16 text-[#888888] mx-auto mb-4" />
                    <p className="text-[#888888]">
                      No assessments available for this module yet
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <Card className="mt-8 bg-gradient-to-r from-[#1F1F1F] via-[#252525] to-[#1A1A1A] border-[#2A2A2A] shadow-2xl shadow-black/40">
          <CardContent className="py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  Ready to Start Learning?
                </h3>
                <p className="text-[#888888]">
                  Begin your journey to mastering {roadmap.title}
                </p>
              </div>
              <Button
                size="lg"
                className="whitespace-nowrap bg-white text-black hover:bg-gray-200 font-semibold px-8 py-6 text-base"
              >
                Enroll Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
