import SearchPage from '@/components/pages/SearchPage';
import { Suspense } from 'react';
import HotelService from '@/service/hotel';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import SearchError from './error';
import moment from 'moment';

export default async function Search({
  params,
  searchParams,
}: {
  params: undefined;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (
    searchParams &&
    !searchParams.param &&
    !searchParams.from &&
    !searchParams.to &&
    !searchParams.adults &&
    !searchParams.children
  )
    return <SearchError />;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [
      'hotel/search',
      {
        param: searchParams.param,
        from: searchParams.from,
        to: searchParams.to,
        adults: searchParams.adults,
        children: searchParams.children,
      },
    ],
    queryFn: () => {
      return HotelService.search({
        query: typeof searchParams.param === 'string' ? searchParams.param : '',
        dates: {
          from: moment(searchParams.from).format('YYYY-MM-DD'),
          to: moment(searchParams.to).format('YYYY-MM-DD'),
        },
        guestCount: Number(searchParams.adults),
        amenities: ['sa'],
        rating: 5,
      });
    },
    retry: false,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense>
        {/* @ts-ignore */}
        <SearchPage params={searchParams} />
      </Suspense>
    </HydrationBoundary>
  );
}
