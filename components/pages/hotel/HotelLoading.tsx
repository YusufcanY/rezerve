import { Skeleton } from '@/components/ui/skeleton';

export default function HotelLoading() {
  return (
    <div className="container mx-auto space-y-8">
      <div>
        <Skeleton className="h-4 w-32 rounded-md" />
        <Skeleton className="mt-4 h-8 w-56 rounded-md" />
        <Skeleton className="mt-2 h-4 w-72 rounded-md" />
      </div>
      <div className="grid h-96 grid-cols-12 grid-rows-2 gap-4">
        <Skeleton className="col-span-8 row-span-2 rounded-lg" />
        <Skeleton className="col-span-4 row-span-1 rounded-lg" />
        <Skeleton className="col-span-4 row-span-1 rounded-lg" />
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <Skeleton className="h-8 w-56 rounded-md" />
          <Skeleton className="mt-4 h-4 w-72 rounded-md" />
          <Skeleton className="mt-2 h-4 w-32 rounded-md" />
          <div className="mt-8 grid grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <Skeleton className="h-96 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
