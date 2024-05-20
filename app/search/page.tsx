'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  CalendarIcon,
  FilterIcon,
  LoaderCircle,
  Minus,
  Plus,
  SearchIcon,
  StarIcon,
  UserIcon,
} from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function Search() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParam, setSearchParam] = useState('');
  const [searchDate, setSearchDate] = useState<{ from: Date | undefined; to?: Date } | undefined>({
    from: moment().toDate(),
    to: moment().add(1, 'week').toDate(),
  });
  const [searchGuests, setSearchGuests] = useState({
    adults: 2,
    children: 0,
  });
  useEffect(() => {
    if (!searchParams) return;
    setSearchParam(searchParams.get('param') || '');
    setSearchDate({
      from: searchParams.get('from') ? new Date(parseInt(searchParams.get('from')!)) : undefined,
      to: searchParams.get('to') ? new Date(parseInt(searchParams.get('to')!)) : undefined,
    });
    setSearchGuests({
      adults: parseInt(searchParams.get('adults') || '2', 10),
      children: parseInt(searchParams.get('children') || '0', 10),
    });
    setIsLoading(false);
  }, [searchParams]);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="bg-white">
        <div className="container mx-auto pb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex w-full flex-col items-center gap-1 rounded-lg border border-foreground/25 bg-white p-1 shadow-lg transition-colors duration-200 focus-within:border-primary dark:bg-gray-800 lg:flex-row"
          >
            <div className="relative flex-1">
              <Input
                className="border-0 bg-transparent py-2 pl-10 pr-4 text-gray-900 focus:!ring-0 focus:!ring-offset-0 dark:text-gray-50"
                placeholder="Search by location, hotel or place name"
                type="text"
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
              />
              <SearchIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
            </div>
            <div className="flex gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="flex h-10 items-center justify-center rounded-md px-4 text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    variant="outline"
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    <span>
                      {searchDate?.from && searchDate?.to
                        ? `${moment(searchDate.from).format('MMM DD')} - ${moment(
                            searchDate.to,
                          ).format('MMM DD')}`
                        : 'Date'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    selected={searchDate}
                    onSelect={(e) => setSearchDate(e)}
                    mode="range"
                    numberOfMonths={2}
                    disabled={(date) => moment(date).isBefore(moment().add(-1, 'day'))}
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="flex h-10 items-center justify-center rounded-md px-4 text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    variant="outline"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span className="ml-2">
                      {searchGuests.adults} adults{' '}
                      {searchGuests.children > 0 && `and ${searchGuests.children} children`}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-[276px] space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Adults</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          searchGuests.adults < 12 &&
                          setSearchGuests((prev) => ({ ...prev, adults: prev.adults + 1 }))
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <span className="text-2xl font-semibold">{searchGuests.adults}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          searchGuests.adults > 0 &&
                          setSearchGuests((prev) => ({ ...prev, adults: prev.adults - 1 }))
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Childrens</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          searchGuests.children < 12 &&
                          setSearchGuests((prev) => ({ ...prev, children: prev.children + 1 }))
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <span className="text-2xl font-semibold">{searchGuests.children}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          searchGuests.children > 0 &&
                          setSearchGuests((prev) => ({ ...prev, children: prev.children - 1 }))
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button type="submit">
                <SearchIcon className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8 md:grid-cols-[240px_1fr]">
        <div className="rounded-lg bg-white shadow-sm dark:bg-gray-900">
          <div className="flex items-center border-b px-6 py-4 dark:border-gray-800">
            <FilterIcon className="mr-2 h-5 w-5" />
            <h3 className="text-lg font-semibold">Filters</h3>
          </div>
          <div className="space-y-6 p-6">
            <div>
              <h4 className="mb-2 text-sm font-semibold">Room Type</h4>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="room-type-single" />
                  Single{'\n                            '}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="room-type-double" />
                  Double{'\n                            '}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="room-type-suite" />
                  Suite{'\n                            '}
                </Label>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold">Amenities</h4>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="amenity-wifi" />
                  WiFi{'\n                            '}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="amenity-pool" />
                  Pool{'\n                            '}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="amenity-gym" />
                  Gym{'\n                            '}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="amenity-spa" />
                  Spa{'\n                            '}
                </Label>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold">Star Rating</h4>
              <div className="space-y-2">
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="rating-5" />5 stars{'\n                            '}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="rating-4" />4 stars{'\n                            '}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="rating-3" />3 stars{'\n                            '}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="rating-2" />2 stars{'\n                            '}
                </Label>
                <Label className="flex items-center gap-2 font-normal">
                  <Checkbox id="rating-1" />1 star{'\n                            '}
                </Label>
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div>
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
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900">
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
        )}
      </div>
    </div>
  );
}
