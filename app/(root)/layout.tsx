import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Toaster } from '@/components/ui/sonner';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rezerve',
  description:
    'Rezerve is a leading hotel reservation platform, connecting travelers with the best accommodations worldwide.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="lg:pb-8 lg:pt-4">
            <Header />
          </div>
          {children}
          <div className="border-t border-gray-200 pt-8">
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
