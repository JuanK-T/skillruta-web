import { Skeleton } from '@/components/ui/skeleton';

export function CourseDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background pb-16">
      <div className="container py-8">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <Skeleton className="aspect-video rounded-2xl" />
          <div className="space-y-6">
            <Skeleton className="h-8 w-32 mb-3" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-4" />
            <div className="flex gap-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
