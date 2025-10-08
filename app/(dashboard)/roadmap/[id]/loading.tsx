// app/roadmap/[id]/loading.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#cdd0dc] via-[#958f9e]/20 to-[#665f5f]/10">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-12 w-3/4 mb-4 bg-[#958f9e]/20" />
          <Skeleton className="h-6 w-full mb-4 bg-[#958f9e]/20" />
          <div className="flex gap-3">
            <Skeleton className="h-6 w-24 bg-[#958f9e]/20" />
            <Skeleton className="h-6 w-24 bg-[#958f9e]/20" />
            <Skeleton className="h-6 w-24 bg-[#958f9e]/20" />
          </div>
        </div>

        {/* Tabs Skeleton */}
        <Skeleton className="h-10 w-full mb-6 bg-[#958f9e]/20" />

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-2 border-[#958f9e]/20">
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2 bg-[#958f9e]/20" />
              <Skeleton className="h-4 w-64 bg-[#958f9e]/20" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-8 w-full bg-[#958f9e]/20" />
                <Skeleton className="h-8 w-full bg-[#958f9e]/20" />
                <Skeleton className="h-8 w-3/4 bg-[#958f9e]/20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#958f9e]/20">
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2 bg-[#958f9e]/20" />
              <Skeleton className="h-4 w-64 bg-[#958f9e]/20" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-8 w-full bg-[#958f9e]/20" />
                <Skeleton className="h-8 w-full bg-[#958f9e]/20" />
                <Skeleton className="h-8 w-3/4 bg-[#958f9e]/20" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
