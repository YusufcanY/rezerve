import { Hotel } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto flex flex-col items-center gap-8 px-4 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Link className="flex items-center gap-2" href="/">
            <Hotel className="h-6 w-6" />
            <span className="text-lg font-bold tracking-tighter">Rezerve</span>
          </Link>
          <p className="max-w-[300px] text-center text-gray-500 dark:text-gray-400 md:text-left">
            Rezerve is a leading hotel reservation platform, connecting travelers with the best
            accommodations worldwide.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-start">
          <h4 className="text-lg font-semibold">Popular Countries</h4>
          <nav className="flex flex-col items-center gap-2 md:items-start">
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Turkiye
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Greece
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Italy
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Spain
            </Link>
            <Link
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              Japan
            </Link>
          </nav>
        </div>
        <div className="flex flex-col items-center gap-4 md:items-start">
          <h4 className="text-lg font-semibold">Quick Links</h4>
          <nav className="flex flex-col items-center gap-2 md:items-start">
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
      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        © 2024 Rezerve. All rights reserved.
      </div>
    </footer>
  );
}
