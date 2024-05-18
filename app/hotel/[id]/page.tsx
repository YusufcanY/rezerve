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
  MapIcon,
  ShipWheelIcon,
  SofaIcon,
  TvIcon,
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

export default function HotelDetail() {
  const [activeTab, setActiveTab] = useState('available-rooms');

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
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:px-6 lg:py-16">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/rome">Rome</BreadcrumbLink>
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
      <Tabs value={activeTab} className="mx-auto w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="available-rooms" asChild>
            <Link href="#available-rooms">Available Rooms</Link>
          </TabsTrigger>
          <TabsTrigger value="things-to-do">
            <Link href="#things-to-do">Things to Do</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
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
      <Section>
        <div id="things-to-do">
          <h2 className="mb-4 text-2xl font-bold">Things to Do in New York City</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-950">
              <img
                alt="Popular Place 1"
                className="aspect-[3/2] w-1/2 object-cover"
                height={200}
                src="/placeholder.svg"
                width={300}
              />
              <div className="w-1/2 p-4">
                <h3 className="text-lg font-semibold">Central Park</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">0.5 miles away</p>
                <Button className="mt-4" size="sm" variant="outline">
                  <MapIcon className="mr-2 h-5 w-5" />
                  Directions
                </Button>
              </div>
            </div>
            <div className="flex items-center overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-950">
              <img
                alt="Popular Place 2"
                className="aspect-[3/2] w-1/2 object-cover"
                height={200}
                src="/placeholder.svg"
                width={300}
              />
              <div className="w-1/2 p-4">
                <h3 className="text-lg font-semibold">Metropolitan Museum of Art</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">1 mile away</p>
                <Button className="mt-4" size="sm" variant="outline">
                  <MapIcon className="mr-2 h-5 w-5" />
                  Directions
                </Button>
              </div>
            </div>
            <div className="flex items-center overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-950">
              <img
                alt="Popular Place 3"
                className="aspect-[3/2] w-1/2 object-cover"
                height={200}
                src="/placeholder.svg"
                width={300}
              />
              <div className="w-1/2 p-4">
                <h3 className="text-lg font-semibold">Times Square</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">0.8 miles away</p>
                <Button className="mt-4" size="sm" variant="outline">
                  <MapIcon className="mr-2 h-5 w-5" />
                  Directions
                </Button>
              </div>
            </div>
            <div className="flex items-center overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-950">
              <img
                alt="Popular Place 4"
                className="aspect-[3/2] w-1/2 object-cover"
                height={200}
                src="/placeholder.svg"
                width={300}
              />
              <div className="w-1/2 p-4">
                <h3 className="text-lg font-semibold">Brooklyn Bridge</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">2 miles away</p>
                <Button className="mt-4" size="sm" variant="outline">
                  <MapIcon className="mr-2 h-5 w-5" />
                  Directions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
