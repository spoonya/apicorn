'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Preloader } from '@/components';
import { supabase } from '@/lib/supabase';
import { Input } from '@heroui/input';
import { Button, Link } from '@heroui/react';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const t = useTranslations('Auth');
  const tSchema = useTranslations('AuthSchema');
  const [isChecking, setIsChecking] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setIsError(true);
    } else {
      setIsError(false);
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
      onSubmit={handleLogin}
      noValidate
      className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-8 w-full max-w-md mx-auto space-y-6"
    >
      <h1 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
        {t('Sign In Auth')}
      </h1>

      <div className="flex flex-col gap-8 ">
        <Input
          label="Email"
          type="email"
          value={email}
          errorMessage={tSchema('email')}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full"
        />
      </div>
      <Button
        type="submit"
        radius="lg"
        color="secondary"
        variant="solid"
        className="w-full px-4 py-2 text-white font-semibold bg-slate-600 hover:bg-slate-700 transition rounded-lg"
      >
        {t('Sign In')}
      </Button>
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        {t('isNotAuth')} <Link href="/sign-up">{t('Sign Up')}</Link>
      </p>
      <div className="text-red-600 !mt-0 h-5 text-center">
        {isError ? tSchema('wrongPassowrdOrEmail') : '⠀'}
      </div>
    </form>
  );
}
