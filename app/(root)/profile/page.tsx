'use client';

import { useCallback, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Box, SquareArrowOutUpRight, User, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import AuthService from '@/service/auth';
import useUserStore from '@/store/user';
import { Skeleton } from '@/components/ui/skeleton';
import moment from 'moment';
import Link from 'next/link';

export default function Profile() {
  const { user } = useUserStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const handleViewDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ['user/reservations'],
    queryFn: AuthService.reservations,
  });
  const getReservationRoom = useCallback((reservation: Reservation) => {
    return reservation.hotel.rooms.find((room) => room._id === reservation.room);
  }, []);
  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-start justify-between space-y-8 lg:flex-row lg:items-center lg:space-y-0">
        <div className="flex items-center space-x-6">
          <Avatar className="h-20 w-20">
            <AvatarFallback>
              <User className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>
      <Separator className="my-12" />
      <div className="space-y-12">
        <div>
          <h2 className="mb-6 text-2xl font-bold">Upcoming Hotel Reservations</h2>
          <div className="space-y-6">
            {isFetching ? (
              <>
                <Skeleton className="h-36 w-full rounded-lg" />
                <Skeleton className="h-36 w-full rounded-lg" />
                <Skeleton className="h-36 w-full rounded-lg" />
              </>
            ) : data?.upcomingReservations?.length === 0 || !isSuccess ? (
              <div className="text-muted-foreground">No upcoming reservations</div>
            ) : (
              data?.upcomingReservations?.map((reservation, index) => (
                <Card key={index}>
                  <CardHeader>
                    <h3 className="text-xl font-semibold">{reservation.hotel.name}</h3>
                  </CardHeader>
                  <CardContent className="grid grid-cols-[1fr_auto] items-center gap-6">
                    <div>
                      <div className="text-muted-foreground">
                        <span>{moment(reservation.dates.from).format('MM/DD/YYYY')}</span>
                        <span> - </span>
                        <span>{moment(reservation.dates.to).format('MM/DD/YYYY')}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {reservation.occupantCount.adult} adults{' '}
                        {reservation.occupantCount.children > 0 &&
                          `and ${reservation.occupantCount.children} children`}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(reservation)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
        <div>
          <h2 className="mb-6 text-2xl font-bold">Past Hotel Reservations</h2>
          <div className="space-y-6">
            {isFetching ? (
              <>
                <Skeleton className="h-36 w-full rounded-lg" />
                <Skeleton className="h-36 w-full rounded-lg" />
                <Skeleton className="h-36 w-full rounded-lg" />
              </>
            ) : data?.pastReservations?.length === 0 || !isSuccess ? (
              <div className="text-muted-foreground">No past reservations</div>
            ) : (
              data?.pastReservations?.map((reservation, index) => (
                <Card key={index}>
                  <CardHeader>
                    <h3 className="text-xl font-semibold">{reservation.hotel.name}</h3>
                  </CardHeader>
                  <CardContent className="grid grid-cols-[1fr_auto] items-center gap-6">
                    <div>
                      <div className="text-muted-foreground">
                        <span>{moment(reservation.dates.from).format('MM/DD/YYYY')}</span>
                        <span> - </span>
                        <span>{moment(reservation.dates.to).format('MM/DD/YYYY')}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {reservation.occupantCount.adult} adults{' '}
                        {reservation.occupantCount.children > 0 &&
                          `and ${reservation.occupantCount.children} children`}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(reservation)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Reservation Details</DialogTitle>
          </DialogHeader>
          {selectedReservation && (
            <div className="grid gap-6 py-6">
              <div className="grid gap-1">
                <Link
                  className="text-xl font-semibold"
                  href={`/hotel/${selectedReservation.hotel._id}`}
                  target="_blank"
                >
                  {selectedReservation.hotel.name}
                  <SquareArrowOutUpRight className="-mt-1 ml-2 inline-block h-5 w-5 text-primary" />
                </Link>
                <div className="text-muted-foreground">
                  <span>{moment(selectedReservation.dates.from).format('MM/DD/YYYY')}</span>
                  <span> - </span>
                  <span>{moment(selectedReservation.dates.to).format('MM/DD/YYYY')}</span>{' '}
                  <span>
                    (
                    {moment(selectedReservation.dates.to).diff(
                      selectedReservation.dates.from,
                      'days',
                    )}{' '}
                    nights)
                  </span>
                </div>
                <div className="mt-2 flex flex-col gap-2 text-muted-foreground">
                  <span className="font-bold">
                    <Box className="mr-2 inline-block h-5 w-5" />
                    Room: {getReservationRoom(selectedReservation)?.name}{' '}
                  </span>
                  <span>
                    <Users className="mr-2 inline-block h-5 w-5" />
                    {selectedReservation.occupantCount.adult} adults{' '}
                    {selectedReservation.occupantCount.children > 0 &&
                      `and ${selectedReservation.occupantCount.children} children`}
                  </span>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground">Room Rate</div>
                  <div className="font-semibold">
                    ${getReservationRoom(selectedReservation)?.price} / night
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="font-semibold">Total</div>
                  <div className="font-semibold">
                    $
                    {(getReservationRoom(selectedReservation)?.price || 0) *
                      moment(selectedReservation.dates.to).diff(
                        selectedReservation.dates.from,
                        'days',
                      )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <div>
              <Button variant="outline" onClick={() => handleCloseModal()}>
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
