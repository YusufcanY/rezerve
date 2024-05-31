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
  Minus,
  Plus,
  SearchIcon,
  StarIcon,
  UserIcon,
} from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import HotelService from '@/service/hotel';
import SearchLoading from './search/SearchLoading';
import SearchNotFound from './search/SearchNotFound';
import SearchResults from './search/SearchResults';

export default function SearchPage({
  params,
}: {
  params: { param: string; from: string; to: string; adults: string; children: string };
}) {
  const [filters, setFilters] = useState({
    param: params.param,
    from: moment(Number(params.from)).toDate(),
    to: moment(Number(params.to)).toDate(),
    adults: Number(params.adults),
    children: Number(params.children),
  });
  const [searchParam, setSearchParam] = useState(params.param);
  const [searchDate, setSearchDate] = useState<{ from: Date | undefined; to?: Date } | undefined>({
    from: moment(Number(params.from)).toDate(),
    to: moment(Number(params.to)).toDate(),
  });
  const [searchGuests, setSearchGuests] = useState({
    adults: Number(params.adults),
    children: Number(params.children),
  });
  const { data, isFetching, isRefetching, isError, refetch } = useQuery({
    queryKey: ['hotel/search', filters],
    queryFn: () => {
      return HotelService.search({
        query: filters.param,
        dates: {
          from: moment(filters.from).format('YYYY-MM-DD'),
          to: moment(filters.to).format('YYYY-MM-DD'),
        },
        guestCount: filters.adults,
        amenities: [],
        rating: 1,
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => console.log('data :>> ', data), [data]);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="bg-white">
        <div className="container mx-auto pb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setFilters({
                param: searchParam,
                from: searchDate?.from || filters.from,
                to: searchDate?.to || filters.to,
                adults: searchGuests.adults,
                children: searchGuests.children,
              });
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
        {isFetching && !isRefetching ? (
          <SearchLoading />
        ) : isError || !data || !(data && data.hotels.length > 0) ? (
          <SearchNotFound />
        ) : (
          <SearchResults />
        )}
      </div>
    </div>
  );
}
