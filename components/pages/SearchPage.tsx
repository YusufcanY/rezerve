'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PopoverTrigger, PopoverContent, Popover } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  ArrowDownAz,
  CalendarIcon,
  ChevronDown,
  FilterIcon,
  Minus,
  Plus,
  SearchIcon,
  StarIcon,
  UserIcon,
} from 'lucide-react';
import moment from 'moment';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import HotelService from '@/service/hotel';
import SearchLoading from './search/SearchLoading';
import SearchNotFound from './search/SearchNotFound';
import SearchResults from './search/SearchResults';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import amenities from '@/constants/amenities';
import classNames from 'classnames';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMediaQuery } from '@/hooks/use-media-query';

const SearchSchema = z.object({
  amenities: z.array(z.string()).optional(),
  rating: z.enum(['5', '4', '3', '2', '0'], {
    required_error: 'You need to select a rating filter',
  }),
});

type SearchFormValues = z.infer<typeof SearchSchema>;

export default function SearchPage({
  params,
}: {
  params: { param: string; from: string; to: string; adults: string; children: string };
}) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [filters, setFilters] = useState({
    param: params.param,
    from: moment(Number(params.from)).toDate(),
    to: moment(Number(params.to)).toDate(),
    adults: Number(params.adults),
    children: Number(params.children),
  });
  const [sortOptions, setSortOptions] = useState('rating-desc');
  const [isShowingAllAmenities, setIsShowingAllAmenities] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchParam, setSearchParam] = useState(params.param);
  const [searchDate, setSearchDate] = useState<{ from: Date | undefined; to?: Date } | undefined>({
    from: moment(Number(params.from)).toDate(),
    to: moment(Number(params.to)).toDate(),
  });
  const [searchGuests, setSearchGuests] = useState({
    adults: Number(params.adults),
    children: Number(params.children),
  });

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      rating: '0',
    },
  });

  const { data, isFetching, isRefetching, isError, refetch } = useQuery({
    queryKey: ['hotel/search', filters, sortOptions],
    queryFn: () => {
      return HotelService.search({
        query: filters.param,
        dates: {
          from: moment(filters.from).format('YYYY-MM-DD'),
          to: moment(filters.to).format('YYYY-MM-DD'),
        },
        guestCount: filters.adults,
        amenities: form.getValues().amenities || [],
        rating: Number(form.getValues().rating),
        sort: {
          ...(sortOptions === 'price-asc' && { minPrice: 'asc' }),
          ...(sortOptions === 'price-desc' && { minPrice: 'desc' }),
          ...(sortOptions === 'rating-desc' && { rating: 'desc' }),
        },
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
    gcTime: 0,
  });

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
            className="flex w-full flex-col items-center gap-1 rounded-lg border border-foreground/25 bg-white p-1 shadow-lg transition-colors duration-200 focus-within:border-primary dark:bg-gray-800 sm:flex-row"
          >
            <div className="relative w-full flex-1">
              <Input
                className="border-0 bg-transparent py-2 pl-10 pr-4 text-gray-900 focus:!ring-0 focus:!ring-offset-0 dark:text-gray-50"
                placeholder="Search by location, hotel or place name"
                type="text"
                value={searchParam}
                onChange={(e) => setSearchParam(e.target.value)}
              />
              <SearchIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
            </div>
            <div className="flex w-full gap-1 sm:w-auto">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
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
                    variant="outline"
                    className="max-sm:w-full"
                    size={isMobile ? 'icon' : 'default'}
                  >
                    <UserIcon className="h-5 w-5" />
                    <span className="ml-2 hidden sm:block">
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
                        disabled={searchGuests.adults === 1}
                        onClick={() =>
                          searchGuests.adults > 0 &&
                          setSearchGuests((prev) => ({ ...prev, adults: prev.adults - 1 }))
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-2xl font-semibold">{searchGuests.adults}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={searchGuests.adults === 12}
                        onClick={() =>
                          searchGuests.adults < 12 &&
                          setSearchGuests((prev) => ({ ...prev, adults: prev.adults + 1 }))
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
                        disabled={searchGuests.children === 0}
                        onClick={() =>
                          searchGuests.children > 0 &&
                          setSearchGuests((prev) => ({ ...prev, children: prev.children - 1 }))
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-2xl font-semibold">{searchGuests.children}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={searchGuests.children === 12}
                        onClick={() =>
                          searchGuests.children < 12 &&
                          setSearchGuests((prev) => ({ ...prev, children: prev.children + 1 }))
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button type="submit" size={isMobile ? 'icon' : 'default'} className="max-sm:w-full">
                <SearchIcon className="h-5 w-5" />
                <span className="ml-2 hidden md:block">Search</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-x-8 gap-y-2 py-8 md:grid-cols-[240px_1fr]">
        <div className="col-span-2 flex justify-end">
          {/* add sort select */}
          <Select onValueChange={setSortOptions} value={sortOptions}>
            <SelectTrigger className="w-full md:max-w-xs">
              <ArrowDownAz className="mr-2 h-5 w-5" />
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Price (Low to High)</SelectItem>
              <SelectItem value="price-desc">Price (High to Low)</SelectItem>
              <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2 h-fit rounded-lg bg-white shadow-sm md:col-span-1">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <FilterIcon className="mr-2 h-5 w-5" />
              <h3 className="text-lg font-semibold">Filters</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => refetch())}
              className={classNames('space-y-6 border-t p-6', {
                'hidden md:block': !isFiltersOpen,
              })}
            >
              <div>
                <FormField
                  control={form.control}
                  name="amenities"
                  render={() => (
                    <FormItem>
                      <div>
                        <FormLabel className="text-base">Amenities</FormLabel>
                      </div>
                      <div
                        className={classNames(
                          'flex flex-col gap-2 overflow-y-hidden transition-all duration-300',
                          {
                            'max-h-[200px]': !isShowingAllAmenities,
                            'max-h-[1000px]': isShowingAllAmenities,
                          },
                        )}
                      >
                        {amenities.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="amenities"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        const updatedValue = field.value || [];
                                        if (checked) field.onChange([...updatedValue, item.id]);
                                        else
                                          field.onChange(
                                            updatedValue.filter((value) => value !== item.id),
                                          );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">{item.text}</FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      {!isShowingAllAmenities && (
                        <div className="relative z-10 !-mt-10 flex justify-center bg-gradient-to-t from-white via-white to-transparent pt-7">
                          <Button
                            variant="outline"
                            onClick={() => setIsShowingAllAmenities(true)}
                            size="sm"
                          >
                            Show all
                          </Button>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>User Rating</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="0" />
                            </FormControl>
                            <FormLabel className="flex gap-2 font-normal">All Ratings</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="5" />
                            </FormControl>
                            <FormLabel className="flex gap-2 font-normal">
                              5<StarIcon className="h-4 w-4 fill-primary text-primary opacity-75" />
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="4" />
                            </FormControl>
                            <FormLabel className="flex gap-2 font-normal">
                              4{' '}
                              <StarIcon className="h-4 w-4 fill-primary text-primary opacity-75" />{' '}
                              {'>'}=
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="3" />
                            </FormControl>
                            <FormLabel className="flex gap-2 font-normal">
                              3{' '}
                              <StarIcon className="h-4 w-4 fill-primary text-primary opacity-75" />{' '}
                              {'>'}=
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="2" />
                            </FormControl>
                            <FormLabel className="flex gap-2 font-normal">
                              2{' '}
                              <StarIcon className="h-4 w-4 fill-primary text-primary opacity-75" />{' '}
                              {'>'}=
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Apply Filters
              </Button>
            </form>
          </Form>
        </div>
        {isFetching || isRefetching ? (
          <SearchLoading />
        ) : isError || !data || !(data && data.hotels.length > 0) ? (
          <SearchNotFound />
        ) : (
          <SearchResults data={data.hotels} />
        )}
      </div>
    </div>
  );
}
