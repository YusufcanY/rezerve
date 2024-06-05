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
  CalendarCheck,
  Check,
  HandCoins,
  Loader2,
  MapPin,
  Minus,
  Plus,
  Sparkles,
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
import { useEffect, useRef, useState } from 'react';
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
import { useInView } from 'framer-motion';
import { useMutation, useQuery } from '@tanstack/react-query';
import HotelService from '@/service/hotel';
import HotelNotFoundPage from '@/components/pages/hotel/HotelNotFoundPage';
import HotelLoading from '@/components/pages/hotel/HotelLoading';
import moment from 'moment';
import amenities from '@/constants/amenities';
import Image from 'next/image';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useUserStore from '@/store/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import ImageWithFallback from '../ImageWithFallback';

export default function HotelDetailPage({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isUserLoggedIn = useUserStore((state) => state.isUserLoggedIn);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isDatePopupOpen, setIsDatePopupOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState<{
    room: string | null;
    from?: Date;
    to?: Date;
    adults: number;
    children: number;
  }>({
    room: null,
    from: undefined,
    to: undefined,
    adults: 2,
    children: 0,
  });
  const [activeTab, setActiveTab] = useState('details');
  const detailRef = useRef<HTMLDivElement>(null);
  const isDetailInView = useInView(detailRef);
  const roomsRef = useRef<HTMLDivElement>(null);
  const isRoomsInView = useInView(roomsRef);

  const { data, isFetching, isRefetching, isError, isFetched, isSuccess, refetch } = useQuery({
    queryKey: ['hotel/detail', id],
    queryFn: () => HotelService.hotel(id),
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) => data.hotel,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: HotelService.createReservation,
    onSuccess: () => {
      setBookDetails({ room: null, from: undefined, to: undefined, adults: 2, children: 0 });
      setIsSuccessDialogOpen(true);
      refetch();
    },
  });

  useEffect(() => {
    if (isDetailInView) {
      setActiveTab('details');
    } else if (isRoomsInView) {
      setActiveTab('available-rooms');
    }
  }, [isDetailInView, isRoomsInView]);

  useEffect(() => {
    if (isFetched && isSuccess && data.rooms.length === 1)
      setBookDetails((prev) => ({ ...prev, room: data.rooms[0]._id }));
  }, [isFetched]);

  useEffect(() => {
    const roomId = searchParams.get('room');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const adults = searchParams.get('adults');
    const children = searchParams.get('children');
    if (roomId) {
      setBookDetails((prev) => ({ ...prev, room: roomId }));
    }
    if (from) {
      setBookDetails((prev) => ({ ...prev, from: moment(from).toDate() }));
    }
    if (to) {
      setBookDetails((prev) => ({ ...prev, to: moment(to).toDate() }));
    }
    if (adults) {
      setBookDetails((prev) => ({ ...prev, adults: parseInt(adults) }));
    }
    if (children) {
      setBookDetails((prev) => ({ ...prev, children: parseInt(children) }));
    }
  }, [searchParams]);

  if (isFetching && !isRefetching) return <HotelLoading />;
  if (isError || !data) return <HotelNotFoundPage />;
  return (
    <div className="container mx-auto grid gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/search?param=${data.location.city}&from=${moment().format('x')}&to=${moment().add(1, 'week').format('x')}&adults=2&children=0`}
            >
              {data.location.city}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        <h1 className="text-3xl font-black">{data.name}</h1>
        <Button asChild variant="link" className="p-0">
          <Link
            href={`https://www.google.com/maps/place/${data.location.city}, ${data.location.country}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            {data.location.city}, {data.location.country}
          </Link>
        </Button>
      </div>

      <div>
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="basis-full">
              <ImageWithFallback
                alt="Hotel Cover"
                className="aspect-[2/1] object-cover"
                height={1336 / 2}
                src={
                  (data.coverImage &&
                    `${process.env.NEXT_PUBLIC_API}/uploads/${data.coverImage}`) ||
                  '/placeholder.svg'
                }
                fallback={'/placeholder.svg'}
                width={1336}
              />
            </CarouselItem>
            {data.images.length > 0 &&
              data.images.map((image, index) => (
                <CarouselItem key={index} className="basis-full">
                  <ImageWithFallback
                    alt="Hotel Image"
                    className="aspect-[2/1] object-cover"
                    height={1336 / 2}
                    src={`${process.env.NEXT_PUBLIC_API}/uploads/${image}`}
                    width={1336}
                    fallback={'/placeholder.svg'}
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="sticky top-0 z-10 flex w-full justify-center bg-gradient-to-b from-white to-transparent pt-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details" asChild>
              <Link className="px-6" href="#details">
                Details
              </Link>
            </TabsTrigger>
            <TabsTrigger value="available-rooms" asChild>
              <Link className="px-6" href="#available-rooms">
                Available Rooms
              </Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <section className="mt-8 grid gap-8 md:grid-cols-6">
        <div className="col-span-4">
          <h2 ref={detailRef} id="details" className="text-3xl font-bold">
            Details
          </h2>
          <p className="mt-2 text-gray-500">{data.description}</p>
          <span className="text-sm text-muted-foreground">{data.maxOccupantCount} guests</span>
          <div className="mt-6 grid grid-cols-3 gap-2">
            <div className="col-span-3">
              <h5 className="text-lg font-medium">Amenities</h5>
            </div>
            {data.amenities.map((amenity) => {
              const amenityData = amenities.find((a) => a.id === amenity);
              return (
                <div key={amenityData?.id || amenity} className="flex items-center gap-2">
                  {amenityData?.icon && <amenityData.icon className="h-6 w-6 text-gray-500" />}
                  <span>{amenityData?.text || amenity}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-2">
          <Card id="book">
            <CardHeader>
              <CardTitle>Book Your Stay</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!bookDetails.to) return toast.error('Please select a date range');
                  const room = data.rooms.find((i) => i._id === bookDetails.room)!;
                  if (bookDetails.adults > room.occupantCount)
                    return toast.error(
                      'Too many occupants for this room. Max occupant count for this room: ' +
                        room.occupantCount,
                    );
                  if (!isUserLoggedIn)
                    return router.push(
                      `/register?hotel=${id}&room=${bookDetails.room}&from=${moment(
                        bookDetails.from,
                      ).format(
                        'YYYY-MM-DD',
                      )}&to=${moment(bookDetails.to).format('YYYY-MM-DD')}&adults=${bookDetails.adults}&children=${bookDetails.children}&redirect=booking`,
                    );
                  mutate({
                    hotel: id,
                    room: bookDetails.room as string,
                    occupantCount: { adult: bookDetails.adults, children: bookDetails.children },
                    dates: {
                      from: moment(bookDetails.from).format('YYYY-MM-DD'),
                      to: moment(bookDetails.to).format('YYYY-MM-DD'),
                    },
                  });
                }}
                className="grid gap-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor="date">Room</Label>
                  <Select
                    value={bookDetails.room || undefined}
                    onValueChange={(v) => {
                      if (v.length !== 0) setBookDetails({ ...bookDetails, room: v });
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pick a room" />
                    </SelectTrigger>
                    <SelectContent>
                      {data.rooms.map((room) => (
                        <SelectItem key={room._id} value={room._id}>
                          {room.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover
                    open={isDatePopupOpen}
                    onOpenChange={(v) =>
                      bookDetails.room
                        ? setIsDatePopupOpen(v)
                        : toast('Pick a room before selecting dates')
                    }
                  >
                    <PopoverTrigger asChild>
                      <Button
                        className="h-auto w-full items-center justify-between"
                        variant="outline"
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-xs font-semibold uppercase">Check in</span>
                          <span className="font-normal">
                            {bookDetails.from
                              ? moment(bookDetails.from).format('DD/MM/YYYY')
                              : 'Select Date'}
                          </span>
                        </div>
                        <div>-</div>
                        <div className="flex flex-col items-start">
                          <span className="text-xs font-semibold uppercase">Check out</span>
                          <span className="font-normal">
                            {bookDetails.to
                              ? moment(bookDetails.to).format('DD/MM/YYYY')
                              : 'Select Date'}
                          </span>
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        selected={{ from: bookDetails.from, to: bookDetails.to }}
                        onSelect={(e) => {
                          if (e && e.from && e.to) {
                            const isDatesContainReserved = data.rooms
                              .find((i) => i._id === bookDetails.room)
                              ?.reservedDates.some((reserved) =>
                                moment(reserved.from).isBetween(e.from, e.to, 'days', '[]'),
                              );
                            if (isDatesContainReserved)
                              setBookDetails({ ...bookDetails, from: undefined, to: undefined });
                            else setBookDetails({ ...bookDetails, ...e });
                          } else {
                            setBookDetails({ ...bookDetails, ...e });
                          }
                        }}
                        mode="range"
                        numberOfMonths={2}
                        disabled={(date) => {
                          if (moment(date).isBefore(moment())) return true;
                          const isReserved = data.rooms
                            .find((i) => i._id === bookDetails.room)
                            ?.reservedDates.some((reserved) =>
                              moment(date).isBetween(reserved.from, reserved.to, 'days', '[]'),
                            );

                          return isReserved || false;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="guests">Guests</Label>
                  <Popover>
                    <PopoverTrigger asChild id="guests">
                      <Button variant="outline" className="justify-start">
                        {bookDetails.adults} adults{' '}
                        {bookDetails.children > 0 && `and ${bookDetails.children} children`}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-[var(--radix-popover-trigger-width)] space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Adults</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={bookDetails.adults === 1}
                            onClick={() =>
                              bookDetails.adults > 1 &&
                              setBookDetails((prev) => ({ ...prev, adults: prev.adults - 1 }))
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-2xl font-semibold">{bookDetails.adults}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            disabled={bookDetails.adults === 12}
                            onClick={() =>
                              bookDetails.adults < 12 &&
                              setBookDetails((prev) => ({ ...prev, adults: prev.adults + 1 }))
                            }
                          >
                            <Plus className="h-4 w-4" />
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
                              bookDetails.children > 0 &&
                              setBookDetails((prev) => ({ ...prev, children: prev.children - 1 }))
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-2xl font-semibold">{bookDetails.children}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              bookDetails.children < 12 &&
                              setBookDetails((prev) => ({ ...prev, children: prev.children + 1 }))
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <Button size="lg">
                  {isPending ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <CalendarCheck className="mr-2 h-5 w-5" />
                  )}
                  Book
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="space-y-4">
        <div>
          <h2 ref={roomsRef} id="available-rooms" className="text-3xl font-bold">
            Available Rooms
          </h2>
          <p className="text-muted-foreground">
            Choose from our selection of comfortable and stylish rooms.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.rooms.map((room) => (
            <div
              key={room.name}
              className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-950"
            >
              {/* <img alt="Room Image" className="aspect-[4/3] object-cover" src="/placeholder.svg" /> */}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{room.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {room.squareMeters} m2 | {room.occupantCount} guests
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <TooltipProvider>
                    {room.amenities.map((amenity) => {
                      const amenityData = amenities.find((a) => a.id === amenity);
                      return (
                        <Tooltip key={amenityData?.id || amenity} delayDuration={0}>
                          <TooltipTrigger>
                            {amenityData?.icon ? (
                              <amenityData.icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            ) : (
                              <Sparkles className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            )}
                          </TooltipTrigger>
                          <TooltipContent>{amenityData?.text || amenity}</TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </TooltipProvider>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-semibold">${room.price}</span>
                  <Button size="sm" asChild>
                    <Link
                      href="#book"
                      onClick={() => setBookDetails({ ...bookDetails, room: room._id })}
                    >
                      Book Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Success</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="grid h-24 w-24 place-content-center rounded-full ring-4 ring-green-500">
              <Check className="h-16 w-16 text-green-500" />
            </div>
            <p>Your reservation has been successfully booked.</p>
            <Alert>
              <HandCoins className="h-6 w-6" />
              <AlertTitle>About Payment</AlertTitle>
              <AlertDescription>You&apos;ll pay at the hotel after your stay.</AlertDescription>
            </Alert>
            <Alert>
              <MapPin className="h-6 w-6" />
              <AlertTitle>Location</AlertTitle>
              <AlertDescription>
                You&apos;ll get the location details and other information in your email.
              </AlertDescription>
            </Alert>
            <Button asChild>
              <Link href="/profile">Go to Profile</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
