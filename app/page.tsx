'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select';
import Link from 'next/link';
import { CalendarIcon, StarIcon, UserIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import moment from 'moment';

const nearby = [
  {
    name: 'Balıkesir',
    distance: 3,
    min_price: 200,
    max_price: 400,
    image: 'https://cdn2.enuygun.com/media/lib/500x300/uploads/image/ayvalik-51231.webp',
  },
  {
    name: 'Bursa',
    distance: 2,
    min_price: 150,
    max_price: 300,
    image: 'https://cdn2.enuygun.com/media/lib/500x300/uploads/image/bursa-51230.webp',
  },
  {
    name: 'Çanakkale',
    distance: 4,
    min_price: 250,
    max_price: 450,
    image: 'https://cdn2.enuygun.com/media/lib/500x300/uploads/image/canakkale-51229.webp',
  },
  {
    name: 'İzmir',
    distance: 5,
    min_price: 300,
    max_price: 500,
    image: 'https://wp.oggusto.com/wp-content/uploads/2022/08/izmir-deniz.jpg',
  },
];

export default function Home() {
  return (
    <>
      <section
        style={{
          background:
            'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/b59565121495337.60c75de2a8936.jpg)',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
        }}
        className="w-full py-12 md:py-20 lg:py-40"
      >
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-gray-50 sm:text-4xl md:text-5xl lg:text-6xl">
              Find your perfect stay
            </h1>
            <p className="text-white/75 md:text-xl">
              Search for hotels, resorts, and more across the globe.
            </p>
            <form className="mt-6 flex items-center gap-1 rounded-lg bg-white p-1 shadow-lg dark:bg-gray-800">
              <Input
                className="flex-1 border-0 bg-transparent px-4 py-2 text-gray-900 focus:!ring-0 focus:!ring-offset-0 dark:text-gray-50"
                placeholder="Search by location"
                type="text"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="flex h-10 items-center justify-center rounded-md px-4 text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    variant="outline"
                  >
                    <CalendarIcon className="h-5 w-5" />
                    <span className="ml-2">Dates</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-[276px] p-0">
                  <Calendar mode="range" disabled={(date) => moment(date).isBefore(moment())} />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="flex h-10 items-center justify-center rounded-md px-4 text-gray-500 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    variant="outline"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span className="ml-2">Guests</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="max-w-[276px] space-y-4">
                  <div>
                    <Label>Adults</Label>
                    <Select defaultValue="2">
                      <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 guest</SelectItem>
                        <SelectItem value="2">2 guests</SelectItem>
                        <SelectItem value="3">3 guests</SelectItem>
                        <SelectItem value="4">4 guests</SelectItem>
                        <SelectItem value="5">5 guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>
                      Children <span className="text-xs text-muted-foreground">(0-12 years)</span>
                    </Label>
                    <Select>
                      <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 guest</SelectItem>
                        <SelectItem value="2">2 guests</SelectItem>
                        <SelectItem value="3">3 guests</SelectItem>
                        <SelectItem value="4">4 guests</SelectItem>
                        <SelectItem value="5">5 guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </PopoverContent>
              </Popover>
              <Button
                className="ml-2 flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-400 dark:focus:ring-gray-300"
                type="submit"
              >
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>
      <main>
        <section className="py-12 md:py-20 lg:py-28">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Popular Hotels
              </h2>
              <p className="text-gray-500 dark:text-gray-400 md:text-xl">
                Discover the best hotels for your next trip.
              </p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-lg border border-gray-200 bg-white shadow-lg transition-all hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-50">
                <Link className="block" href="#">
                  <img
                    alt="Hotel Image"
                    className="aspect-[3/2] w-full rounded-t-lg object-cover transition-all group-hover:scale-105"
                    height={400}
                    src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/469174310.jpg?k=22c5a2d3c07f6be45f2e092a7e3b75c0f2d0bb14286e9ca273e8384d9aaa374a&o=&hp=1"
                    width={600}
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">The St. Regis Rome</h3>
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-5 w-5 fill-foreground" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Renowned luxury hotel with a lavish spa.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold">$400</span>
                      <Button size="sm" variant="outline">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="group rounded-lg border border-gray-200 bg-white shadow-lg transition-all hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-50">
                <Link className="block" href="#">
                  <img
                    alt="Hotel Image"
                    className="aspect-[3/2] w-full rounded-t-lg object-cover transition-all group-hover:scale-105"
                    height={400}
                    src="https://media.cntraveler.com/photos/5c17cdbfbc3f676aee45e9d8/16:9/w_2560,c_limit/The-Ritz-Carlton,-Grand-Cayman__2018_TRC_GRANDCAYMAN_GW_SELECTS-142.jpg"
                    width={600}
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">The Ritz-Carlton, Grand Cayman</h3>
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-5 w-5 fill-foreground" />
                        <span className="text-sm font-medium">4.7</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Luxury resort with a golf course and spa.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold">$600</span>
                      <Button size="sm" variant="outline">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="group rounded-lg border border-gray-200 bg-white shadow-lg transition-all hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-50">
                <Link className="block" href="#">
                  <img
                    alt="Hotel Image"
                    className="aspect-[3/2] w-full rounded-t-lg object-cover transition-all group-hover:scale-105"
                    height={400}
                    src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fit,w_1440,h_900/crm/miamifl/strMIAXR.1154583_A52B2255-833C-4E74-AF01EAAE6395FAE3_a33ccfff-3b78-43ec-be9e69b604c6e22b.jpg"
                    width={600}
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">The St. Regis Bal Harbour Resort</h3>
                      <div className="flex items-center gap-1">
                        <StarIcon className="h-5 w-5 fill-foreground" />
                        <span className="text-sm font-medium">4.9</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Elegant beachfront resort with a spa.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold">$800</span>
                      <Button size="sm" variant="outline">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-100 py-12 dark:bg-gray-800 md:py-20 lg:py-28">
          <div className="container px-4 md:px-6">
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
                <div className="group rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                  <Link className="flex flex-row gap-4" href="#">
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
                          ₺{item.min_price} - ₺{item.max_price}
                          <span className="text-xs text-muted-foreground"> / night</span>
                        </span>
                        <Button size="sm" variant="outline">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
