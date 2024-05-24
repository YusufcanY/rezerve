'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useUserStore from '@/store/user';

export default function HeaderCTA() {
  const { isUserLoggedIn } = useUserStore();
  return (
    <div className="flex gap-2">
      {isUserLoggedIn && (
        <Button size="sm" variant="outline-secondary" asChild>
          <Link href="/add-hotel">Add Your Hotel</Link>
        </Button>
      )}
      <Button size="sm" asChild variant="ghost-secondary">
        <Link href="/login">Login</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/register">Register</Link>
      </Button>
    </div>
  );
}
