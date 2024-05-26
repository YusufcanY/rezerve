import { Skeleton } from '@/components/ui/skeleton';

export default function SearchLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="h-48 rounded-lg bg-white" />
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col">
              <Skeleton className="h-6 w-48 rounded-full bg-white" />
              <Skeleton className="mt-2 h-6 w-24 rounded-full bg-white" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full bg-white" />
          </div>
        </div>
      ))}
    </div>
  );
}
