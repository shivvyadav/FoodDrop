'use client';

import {
  ArrowLeft,
  EyeIcon,
  EyeOff,
  Lock,
  Mail,
  User,
  ChevronDown,
  LoaderCircle,
  Phone,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(false);
  const disabledButton = !username || !email || !password || !contact;
  const router = useRouter();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/register', {
        username,
        email,
        password,
        role,
        contact,
      });
      setUsername('');
      setEmail('');
      setPassword('');

      if (res.data.success) {
        router.push('/login');
      }
    } catch (error) {
      console.log(error);
      router.push('/register');
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
      {/* back button */}
      <button
        className="border-border absolute top-3 left-3 flex items-center gap-1 rounded-lg border px-2 py-1 text-neutral-600 md:top-8 md:left-8"
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} />
        <span className="font-medium">Back </span>
      </button>
      <h4 className="text-primary font-logo text-4xl">Create an Account</h4>
      <p className="font-heading mt-2 mb-8 w-3/4 text-center text-sm text-neutral-500">
        Join FoodDrop, start ordering and delivering food
      </p>
      <form action="" className="flex w-full max-w-sm flex-col gap-5">
        <div className="relative">
          <User className="absolute top-3 left-3 size-4.5 text-neutral-400" />
          <input
            type="text"
            placeholder="username"
            value={username}
            className="border-border focus:ring-border placeholder:text-md w-full rounded-xl border py-2 pr-4 pl-10 text-neutral-700 transition focus:ring-2 focus:outline-none"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="relative">
          <Mail className="absolute top-3 left-3 size-4.5 text-neutral-400" />
          <input
            type="text"
            placeholder=" email"
            value={email}
            className="border-border focus:ring-border placeholder:text-md w-full rounded-xl border py-2 pr-4 pl-10 text-neutral-700 transition focus:ring-2 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <Lock className="absolute top-3 left-3 size-4.5 text-neutral-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder=" Password"
            value={password}
            className="border-border focus:ring-border placeholder:text-md w-full rounded-xl border py-2 pr-4 pl-10 text-neutral-700 transition focus:ring-2 focus:outline-none"
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

        <div className="relative">
          <Phone className="absolute top-3 left-3 size-4.5 text-neutral-400" />
          <input
            type="tel"
            placeholder="contact"
            value={contact}
            className="border-border focus:ring-border placeholder:text-md w-full rounded-xl border py-2 pr-4 pl-10 text-neutral-700 transition focus:ring-2 focus:outline-none"
            onChange={(e) => setContact(e.target.value)}
          />
        </div>

        <RoleDropdown role={role} setRole={setRole} />

        {/* register button */}
        <button
          onClick={handleRegister}
          disabled={disabledButton}
          className={`${disabledButton ? 'bg-muted cursor-not-allowed border font-medium text-neutral-400' : 'bg-primary transition-duration-300 border-2 text-white transition-colors hover:bg-orange-600'} border-border mt-4 flex justify-center rounded-xl px-4 py-2`}
        >
          {loading ? (
            <LoaderCircle className="size-5 animate-spin" />
          ) : (
            'register'
          )}
        </button>
      </form>
      {/* already have an account section */}
      <p className="mt-6 flex items-center gap-1 text-neutral-500">
        Already have an account ?{' '}
        <Link href="/login " className="text-info hover:underline">
          sign in
        </Link>
      </p>
    </motion.div>
  );
}

export function RoleDropdown({
  role,
  setRole,
}: {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const options = ['user', 'delivery'];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="border-border text-neutral-700transition focus:ring-border flex w-full items-center justify-between rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:outline-none"
      >
        {role}
        <span className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <ChevronDown size={18} className="text-neutral-700" />
        </span>
      </button>

      {open && (
        <ul className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setRole(option);
                setOpen(false);
              }}
              className={`cursor-pointer px-4 py-2.5 text-sm transition ${
                role === option
                  ? 'bg-neutral-100 font-medium text-neutral-900'
                  : 'text-neutral-700 hover:bg-neutral-100'
              } `}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
