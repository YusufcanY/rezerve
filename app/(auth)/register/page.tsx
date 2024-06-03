import RegisterForm from '@/components/form/RegisterForm';
import { Separator } from '@/components/ui/separator';
import { Hotel, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Register() {
  return (
    <div className="grid h-[100dvh] grid-cols-2">
      <div>
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c4ea3a121495337.60c75de129050.jpg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="relative">
        <div className="flex h-full items-center justify-center">
          <div className="w-1/2 space-y-2">
            <h1 className="text-center text-2xl font-bold">Register</h1>
            <Separator />
            <Suspense fallback={<Loader2 className="h-16 w-16" />}>
              <RegisterForm />
            </Suspense>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <Link className="flex items-center gap-2" href="/">
            <Hotel className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tighter">Rezerve</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
