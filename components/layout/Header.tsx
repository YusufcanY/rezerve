import { Hotel } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="container mx-auto">
      <div className="flex rounded-lg bg-white p-4 shadow-lg">
        <Link className="flex items-center gap-2" href="/">
          <Hotel className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tighter">Rezerve</span>
        </Link>
      </div>
    </header>
  );
}
