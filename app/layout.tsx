import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

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
        <div className="pb-8 pt-4">
          <Header />
        </div>
        {children}
        <div className="pt-4">
          <Footer />
        </div>
      </body>
    </html>
  );
}
