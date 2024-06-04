import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CalendarIcon, HandHelpingIcon, LockIcon } from 'lucide-react';

export default function Component() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <section className="relative flex h-[70vh] w-full items-center justify-center bg-gradient-to-t from-primary to-primary/50 md:h-[80vh] lg:h-[90vh]">
        <div className="container z-20 px-4 text-center md:px-6 ">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Discover the Perfect Stay
          </h1>
          <p className="mb-8 text-lg text-white/75 sm:text-xl md:text-2xl">
            Book your dream vacation with our hotel reservation platform.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
            >
              Explore Hotels
            </Link>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid gap-4">
              <CalendarIcon className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Easy Booking</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our intuitive booking process makes it simple to find and reserve the perfect
                accommodation for your needs.
              </p>
            </div>
            <div className="grid gap-4">
              <LockIcon className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Secure Payments</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Rest assured that your financial information is protected with our state-of-the-art
                security measures.
              </p>
            </div>
            <div className="grid gap-4">
              <HandHelpingIcon className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Customer Support</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our dedicated team is available 24/7 to assist you with any questions or concerns
                you may have.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12 dark:bg-gray-800 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
              About Our Hotel Reservation Platform
            </h2>
            <p className="mb-8 text-gray-500 dark:text-gray-400">
              Our hotel reservation platform was founded with the goal of making it easier for
              travelers to find and book the perfect accommodation for their needs. We believe that
              everyone deserves a stress-free and enjoyable travel experience, which is why
              we&apos;ve built a platform that prioritizes convenience, security, and exceptional
              customer service.
            </p>
            <Link
              href="#story"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid gap-4">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src="https://randomuser.me/api/portraits/men/78.jpg" alt="human" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-bold">John Doe</p>
                <p className="text-gray-500 dark:text-gray-400">Satisfied Customer</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                &quot;I&apos;ve used this platform multiple times and have always had a\n great
                experience. The booking process is seamless, and the\n customer support team is
                incredibly helpful.&quot;
              </p>
            </div>
            <div className="grid gap-4">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src="https://randomuser.me/api/portraits/women/71.jpg" alt="human" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-bold">Jane Smith</p>
                <p className="text-gray-500 dark:text-gray-400">Satisfied Customer</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                &quot;I was hesitant to book online at first, but this platform\n made the process
                so easy and secure. I&apos;ll definitely be using\n it again for my future travel
                plans.&quot;
              </p>
            </div>
            <div className="grid gap-4">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src="https://randomuser.me/api/portraits/men/83.jpg" alt="human" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-bold">Michael Johnson</p>
                <p className="text-gray-500 dark:text-gray-400">Satisfied Customer</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                &quot;The customer support team was incredibly helpful in\n addressing my concerns
                and ensuring I had a great stay. I\n highly recommend this platform to anyone
                looking to book\n accommodations.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="story" className="bg-gray-100 py-12 dark:bg-gray-800 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex justify-center">
            <div className="flex max-w-3xl flex-col items-center">
              <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl md:text-5xl">
                Our Story
              </h2>
              <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
                Our hotel reservation platform was founded in 2015 by a team of passionate travelers
                who saw the need for a more user-friendly and reliable way to book accommodations.
                Since then, we&apos;ve grown to become one of the leading platforms in the industry,
                serving millions of customers around the world.
              </p>
              <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
                Our mission is to provide a seamless and enjoyable travel experience for everyone
                who uses our platform. We&apos;re committed to continuously improving our services,
                expanding our offerings, and delivering exceptional customer support.
              </p>
              <Link
                href="#team"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Meet the Team
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="team" className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl md:text-5xl">
            Meet Our Team
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid gap-4">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src="https://randomuser.me/api/portraits/men/22.jpg" alt="human" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-bold">John Doe</p>
                <p className="text-gray-500 dark:text-gray-400">Co-Founder, CEO</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                John is the visionary behind our hotel reservation platform. With over 15 years of
                experience in the travel industry, he is dedicated to providing our customers with
                the best possible experience.
              </p>
            </div>
            <div className="grid gap-4">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src="https://randomuser.me/api/portraits/women/83.jpg" alt="human" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-bold">Jane Smith</p>
                <p className="text-gray-500 dark:text-gray-400">Co-Founder, COO</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Jane is the operational mastermind behind our platform. She ensures that every
                aspect of our business runs smoothly, from customer support to technology
                integration.
              </p>
            </div>
            <div className="grid gap-4">
              <Avatar className="h-16 w-16 border">
                <AvatarImage src="https://randomuser.me/api/portraits/men/44.jpg" alt="human" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-lg font-bold">Michael Johnson</p>
                <p className="text-gray-500 dark:text-gray-400">Head of Engineering</p>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Michael leads our talented engineering team, ensuring that our platform is always
                up-to-date, secure, and user-friendly. His expertise in technology and innovation is
                invaluable to our success.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
