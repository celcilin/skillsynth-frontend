// app/roadmap/[id]/loading.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-4 w-64 bg-[#1F1F1F]" />
        </div>

        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <Skeleton className="h-10 w-3/4 mb-3 bg-[#1F1F1F]" />
              <Skeleton className="h-5 w-full max-w-2xl mb-4 bg-[#1F1F1F]" />
              <Skeleton className="h-5 w-2/3 mb-6 bg-[#1F1F1F]" />

              {/* Tags Skeleton */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Skeleton className="h-6 w-20 rounded-full bg-[#1F1F1F]" />
                <Skeleton className="h-6 w-24 rounded-full bg-[#1F1F1F]" />
                <Skeleton className="h-6 w-28 rounded-full bg-[#1F1F1F]" />
                <Skeleton className="h-6 w-16 rounded-full bg-[#1F1F1F]" />
              </div>

              {/* Stats Skeleton */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded bg-[#1F1F1F]" />
                  <Skeleton className="h-4 w-24 bg-[#1F1F1F]" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded bg-[#1F1F1F]" />
                  <Skeleton className="h-4 w-20 bg-[#1F1F1F]" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded bg-[#1F1F1F]" />
                  <Skeleton className="h-4 w-28 bg-[#1F1F1F]" />
                </div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex gap-3">
              <Skeleton className="h-10 w-32 rounded-lg bg-[#1F1F1F]" />
              <Skeleton className="h-10 w-10 rounded-lg bg-[#1F1F1F]" />
            </div>
          </div>

          {/* Progress Bar Skeleton */}
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-xl shadow-black/40">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Skeleton className="h-5 w-32 bg-[#1F1F1F]" />
                <Skeleton className="h-5 w-16 bg-[#1F1F1F]" />
              </div>
              <Skeleton className="h-3 w-full rounded-full bg-[#1F1F1F]" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs Skeleton */}
        <div className="mb-6">
          <div className="flex gap-2 border-b border-[#2A2A2A] pb-2">
            <Skeleton className="h-9 w-28 rounded-md bg-[#1F1F1F]" />
            <Skeleton className="h-9 w-32 rounded-md bg-[#1F1F1F]" />
            <Skeleton className="h-9 w-24 rounded-md bg-[#1F1F1F]" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Module Card 1 */}
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/60 transition-all">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg bg-[#1F1F1F]" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40 bg-[#1F1F1F]" />
                    <Skeleton className="h-4 w-24 bg-[#1F1F1F]" />
                  </div>
                </div>
                <Skeleton className="h-6 w-6 rounded bg-[#1F1F1F]" />
              </div>
              <Skeleton className="h-4 w-full bg-[#1F1F1F]" />
              <Skeleton className="h-4 w-3/4 bg-[#1F1F1F]" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-2 w-full rounded-full bg-[#1F1F1F]" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20 bg-[#1F1F1F]" />
                <Skeleton className="h-4 w-16 bg-[#1F1F1F]" />
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 flex-1 rounded-lg bg-[#1F1F1F]" />
                <Skeleton className="h-9 w-9 rounded-lg bg-[#1F1F1F]" />
              </div>
            </CardContent>
          </Card>

          {/* Module Card 2 */}
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/60 transition-all">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg bg-[#1F1F1F]" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-44 bg-[#1F1F1F]" />
                    <Skeleton className="h-4 w-20 bg-[#1F1F1F]" />
                  </div>
                </div>
                <Skeleton className="h-6 w-6 rounded bg-[#1F1F1F]" />
              </div>
              <Skeleton className="h-4 w-full bg-[#1F1F1F]" />
              <Skeleton className="h-4 w-2/3 bg-[#1F1F1F]" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-2 w-full rounded-full bg-[#1F1F1F]" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20 bg-[#1F1F1F]" />
                <Skeleton className="h-4 w-16 bg-[#1F1F1F]" />
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 flex-1 rounded-lg bg-[#1F1F1F]" />
                <Skeleton className="h-9 w-9 rounded-lg bg-[#1F1F1F]" />
              </div>
            </CardContent>
          </Card>

          {/* Module Card 3 */}
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/60 transition-all">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg bg-[#1F1F1F]" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-36 bg-[#1F1F1F]" />
                    <Skeleton className="h-4 w-28 bg-[#1F1F1F]" />
                  </div>
                </div>
                <Skeleton className="h-6 w-6 rounded bg-[#1F1F1F]" />
              </div>
              <Skeleton className="h-4 w-full bg-[#1F1F1F]" />
              <Skeleton className="h-4 w-4/5 bg-[#1F1F1F]" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-2 w-full rounded-full bg-[#1F1F1F]" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20 bg-[#1F1F1F]" />
                <Skeleton className="h-4 w-16 bg-[#1F1F1F]" />
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 flex-1 rounded-lg bg-[#1F1F1F]" />
                <Skeleton className="h-9 w-9 rounded-lg bg-[#1F1F1F]" />
              </div>
            </CardContent>
          </Card>

          {/* Module Card 4 */}
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/60 transition-all">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg bg-[#1F1F1F]" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-48 bg-[#1F1F1F]" />
                    <Skeleton className="h-4 w-32 bg-[#1F1F1F]" />
                  </div>
                </div>
                <Skeleton className="h-6 w-6 rounded bg-[#1F1F1F]" />
              </div>
              <Skeleton className="h-4 w-full bg-[#1F1F1F]" />
              <Skeleton className="h-4 w-5/6 bg-[#1F1F1F]" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-2 w-full rounded-full bg-[#1F1F1F]" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20 bg-[#1F1F1F]" />
                <Skeleton className="h-4 w-16 bg-[#1F1F1F]" />
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 flex-1 rounded-lg bg-[#1F1F1F]" />
                <Skeleton className="h-9 w-9 rounded-lg bg-[#1F1F1F]" />
              </div>
            </CardContent>
          </Card>

          {/* Module Card 5 */}
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/60 transition-all">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg bg-[#1F1F1F]" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-42 bg-[#1F1F1F]" />
                    <Skeleton className="h-4 w-24 bg-[#1F1F1F]" />
                  </div>
                </div>
                <Skeleton className="h-6 w-6 rounded bg-[#1F1F1F]" />
              </div>
              <Skeleton className="h-4 w-full bg-[#1F1F1F]" />
              <Skeleton className="h-4 w-3/5 bg-[#1F1F1F]" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-2 w-full rounded-full bg-[#1F1F1F]" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20 bg-[#1F1F1F]" />
                <Skeleton className="h-4 w-16 bg-[#1F1F1F]" />
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 flex-1 rounded-lg bg-[#1F1F1F]" />
                <Skeleton className="h-9 w-9 rounded-lg bg-[#1F1F1F]" />
              </div>
            </CardContent>
          </Card>

          {/* Module Card 6 */}
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-black/60 transition-all">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg bg-[#1F1F1F]" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-38 bg-[#1F1F1F]" />
                    <Skeleton className="h-4 w-28 bg-[#1F1F1F]" />
                  </div>
                </div>
                <Skeleton className="h-6 w-6 rounded bg-[#1F1F1F]" />
              </div>
              <Skeleton className="h-4 w-full bg-[#1F1F1F]" />
              <Skeleton className="h-4 w-4/6 bg-[#1F1F1F]" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-2 w-full rounded-full bg-[#1F1F1F]" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20 bg-[#1F1F1F]" />
                <Skeleton className="h-4 w-16 bg-[#1F1F1F]" />
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 flex-1 rounded-lg bg-[#1F1F1F]" />
                <Skeleton className="h-9 w-9 rounded-lg bg-[#1F1F1F]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Action Skeleton */}
        <div className="mt-8 flex justify-center">
          <Skeleton className="h-12 w-48 rounded-lg bg-[#1F1F1F]" />
        </div>
      </div>
    </div>
  );
}
