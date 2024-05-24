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
import PasswordStrength from '@/components/PasswordStrength';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

const RegisterSchema = z.object({
  name: z
    .string({
      required_error: 'Please type name.',
    })
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(32, {
      message: 'Name must not be longer than 32 characters.',
    }),
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

type RegisterFormValues = z.infer<typeof RegisterSchema>;
export default function RegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    values: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((d) => console.log('d :>> ', d))}
        className="w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoFocus autoComplete="name" placeholder="Yusufcan Yilmaz" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
              <AnimatePresence>
                {field.value && (
                  <motion.div
                    initial={{
                      maxHeight: 0,
                      translateY: -10,
                      opacity: 0,
                    }}
                    animate={{
                      maxHeight: 100,
                      translateY: 0,
                      opacity: 1,
                    }}
                    exit={{
                      maxHeight: 0,
                      translateY: -10,
                      opacity: 0,
                    }}
                    className="pt-2"
                  >
                    <PasswordStrength password={field.value} />
                  </motion.div>
                )}
              </AnimatePresence>
            </FormItem>
          )}
        />
        <div className="flex justify-between space-x-2">
          <Button type="button" asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button type="submit">
            {false && <Loader2 className="mr-2 animate-spin" />}
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
}
