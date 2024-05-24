import { Separator } from '@/components/ui/separator';

export default function Register() {
  return (
    <div className="grid h-[100dvh] grid-cols-2">
      <div>
        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c4ea3a121495337.60c75de129050.jpg"
          alt=""
        />
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="w-1/2">
          <h1>Register</h1>
          <Separator />
        </div>
      </div>
    </div>
  );
}
