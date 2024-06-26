'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/user';
import { useMutation } from '@tanstack/react-query';
import AuthService from '@/service/auth';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

const LoginSchema = z.object({
  email: z
    .string({
      required_error: 'Please type email.',
    })
    .email({
      message: 'Please type valid email.',
    }),
  password: z
    .string({
      required_error: 'Please type password.',
    })
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .max(32, {
      message: 'Password must not be longer than 32 characters.',
    }),
});

type LoginFormValues = z.infer<typeof LoginSchema>;
export default function LoginForm() {
  const router = useRouter();

  const { updateUser, updateToken } = useUserStore();
  const { mutate, isPending } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      updateUser(data.user);
      updateToken(data.token);
      router.push('/');
    },
    onError: (error: AxiosError<LoginError>) => {
      if (error.response?.status === 400) {
        toast.error('Invalid email or password');
      }
    },
  });
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    values: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((d) => mutate(d))} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input autoComplete="email" placeholder="roman@mail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  autoComplete="new-password"
                  type="password"
                  className="relative z-10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between space-x-2">
          <Button type="button" asChild variant="ghost">
            <Link href="/register">Register</Link>
          </Button>
          <Button type="submit">
            {isPending && <Loader2 className="mr-2 animate-spin" />}
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
