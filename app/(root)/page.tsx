import HomePage from '@/components/pages/HomePage';
import HotelService from '@/service/hotel';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['hotel/random'],
    queryFn: HotelService.random,
  });
  await queryClient.prefetchQuery({
    queryKey: ['hotel/popular'],
    queryFn: HotelService.popularHotels,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
