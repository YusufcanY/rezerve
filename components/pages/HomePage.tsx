'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import Link from 'next/link';
import { CalendarIcon, Dices, Minus, Plus, StarIcon, UserIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import moment from 'moment';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import HotelService from '@/service/hotel';
import Image from 'next/image';

const nearby = [
  {
    id: 1,
    name: 'Balıkesir',
    distance: 3,
    min_price: 10,
    max_price: 150,
    image: 'https://cdn2.enuygun.com/media/lib/500x300/uploads/image/ayvalik-51231.webp',
  },
  {
    id: 2,
    name: 'Bursa',
    distance: 2,
    min_price: 50,
    max_price: 100,
    image: 'https://cdn2.enuygun.com/media/lib/500x300/uploads/image/bursa-51230.webp',
  },
  {
    id: 3,
    name: 'Çanakkale',
    distance: 4,
    min_price: 20,
    max_price: 80,
    image: 'https://cdn2.enuygun.com/media/lib/500x300/uploads/image/canakkale-51229.webp',
  },
  {
    id: 4,
    name: 'Izmir',
    distance: 5,
    min_price: 80,
    max_price: 170,
    image: 'https://wp.oggusto.com/wp-content/uploads/2022/08/izmir-deniz.jpg',
  },
];

export default function HomePage() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const [searchParam, setSearchParam] = useState('');
  const [searchDate, setSearchDate] = useState<{ from: Date | undefined; to?: Date } | undefined>({
    from: moment().toDate(),
    to: moment().add(1, 'week').toDate(),
  });
  const [searchGuests, setSearchGuests] = useState({
    adults: 2,
    children: 0,
  });

  const { data: randomHotel, isSuccess: isRandomHotelSuccess } = useQuery({
    queryKey: ['hotel/random'],
    queryFn: HotelService.random,
  });
  const { data: popularHotels, isSuccess: isPopularHotelsSuccess } = useQuery({
    queryKey: ['hotel/popular'],
    queryFn: HotelService.popularHotels,
  });
  return (
    <>
      <section ref={heroRef} className="relative w-full overflow-hidden py-12 md:py-20 lg:py-40">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-gray-50 sm:text-4xl md:text-5xl lg:text-6xl">
              Find your perfect stay
            </h1>
            <p className="text-white/75 md:text-xl">
              Search for hotels, resorts, and more across the globe.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(
                  `/search?param=${searchParam}&from=${moment(searchDate?.from).format('x')}&to=${moment(searchDate?.to).format('x')}&adults=${searchGuests.adults}&children=${searchGuests.children}`,
                );
              }}
              className="mt-6 flex flex-col items-center gap-1 rounded-lg bg-white p-1 shadow-lg dark:bg-gray-800 lg:flex-row"
            >
              <Input
                className="flex-1 border-0 bg-transparent px-4 py-2 text-gray-900 focus:!ring-0 focus:!ring-offset-0 dark:text-gray-50"
                placeholder="Search by location, hotel or place name"
                type="text"
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
              />
              <div className="flex w-full gap-1 lg:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full lg:w-auto">
                      <CalendarIcon className="mr-2 h-5 w-5" />
                      <span>
                        {searchDate?.from &&
                          searchDate?.to &&
                          moment(searchDate?.to).diff(searchDate.from, 'days')}{' '}
                        nights
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
                    <Button variant="outline" className="w-full lg:w-auto">
                      <UserIcon className="h-5 w-5" />
                      <span className="ml-2">Guests</span>
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
                <Button type="submit" className="w-full lg:w-auto">
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            background:
              'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/b59565121495337.60c75de2a8936.jpg)',
            backgroundPosition: 'bottom',
            backgroundSize: 'cover',
            y: backgroundY,
          }}
        ></motion.div>
      </section>
      <main>
        {isPopularHotelsSuccess && popularHotels.hotels.length > 0 && (
          <section className="py-12 md:py-20 lg:py-28">
            <div className="container">
              <div className="mx-auto max-w-3xl space-y-4 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Popular Hotels
                </h2>
                <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                  Discover the best hotels for your next trip.
                </p>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {popularHotels.hotels.map((hotel) => (
                  <div
                    key={hotel._id}
                    className="group rounded-lg border border-gray-200 bg-white shadow-lg transition-all hover:border-primary"
                  >
                    <Link href={`/hotel/${hotel._id}`}>
                      <Image
                        alt="Hotel Image"
                        className="aspect-[3/2] w-full rounded-t-lg object-cover transition-all group-hover:scale-105"
                        height={400}
                        src={`${process.env.NEXT_PUBLIC_API}/uploads/${hotel.coverImage}`}
                        width={600}
                      />
                    </Link>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{hotel.name}</h3>
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-5 w-5 fill-primary stroke-primary" />
                          <span className="text-sm font-medium">{hotel.rating}</span>
                        </div>
                      </div>
                      <p className="mt-2 truncate text-muted-foreground">{hotel.description}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-lg font-bold">${hotel.minPrice}</span>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/hotel/${hotel._id}`}>Book Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="bg-gray-100 py-12 dark:bg-gray-800 md:py-20 lg:py-28 lg:pb-48">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Explore Nearby
              </h2>
              <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                Discover the best destinations near you.
              </p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {nearby.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
                >
                  <Link
                    className="flex flex-row gap-4"
                    href={`/search?param=${item.name}&from=${moment().format('x')}&to=${moment().add(1, 'week').format('x')}&adults=2&children=0`}
                  >
                    <div className="relative h-[124px] w-[124px]">
                      <img
                        alt="Hotel Image"
                        className="h-full w-full rounded-md transition-all group-hover:scale-[1.13]"
                        height={96}
                        src={item.image}
                        width={96}
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.distance}-hours drive</p>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold">
                          ${item.min_price} - ${item.max_price}
                          <span className="text-xs text-muted-foreground"> / night</span>
                        </span>
                        <Button size="sm" variant="outline">
                          Explore
                        </Button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        {isRandomHotelSuccess && randomHotel.hotel && (
          <section className="container mx-auto -mt-6 mb-12 md:-mt-12">
            <div className="flex flex-col items-center space-y-4 overflow-hidden rounded-xl bg-primary p-4 shadow-xl lg:flex-row lg:space-y-0 lg:p-0">
              <img
                alt="Random Hotel"
                height={400}
                src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/e7de6b121495337.60c75de17e773.jpg"
                width={400}
                style={{ boxShadow: '30px 0px 50px rgba(0, 0, 0, 0.1)' }}
                className="rounded-lg lg:rounded-none"
              />
              <div className="flex flex-1 flex-col items-center justify-center space-y-4">
                <h2 className="text-center text-4xl font-bold text-white">Try Random Hotel</h2>
                <p className="text-center text-lg text-white/75">
                  Sometimes the best trips are unplanned. Get a random hotel to stay in.
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-none bg-white/25 text-xl text-white"
                  asChild
                >
                  <Link href={'/hotel/' + randomHotel.hotel._id}>
                    <Dices className="mr-2 h-8 w-8" />
                    Roll Now
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
