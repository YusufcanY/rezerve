import LoginForm from '@/components/form/LoginForm';
import { Separator } from '@/components/ui/separator';
import { Hotel } from 'lucide-react';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="grid h-[100dvh] grid-cols-2">
      <div className="relative">
        <div className="flex h-full items-center justify-center">
          <div className="w-1/2 space-y-2">
            <h1 className="text-center text-2xl font-bold">Login</h1>
            <Separator />
            <LoginForm />
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <Link className="flex items-center gap-2" href="/">
            <Hotel className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold tracking-tighter">Rezerve</span>
          </Link>
        </div>
      </div>
      <div>
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/63365a121495337.60c75de17e1c0.jpg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
    </div>
  );
}
