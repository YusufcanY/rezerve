'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SearchError() {
  return (
    <div className="flex min-h-[calc(100dvh-64px)] w-full flex-col items-center justify-center space-y-3 py-10 text-center lg:h-[calc(100dvh-72px)]">
      <div className="relative">
        <h2 className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2/3 text-9xl font-black opacity-10">
          404
        </h2>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Something went wrong</h1>
      </div>
      <p className="text-gray-500">Sorry, we couldn&apos;t find the page you&apos;re looking for</p>

      <Button className="text-sm" asChild variant="outline">
        <Link href="/">Home</Link>
      </Button>
    </div>
  );
}
