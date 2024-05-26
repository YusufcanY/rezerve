'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useUserStore from '@/store/user';
import { useMutation, useQuery } from '@tanstack/react-query';
import AuthService from '@/service/auth';
import { useEffect } from 'react';
import Avvvatars from 'avvvatars-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2, LogOut, User } from 'lucide-react';

export default function HeaderCTA() {
  const { isUserLoggedIn, updateUser, reset, user } = useUserStore();

  const { data, isSuccess, isError, isFetched } = useQuery({
    queryKey: ['user/me'],
    queryFn: AuthService.me,
    enabled: isUserLoggedIn,
  });
  const { mutate: logout, isPending } = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      reset();
    },
  });
  useEffect(() => {
    if (isFetched) {
      if (isSuccess) {
        const { user } = data.data;
        updateUser(user);
      } else if (isError) {
        reset();
      }
    }
  }, [isFetched]);
  return (
    <div className="flex gap-2">
      {isUserLoggedIn ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button size="sm" variant="ghost">
                <Avvvatars value={user.name} />
                <span className="ml-2">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => logout()}
                disabled={isPending}
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4" />
                ) : (
                  <LogOut className="mr-2 h-4 w-4" />
                )}
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline-secondary" asChild>
            <Link href="/add-hotel">Add Your Hotel</Link>
          </Button>
        </>
      ) : (
        <>
          <Button size="sm" asChild variant="ghost-secondary">
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </>
      )}
    </div>
  );
}
