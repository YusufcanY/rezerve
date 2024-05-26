import HotelDetailPage from '@/components/pages/HotelDetailPage';
import HotelService from '@/service/hotel';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function Hotel({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['hotel/detail', params.id],
    queryFn: () => HotelService.hotel(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HotelDetailPage id={params.id} />
    </HydrationBoundary>
  );
}
