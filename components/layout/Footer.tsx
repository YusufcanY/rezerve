import { Hotel } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-12">
        <div className="flex flex-col items-center gap-4 lg:col-span-6 lg:items-start">
          <Link className="flex items-center gap-2" href="/">
            <Hotel className="h-6 w-6" />
            <span className="text-lg font-bold tracking-tighter">Rezerve</span>
          </Link>
          <p className="max-w-[300px] text-center text-gray-500 dark:text-gray-400 lg:text-left">
            Rezerve is a leading hotel reservation platform, connecting travelers with the best
            accommodations worldwide.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 lg:col-span-3 lg:items-start">
          <h4 className="text-lg font-semibold">Popular Cities</h4>
          <nav className="flex flex-col items-center gap-2 lg:items-start">
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Istanbul
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Rome
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Paris
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Athens
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Berlin
            </Link>
          </nav>
        </div>
        <div className="flex flex-col items-center gap-4 lg:col-span-3 lg:items-start">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <nav className="flex flex-col items-center gap-2 lg:items-start">
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              About
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Reservations
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
      <div className="mt-12 border-t border-gray-200 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        © 2024 Rezerve. All rights reserved.
      </div>
    </footer>
  );
}