import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';

export default function SearchResults() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900">
          <Carousel className="group w-full">
            <CarouselContent>
              <CarouselItem className="basis-full">
                <img
                  alt="Hotel Exterior"
                  className="aspect-[2/1] object-cover"
                  height={600}
                  src="/placeholder.svg"
                  width={1200}
                />
              </CarouselItem>
              <CarouselItem className="basis-full">
                <img
                  alt="Hotel Lobby"
                  className="aspect-[2/1] object-cover"
                  height={600}
                  src="/placeholder.svg"
                  width={1200}
                />
              </CarouselItem>
              <CarouselItem className="basis-full">
                <img
                  alt="Hotel Amenities"
                  className="aspect-[2/1] object-cover"
                  height={600}
                  src="/placeholder.svg"
                  width={1200}
                />
              </CarouselItem>
            </CarouselContent>
            <div className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <CarouselPrevious className="left-2 h-6 w-6" />
            </div>
            <div className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <CarouselNext className="right-2 h-6 w-6" />
            </div>
          </Carousel>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">The Ritz-Carlton, Bali</h3>
              <div className="flex items-center gap-1">
                <StarIcon className="h-5 w-5 fill-primary stroke-primary" />
                <span className="text-sm font-medium">4.8</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">Bali, Indonesia</div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-semibold">
                $450 <span className="text-sm font-medium text-muted-foreground">night</span>
              </span>
              <Button asChild size="sm" variant="ghost-secondary">
                <Link href="/hotel/1">Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
