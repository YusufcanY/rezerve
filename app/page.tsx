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

export default function Home() {
  return (
    <>
      <header className="w-full bg-gray-900 py-12 md:py-20 lg:py-28">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter text-gray-50 sm:text-4xl md:text-5xl lg:text-6xl">
              Find your perfect stay
            </h1>
            <p className="text-gray-400 md:text-xl">
              Search for hotels, resorts, and more across the globe.
            </p>
            <form className="mt-6 flex items-center rounded-lg bg-white p-1 shadow-lg dark:bg-gray-800">
              <Input
                className="flex-1 bg-transparent px-4 py-2 text-gray-900 focus:border-none focus:outline-none focus:ring-0 dark:text-gray-50"
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
                  <Calendar />
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
                <PopoverContent className="max-w-[276px] p-0">
                  <Select defaultValue="2">
                    <SelectTrigger className="w-full">
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
      </header>
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
                    src="/placeholder.svg"
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
                    src="/placeholder.svg"
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
                    src="/placeholder.svg"
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
                Discover hotels and attractions near your location.
              </p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-gray-200 bg-white shadow-lg transition-all hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-50">
                <Link className="flex flex-row" href="#">
                  <div className="relative h-48 w-48 overflow-hidden rounded-l-lg">
                    <img
                      alt="Hotel Image"
                      className="h-full w-full object-cover transition-all group-hover:scale-105"
                      height={400}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: '400/400',
                        objectFit: 'cover',
                      }}
                      width={400}
                    />
                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-medium shadow-md dark:bg-gray-950">
                      <StarIcon className="h-4 w-4 fill-foreground" />
                      <span>4.6</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-lg font-semibold">The Inn at the Roman Forum</h3>
                    <p />
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold">$300</span>
                      <Button className="w-full" size="sm" variant="outline">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white shadow-lg transition-all hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-50">
                <Link className="flex flex-row" href="#">
                  <div className="relative h-48 w-48 overflow-hidden rounded-l-lg">
                    <img
                      alt="Hotel Image"
                      className="h-full w-full object-cover transition-all group-hover:scale-105"
                      height={400}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: '400/400',
                        objectFit: 'cover',
                      }}
                      width={400}
                    />
                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-medium shadow-md dark:bg-gray-950">
                      <StarIcon className="h-4 w-4 fill-foreground" />
                      <span>4.4</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-lg font-semibold">Hotel Roma</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Vibrant property with free breakfast.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold">$150</span>
                      <Button size="sm" variant="outline">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white shadow-lg transition-all hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-50">
                <Link className="flex flex-row" href="#">
                  <div className="relative h-48 w-48 overflow-hidden rounded-l-lg">
                    <img
                      alt="Hotel Image"
                      className="h-full w-full object-cover transition-all group-hover:scale-105"
                      height={400}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: '400/400',
                        objectFit: 'cover',
                      }}
                      width={400}
                    />
                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-medium shadow-md dark:bg-gray-950">
                      <StarIcon className="h-4 w-4 fill-foreground" />
                      <span>4.7</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-lg font-semibold">The St. Regis Florence</h3>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Boutique hotel with a rooftop bar.
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
              <div className="rounded-lg border border-gray-200 bg-white shadow-lg transition-all hover:border-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-50">
                <Link className="flex flex-row" href="#">
                  <div className="relative h-48 w-48 overflow-hidden rounded-l-lg">
                    <img
                      alt="Hotel Image"
                      className="h-full w-full object-cover transition-all group-hover:scale-105"
                      height={400}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: '400/400',
                        objectFit: 'cover',
                      }}
                      width={400}
                    />
                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-medium shadow-md dark:bg-gray-950">
                      <StarIcon className="h-4 w-4 fill-foreground" />
                      <span>4.5</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-lg font-semibold">Hyatt Regency Grand Cypress Resort</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
