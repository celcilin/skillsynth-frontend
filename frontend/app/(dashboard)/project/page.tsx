"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  GitBranch,
  ExternalLink,
  Code,
  AlertCircle,
  Globe,
  Star,
  GitFork,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Course, type Project } from "@/types/roadmap";
import { useEffect, useState } from "react";
import { courseAPI } from "@/utils/api";

export default function ProjectPage() {
  const [course, setCourse] = useState<Course | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const courses = await courseAPI.getMyCourses();

        if (!courses || courses.length === 0) {
          setError("No courses found");
          setLoading(false);
          return;
        }

        const courseId = courses[0]?.course_id;

        if (!courseId) {
          setError("Course ID not found");
          setLoading(false);
          return;
        }

        const res = await courseAPI.getProjectByCourseId(courseId);

        if (!res) {
          setError("Failed to fetch projects");
          setLoading(false);
          return;
        }

        setCourse(course);
        setProjects(res?.projects || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load projects"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  // Extract project name from git repo URL
  function getProjectName(gitRepo: string): string {
    if (!gitRepo) return "Unknown Project";
    const parts = gitRepo.split("/");
    return parts[parts.length - 1] || "Unknown Project";
  }

  // Extract owner from git repo URL
  function getProjectOwner(gitRepo: string): string {
    if (!gitRepo) return "Unknown";
    const parts = gitRepo.split("/");
    return parts[parts.length - 2] || "Unknown";
  }

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
          <p className="text-[#888888] text-lg">Loading projects...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] max-w-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Error Loading Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#888888] mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-white text-black hover:bg-gray-200 font-semibold"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Empty State
  if (!projects || projects.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] max-w-md text-center">
          <CardHeader>
            <GitBranch className="h-12 w-12 text-[#888888] mx-auto mb-4" />
            <CardTitle className="text-white">No Projects Yet</CardTitle>
            <CardDescription className="text-[#888888]">
              There are no projects available for this course yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="bg-white text-black hover:bg-gray-200 font-semibold"
              asChild
            >
              <Link href="/generate">Create Your First Course</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate stats safely
  const activeProjectsCount = projects.length;
  const technologiesCount = [
    ...new Set(projects.flatMap((item) => item.project?.language || [])),
  ].length;
  const openIssuesCount = projects.reduce(
    (acc, p) => acc + (p.project?.issue?.length || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Open Source Projects
              </h1>
              <p className="text-[#888888] text-lg">
                Contribute to amazing open source projects and build your
                portfolio
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                  <GitBranch className="w-5 h-5 text-[#888888]" />
                </div>
                <div className="text-3xl font-bold text-white">
                  {activeProjectsCount}
                </div>
              </div>
              <div className="text-sm text-[#888888]">Active Projects</div>
            </div>

            <div className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                  <Code className="w-5 h-5 text-[#888888]" />
                </div>
                <div className="text-3xl font-bold text-white">
                  {technologiesCount}
                </div>
              </div>
              <div className="text-sm text-[#888888]">Technologies</div>
            </div>

            <div className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border border-[#2A2A2A] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A]">
                  <AlertCircle className="w-5 h-5 text-[#888888]" />
                </div>
                <div className="text-3xl font-bold text-white">
                  {openIssuesCount}
                </div>
              </div>
              <div className="text-sm text-[#888888]">Open Issues</div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 grid-cols-1">
          {projects.map((item, index) => {
            const project = item.project;
            return (
              <Card
                key={project.id || index}
                className="group bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] hover:border-[#3A3A3A] transition-all duration-300 hover:shadow-xl hover:shadow-black/40"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="rounded-xl bg-gradient-to-br from-[#2A2A2A] to-[#1F1F1F] p-3 border border-[#333333]">
                        <GitBranch className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl text-white group-hover:text-white/90 transition-colors">
                            {getProjectOwner(project.git_repo)} /{" "}
                            <span className="text-[#888888]">
                              {getProjectName(project.git_repo)}
                            </span>
                          </CardTitle>
                        </div>
                        <CardDescription className="text-[#888888] leading-relaxed">
                          {project.description || "No description available"}
                        </CardDescription>
                      </div>
                    </div>
                    {project.git_repo && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A] flex-shrink-0"
                        asChild
                      >
                        <a
                          href={project.git_repo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Repo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Project Type */}
                  {project.type && project.type.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-[#888888] uppercase tracking-wide mb-3">
                        Project Type
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.type.map((type, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-blue-500/10 text-blue-400 border-blue-500/30 px-3 py-1"
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Domain */}
                  {project.domain && project.domain.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-[#888888] uppercase tracking-wide mb-3">
                        Domain
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.domain.map((domain, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-purple-500/10 text-purple-400 border-purple-500/30 px-3 py-1"
                          >
                            <Globe className="w-3 h-3 mr-1.5" />
                            {domain}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {project.language && project.language.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-[#888888] uppercase tracking-wide mb-3">
                        Languages & Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.language.map((lang, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 px-3 py-1"
                          >
                            <Code className="w-3 h-3 mr-1.5" />
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Issues */}
                  {project.issue && project.issue.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-[#888888] uppercase tracking-wide mb-3">
                        Contribution Opportunities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.issue.map((issue, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-orange-500/10 text-orange-400 border-orange-500/30 px-3 py-1"
                          >
                            <AlertCircle className="w-3 h-3 mr-1.5" />
                            {issue}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="pt-4 border-t border-[#2A2A2A] flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-[#888888]">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4" />
                        <span>Star this project</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <GitFork className="w-4 h-4" />
                        <span>Fork & contribute</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-white text-black hover:bg-gray-200 font-semibold"
                      asChild
                    >
                      <Link href={`/project/${project.id || index}`}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-[#1F1F1F] via-[#252525] to-[#1A1A1A] border-[#2A2A2A] shadow-2xl shadow-black/40">
          <CardContent className="py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  Want to Add Your Project?
                </h3>
                <p className="text-[#888888]">
                  Submit your open source project and help others learn by
                  contributing
                </p>
              </div>
              <Button
                size="lg"
                className="cursor-not-allowed whitespace-nowrap bg-white text-black hover:bg-gray-200 font-semibold px-8"
                disabled
              >
                <Plus className="mr-2 h-5 w-5" />
                Submit Project
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
