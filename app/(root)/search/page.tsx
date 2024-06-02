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
  /* const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [
      'hotel/search',
      {
        param: searchParams.param,
        from: moment(Number(searchParams.from)).toDate(),
        to: moment(Number(searchParams.to)).toDate(),
        adults: Number(searchParams.adults),
        children: Number(searchParams.children),
      },
    ],
    queryFn: () => {
      console.log('searchParams.param :>> ', searchParams.param);
      return HotelService.search({
        query: typeof searchParams.param === 'string' ? searchParams.param : '',
        dates: {
          from: moment(Number(searchParams.from)).format('YYYY-MM-DD'),
          to: moment(Number(searchParams.to)).format('YYYY-MM-DD'),
        },
        guestCount: Number(searchParams.adults),
        amenities: [],
        rating: 5,
      });
    },
    retry: false,
  }); */
  {
    /* <HydrationBoundary state={dehydrate(queryClient)}> 
  </HydrationBoundary> */
  }
  return (
    <Suspense>
      {/* @ts-ignore */}
      <SearchPage params={searchParams} />
    </Suspense>
  );
}
