import { Hotel } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <header className="container mx-auto">
      <div className="flex items-center justify-between bg-white py-4 lg:rounded-lg lg:p-4 lg:shadow-lg">
        <Link className="flex items-center gap-2" href="/">
          <Hotel className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tighter">Rezerve</span>
        </Link>
        <Button size="sm" variant="outline-secondary" asChild>
          <Link href="/add-hotel">Add Your Hotel</Link>
        </Button>
      </div>
    </header>
  );
}
