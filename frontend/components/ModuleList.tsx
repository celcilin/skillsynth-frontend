// components/ModuleList.tsx
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Target, BookOpen, Code } from "lucide-react";
import Link from "next/link";
import type { Roadmap } from "@/types/roadmap";
import { getLevelColor } from "@/lib/utils";

interface ModuleListProps {
  modules: Roadmap[];
}

export function ModuleList({ modules }: ModuleListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {modules.map((module, index) => (
        <Link key={index} href={`/roadmap/${module?.id}`}>
          <Card className="h-full group bg-gradient-to-br from-[#161616] to-[#0F0F0F] border-[#2A2A2A] hover:border-[#3A3A3A] transition-all duration-300 hover:shadow-xl hover:shadow-black/40 cursor-pointer hover:-translate-y-1">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <Badge
                  variant="outline"
                  className={`${getLevelColor(
                    module.level
                  )} border font-medium px-3 py-1`}
                >
                  <Target className="w-3 h-3 mr-1.5" />
                  {module.level}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-[#1F1F1F] text-[#AAAAAA] border-[#2A2A2A] px-3 py-1"
                >
                  <Clock className="w-3 h-3 mr-1.5" />
                  {module.time}
                </Badge>
              </div>

              <CardTitle className="text-xl font-bold text-white group-hover:text-white/90 transition-colors leading-tight">
                {module.title}
              </CardTitle>

              <CardDescription className="text-[#888888] line-clamp-2 leading-relaxed">
                {module.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-[#888888]">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>{module.tutorial.length} videos</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Code className="w-4 h-4" />
                  <span>{module.skills.length} skills</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {module.skills.slice(0, 3).map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-[#1F1F1F] text-[#AAAAAA] border border-[#2A2A2A] hover:bg-[#252525] hover:text-white transition-colors text-xs px-2.5 py-1"
                  >
                    {skill}
                  </Badge>
                ))}
                {module.skills.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="bg-[#252525] text-[#CCCCCC] border border-[#3A3A3A] text-xs px-2.5 py-1 font-medium"
                  >
                    +{module.skills.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
