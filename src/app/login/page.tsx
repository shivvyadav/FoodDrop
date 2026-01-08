'use client';

import {
  ArrowLeft,
  EyeIcon,
  EyeOff,
  Lock,
  Mail,
  LoaderCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const disabledButton = !email || !password;
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-10"
    >
      <button
        className="border-border absolute top-3 left-3 flex items-center gap-1 rounded-lg border px-2 py-1 text-neutral-600 md:top-8 md:left-8"
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} />
        <span className="font-medium">Back </span>
      </button>
      <h4 className="text-primary font-logo text-4xl tracking-wide">
        Welcome Back
      </h4>
      <p className="font-heading mt-2 mb-8 text-neutral-500">
        Login to FoodDrop
      </p>
      <form action="" className="flex w-full max-w-sm flex-col gap-5">
        <div className="relative">
          <Mail className="absolute top-3 left-3 size-5 text-neutral-400" />
          <input
            type="text"
            placeholder=" email"
            value={email}
            className="border-border focus:ring-border placeholder:text-md w-full rounded-xl border py-2.5 pr-4 pl-10 text-neutral-700 focus:ring-2 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <Lock className="absolute top-3 left-3 size-5 text-neutral-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder=" Password"
            value={password}
            className="border-border focus:ring-border placeholder:text-md w-full rounded-xl border py-2.5 pr-4 pl-10 text-neutral-700 focus:ring-2 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <EyeOff
              className="absolute top-3 right-3 size-5 cursor-pointer text-neutral-400"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <EyeIcon
              className="absolute top-3 right-3 size-5 cursor-pointer text-neutral-400"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          disabled={disabledButton}
          className={`${disabledButton ? 'bg-muted cursor-not-allowed border font-medium text-neutral-400' : 'bg-primary transition-duration-300 border-2 text-white transition-colors hover:bg-orange-600'} border-border mt-4 flex justify-center rounded-xl px-4 py-2.25`}
        >
          {loading ? <LoaderCircle className="size-5 animate-spin" /> : 'login'}
        </motion.button>
      </form>

      <p className="mt-6 flex items-center gap-1 text-neutral-500">
        Don't have an accoutn ?{' '}
        <Link href="/register " className="text-info hover:underline">
          sign up
        </Link>
      </p>
    </motion.div>
  );
}
