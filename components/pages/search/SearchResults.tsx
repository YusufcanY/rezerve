import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchResults({ data }: { data: Hotel[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((hotel, i) => (
        <div
          key={i}
          className="h-fit overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900"
        >
          <Carousel className="group w-full">
            <CarouselContent>
              <CarouselItem className="basis-full">
                <Image
                  alt="Hotel Exterior"
                  className="aspect-[2/1] object-cover"
                  height={600}
                  src={
                    (hotel.coverImage &&
                      `${process.env.NEXT_PUBLIC_API}/uploads/${hotel.coverImage}`) ||
                    '/placeholder.svg'
                  }
                  width={1200}
                />
              </CarouselItem>
              {hotel.images.length > 0 &&
                hotel.images.map((image, index) => (
                  <CarouselItem key={index} className="basis-full">
                    <Image
                      alt="Hotel Lobby"
                      className="aspect-[2/1] object-cover"
                      height={600}
                      src={`${process.env.NEXT_PUBLIC_API}/uploads/${image}`}
                      width={1200}
                    />
                  </CarouselItem>
                ))}
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
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
              <div className="flex items-center gap-1">
                <StarIcon className="h-5 w-5 fill-primary stroke-primary" />
                <span className="text-sm font-medium">{hotel.rating}</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {hotel.location.city}, {hotel.location.country}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-semibold">
                ${hotel.minPrice}{' '}
                <span className="text-sm font-medium text-muted-foreground">night</span>
              </span>
              <Button asChild size="sm" variant="ghost-secondary">
                <Link href={`/hotel/${hotel._id}`}>Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
