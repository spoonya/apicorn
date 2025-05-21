'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Preloader } from '@/components';
import { supabase } from '@/lib/supabase';
import { Input } from '@heroui/input';
import { Button, Link } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';

export function SignUpForm() {
  const t = useTranslations('Auth');
  const tSchema = useTranslations('AuthSchema');
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  const schema = z
    .object({
      name: z
        .string()
        .min(2, tSchema('name'))
        .regex(/^[A-Za-zА-Яа-яЁё\s]+$/, tSchema('onlyLetters'))
        .transform((val) =>
          val
            .trim()
            .split(' ')
            .map(
              (part) =>
                part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
            )
            .join(' ')
        ),
      email: z.string().email(tSchema('email')),
      password: z
        .string()
        .min(8, tSchema('password'))
        .regex(/[a-zA-Z]/, tSchema('password1'))
        .regex(/\d/, tSchema('password2'))
        .regex(/[^a-zA-Z0-9]/, tSchema('password3')),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: tSchema('confirmPassword'),
      path: ['confirmPassword'],
    });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
        },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        router.replace('/');
      } else {
        setIsChecking(false);
      }
    };
    checkUser();
  }, [router]);

  if (isChecking) {
    return <Preloader />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-8 w-full max-w-md mx-auto space-y-6"
    >
      <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
        {t('Sign Up Auth')}
      </h1>

      <div className="flex flex-col gap-3">
        <div className="space-y-1">
          <Input
            label="Name"
            type="text"
            {...register('name')}
            className="w-full"
          />
          <p
            className={`text-sm min-h-[20px] ${
              errors.name ? 'text-red-500 visible' : 'invisible'
            }`}
          >
            {errors.name?.message ?? 'placeholder'}
          </p>
        </div>

        <div className="space-y-2 ">
          <Input
            label="Email"
            type="email"
            {...register('email')}
            className="w-full"
          />
          <p
            className={`text-sm min-h-[20px] ${
              errors.email ? 'text-red-500 visible' : 'invisible'
            }`}
          >
            {errors.email?.message ?? 'placeholder'}
          </p>
        </div>

        <div className="space-y-1">
          <Input
            label="Password"
            type="password"
            {...register('password')}
            className="w-full"
          />
          <p
            className={`text-sm min-h-[20px] ${
              errors.password ? 'text-red-500 visible' : 'invisible'
            }`}
          >
            {errors.password?.message ?? 'placeholder'}
          </p>
        </div>

        <div className="space-y-1">
          <Input
            label="Confirm Password"
            type="password"
            {...register('confirmPassword')}
            className="w-full"
          />
          <p
            className={`text-sm min-h-[20px] ${
              errors.confirmPassword ? 'text-red-500 visible' : 'invisible'
            }`}
          >
            {errors.confirmPassword?.message ?? 'placeholder'}
          </p>
        </div>
      </div>

      <Button
        type="submit"
        radius="lg"
        color="secondary"
        className="w-full px-4 py-2 text-white font-semibold bg-slate-600 hover:bg-slate-700 transition rounded-lg"
      >
        {t('Sign Up')}
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {t('isAuth')}{' '}
        <Link
          href="/sign-in"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {t('Sign In')}
        </Link>
      </p>
    </form>
  );
}
