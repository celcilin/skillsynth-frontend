"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  GitBranch,
  ExternalLink,
  Code2,
  Globe,
  AlertCircle,
  Copy,
  CheckCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import type { Project } from "@/types/roadmap";
import { courseAPI } from "@/utils/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProj = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await courseAPI.getProjectById(id);
        console.log(res);

        if (!res || res.length === 0) {
          setError("Project not found");
          return;
        }

        setProject(res[0]);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(err instanceof Error ? err.message : "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProj();
  }, [id]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
          <p className="text-[#888888] text-lg">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !project) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] max-w-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Project Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[#888888]">
              {error || "The project you're looking for doesn't exist."}
            </p>
            <Link href="/project">
              <Button className="w-full bg-white text-black hover:bg-gray-200 font-semibold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Safe getters with fallbacks
  const repoName =
    project.git_repo?.split("/").slice(-2).join("/") || "Unknown Repository";
  const repoShortName = project.git_repo?.split("/").slice(-1)[0] || "project";

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <Link href="/project">
          <Button
            variant="ghost"
            className="mb-6 text-[#888888] hover:text-white hover:bg-[#161616]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
            <div className="flex-1 min-w-[280px]">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
                {repoShortName}
              </h1>
              <p className="text-lg text-[#888888] leading-relaxed">
                {project.description || "No description available"}
              </p>
            </div>
            {project.git_repo && (
              <Button
                className="bg-white text-black hover:bg-gray-200 font-semibold"
                asChild
              >
                <a
                  href={project.git_repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitBranch className="w-4 h-4 mr-2" />
                  View Repository
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>
            )}
          </div>

          {/* Repository Card */}
          {project.git_repo && (
            <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <GitBranch className="w-5 h-5 text-[#888888]" />
                    <code className="text-sm font-mono text-white font-semibold">
                      {repoName}
                    </code>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A]"
                    onClick={() => copyToClipboard(project.git_repo, -1)}
                  >
                    {copiedIndex === -1 ? (
                      <CheckCircle className="w-3 h-3 mr-2" />
                    ) : (
                      <Copy className="w-3 h-3 mr-2" />
                    )}
                    {copiedIndex === -1 ? "Copied!" : "Copy URL"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Type */}
            {project.type && project.type.length > 0 && (
              <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] hover:border-[#3A3A3A] transition-all shadow-lg hover:shadow-xl hover:shadow-black/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Globe className="w-5 h-5 text-[#888888]" />
                    Project Type
                  </CardTitle>
                  <CardDescription className="text-[#888888]">
                    Classification and category of this project
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2">
                    {project.type.map((type, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-sm py-2 px-4 font-medium"
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Domain */}
            {project.domain && project.domain.length > 0 && (
              <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] hover:border-[#3A3A3A] transition-all shadow-lg hover:shadow-xl hover:shadow-black/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Code2 className="w-5 h-5 text-[#888888]" />
                    Domain & Focus Areas
                  </CardTitle>
                  <CardDescription className="text-[#888888]">
                    Primary domains and industries this project targets
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2">
                    {project.domain.map((domain, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-sm py-2 px-4 font-medium"
                      >
                        {domain}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Key Issues/Challenges */}
            {project.issue && project.issue.length > 0 && (
              <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] hover:border-[#3A3A3A] transition-all shadow-lg hover:shadow-xl hover:shadow-black/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <AlertCircle className="w-5 h-5 text-[#888888]" />
                    Open Issues & Contribution Opportunities
                  </CardTitle>
                  <CardDescription className="text-[#888888]">
                    Ways to contribute and get involved with this project
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {project.issue.map((issue, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A] hover:bg-[#252525] hover:border-[#3A3A3A] transition-all"
                      >
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2A2A2A] text-white text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1 text-white">
                            {issue}
                          </h4>
                          <p className="text-xs text-[#888888]">
                            Explore issues tagged with this label to start
                            contributing
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs whitespace-nowrap"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Open
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Languages & Technologies */}
            {project.language && project.language.length > 0 && (
              <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    Technologies Used
                  </CardTitle>
                  <CardDescription className="text-[#888888]">
                    Languages and frameworks
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    {project.language.map((lang, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-md bg-[#1F1F1F] border border-[#2A2A2A] hover:bg-[#252525] hover:border-[#3A3A3A] transition-colors"
                      >
                        <span className="text-sm font-medium text-white">
                          {lang}
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-[#2A2A2A] text-[#CCCCCC]"
                        >
                          Primary
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            {project.git_repo && (
              <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-white">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-6">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A]"
                    asChild
                  >
                    <a
                      href={project.git_repo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitBranch className="w-4 h-4 mr-2" />
                      Clone Repository
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A]"
                    asChild
                  >
                    <a
                      href={`${project.git_repo}/issues`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      View Issues
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A]"
                    asChild
                  >
                    <a
                      href={`${project.git_repo}/blob/main/README.md`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Code2 className="w-4 h-4 mr-2" />
                      Readme File
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A]"
                    asChild
                  >
                    <a
                      href={`${project.git_repo}/fork`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Fork Project
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Project Stats */}
            <Card className="bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Project Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#888888]">Technologies</span>
                  <span className="font-semibold text-white">
                    {project.language?.length || 0}
                  </span>
                </div>
                <Separator className="bg-[#2A2A2A]" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#888888]">Issue Types</span>
                  <span className="font-semibold text-white">
                    {project.issue?.length || 0}
                  </span>
                </div>
                <Separator className="bg-[#2A2A2A]" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#888888]">Domains</span>
                  <span className="font-semibold text-white">
                    {project.domain?.length || 0}
                  </span>
                </div>
                <Separator className="bg-[#2A2A2A]" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#888888]">Project Types</span>
                  <span className="font-semibold text-white">
                    {project.type?.length || 0}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Getting Started Section */}
        {project.git_repo && (
          <Card className="mt-8 bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Getting Started
              </CardTitle>
              <CardDescription className="text-[#888888]">
                Follow these steps to set up and run the project locally
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#0F0F0F] text-white border border-[#2A2A2A]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-[#888888]">
                      Step 1: Clone the repository
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[#888888] hover:text-white hover:bg-[#2A2A2A]"
                      onClick={() =>
                        copyToClipboard(`git clone ${project.git_repo}`, 0)
                      }
                    >
                      {copiedIndex === 0 ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                  <code className="text-sm font-mono">
                    git clone {project.git_repo}
                  </code>
                </div>

                <div className="p-4 rounded-lg bg-[#0F0F0F] text-white border border-[#2A2A2A]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-[#888888]">
                      Step 2: Navigate to directory
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[#888888] hover:text-white hover:bg-[#2A2A2A]"
                      onClick={() => copyToClipboard(`cd ${repoShortName}`, 1)}
                    >
                      {copiedIndex === 1 ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                  <code className="text-sm font-mono">cd {repoShortName}</code>
                </div>

                {/* <div className="p-4 rounded-lg bg-[#0F0F0F] text-white border border-[#2A2A2A]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-[#888888]">
                      Step 3: Install dependencies
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[#888888] hover:text-white hover:bg-[#2A2A2A]"
                      onClick={() => copyToClipboard("npm install", 2)}
                    >
                      {copiedIndex === 2 ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                  <code className="text-sm font-mono">npm install</code>
                </div>

                <div className="p-4 rounded-lg bg-[#0F0F0F] text-white border border-[#2A2A2A]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-[#888888]">
                      Step 4: Run the project
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[#888888] hover:text-white hover:bg-[#2A2A2A]"
                      onClick={() => copyToClipboard("npm start", 3)}
                    >
                      {copiedIndex === 3 ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </Button>
                  </div>
                  <code className="text-sm font-mono">npm start</code>
                </div> */}

                <CardDescription className="mt-10 text-[#888888]">
                  Follow Repo Readme File For Project Setup
                </CardDescription>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contribution Guide */}
        {project.git_repo && (
          <Card className="mt-8 bg-gradient-to-r from-[#1F1F1F] via-[#252525] to-[#1A1A1A] border-[#2A2A2A] shadow-2xl shadow-black/40">
            <CardContent className="py-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    Ready to Contribute?
                  </h3>
                  <p className="text-[#888888]">
                    Join the community and help improve this project
                  </p>
                </div>
                <Button
                  size="lg"
                  className="whitespace-nowrap bg-white text-black hover:bg-gray-200 font-semibold px-8"
                  asChild
                >
                  <a
                    href={`${project.git_repo}/issues`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Open Issues
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
