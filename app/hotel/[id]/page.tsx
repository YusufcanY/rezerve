'use client';

import {
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  Carousel,
} from '@/components/ui/carousel';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import {
  BathIcon,
  CoffeeIcon,
  FlowerIcon,
  ShipWheelIcon,
  SofaIcon,
  SquareParkingIcon,
  TvIcon,
  Utensils,
  ViewIcon,
  WifiIcon,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { useIntersectionObserver } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function HotelDetail() {
  const [activeTab, setActiveTab] = useState('details');

  const Section = ({ children }: { children: React.ReactElement }) => {
    const [ref, entry] = useIntersectionObserver({
      threshold: 0,
      root: null,
      rootMargin: '0px',
    });
    useEffect(() => {
      if (entry?.isIntersecting) setActiveTab(children.props.id);
    }, [entry?.isIntersecting]);
    return <section ref={ref}>{children}</section>;
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 md:px-6 lg:py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/search?param=Rome">Rome</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>The St. Regis Rome</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <h1 className="text-3xl font-black">The St. Regis Rome</h1>
        <Button asChild variant="link" className="p-0">
          <Link
            href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x13256cb7df8064c7:0xffc5e7bf84acf2b?sa=X&ved=1t:8290&ictx=111"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            Via Vittorio Emanuele Orlando, 3, 00185 Roma RM, İtalya
          </Link>
        </Button>
      </div>

      <div>
        <Carousel className="w-full">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <Tabs value={activeTab} className="mx-auto w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details" asChild>
            <Link href="#details">Details</Link>
          </TabsTrigger>
          <TabsTrigger value="available-rooms" asChild>
            <Link href="#available-rooms">Available Rooms</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Section>
        <div id="details">
          <section className="mt-8 grid gap-8 md:grid-cols-6">
            <div className="col-span-4">
              <h2 className="text-3xl font-bold">Details</h2>
              <p className="mt-2 text-gray-500">
                Experience the ultimate in mountain luxury at our stunning resort. Nestled in the
                heart of the Rockies, our hotel offers breathtaking views, world-class amenities,
                and exceptional service.
              </p>
              <span className="text-sm text-muted-foreground">
                2 guests · 1 bedroom · 1 bed · 1 bath
              </span>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <WifiIcon className="h-6 w-6 text-gray-500" />
                  <span>Free WiFi</span>
                </div>
                <div className="flex items-center gap-2">
                  <SquareParkingIcon className="h-6 w-6 text-gray-500" />
                  <span>Free Parking</span>
                </div>
                <div className="flex items-center gap-2">
                  <FlowerIcon className="h-6 w-6 text-gray-500" />
                  <span>Spa & Wellness</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="h-6 w-6 text-gray-500" />
                  <span>On-site Dining</span>
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Book Your Stay</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="check-in">Check-in</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="h-auto w-full flex-col items-start" variant="outline">
                            <span className="text-[0.65rem] font-semibold uppercase">Check in</span>
                            <span className="font-normal">4/2/2024</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-[276px] p-0">
                          <Calendar />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="check-out">Check-out</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button className="h-auto w-full flex-col items-start" variant="outline">
                            <span className="text-[0.65rem] font-semibold uppercase">
                              Check out
                            </span>
                            <span className="font-normal">10/2/2024</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="max-w-[276px] p-0">
                          <Calendar />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="guests">Guests</Label>
                      <Select>
                        <SelectTrigger className="h-auto">
                          <SelectValue
                            placeholder={
                              <div className="flex flex-col items-start">
                                <span className="text-[0.65rem] font-semibold uppercase">
                                  Guests
                                </span>
                                <span className="font-normal">2 adults</span>
                              </div>
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 adult</SelectItem>
                          <SelectItem value="2">2 adults</SelectItem>
                          <SelectItem value="3">2 adults + 1 child</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="h-12 w-full" size="lg">
                      Check Availability
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </Section>
      <Section>
        <div id="available-rooms">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Available Rooms</h2>
            <p className="text-muted-foreground">
              Choose from our selection of comfortable and stylish rooms.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-950">
              <img
                alt="Room Image"
                className="aspect-[4/3] object-cover"
                height={300}
                src="/placeholder.svg"
                width={400}
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">Deluxe Room</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">350 sq ft | 1 King Bed</p>
                <div className="mt-2 flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger>
                        <WifiIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Wifi</TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger>
                        <TvIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>TV</TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger>
                        <CoffeeIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Coffee</TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger>
                        <ViewIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>View</TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger>
                        <SofaIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Sofa</TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger>
                        <BathIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Bath</TooltipContent>
                    </Tooltip>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger>
                        <ShipWheelIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>Sea View</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-semibold">$250</span>
                  <Button size="sm">Book Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
