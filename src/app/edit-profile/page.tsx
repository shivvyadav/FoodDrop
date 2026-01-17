'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { LoaderCircle, ArrowLeft, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import axios from 'axios';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: 'easeOut' as const,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

export default function ManageAccount() {
  const user = useSelector((state: RootState) => state.user.userData);

  const [username, setUsername] = useState('');
  const [contact, setContact] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!user) return;

    setUsername(user.username || '');
    setContact(user.contact?.toString() || '');
    setPreview(user.image || null);
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (newPassword && newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const formData = new FormData();

    if (username !== user?.username) formData.append('username', username);
    if (contact !== user?.contact?.toString())
      formData.append('contact', contact);

    if (image) formData.append('image', image);

    if (oldPassword && newPassword) {
      formData.append('oldPassword', oldPassword);
      formData.append('newPassword', newPassword);
    }

    if ([...formData.keys()].length === 0) return;

    try {
      setLoading(true);
      await axios.patch('/api/update-profile', formData);
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-neutral-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-3xl px-4 pb-12"
      >
        {/* Header */}
        <div className="border-border sticky top-0 z-40 mb-6 border-b bg-neutral-50/80 py-5 backdrop-blur">
          <div className="flex items-center gap-6">
            <Link
              href="/home"
              className="flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-800"
            >
              <ArrowLeft size={16} />
              Back
            </Link>
            <h1 className="text-lg font-semibold">Edit Profile</h1>
          </div>
        </div>

        {/* Card */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl bg-white shadow-sm"
        >
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3 p-6">
            <div className="relative size-28 overflow-hidden rounded-full bg-neutral-200">
              {preview ? (
                <Image
                  src={preview}
                  alt="profile"
                  fill
                  sizes="100%"
                  loading="eager"
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full items-center justify-center text-3xl font-semibold text-neutral-700">
                  {user.username?.charAt(0).toUpperCase() || '?'}
                </span>
              )}

              {/* Camera */}
              <label className="absolute right-1 bottom-1 flex size-9 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <p className="text-xs text-neutral-500">
              JPG or PNG • Min 800×800 px
            </p>
          </div>

          {/* Personal Info */}
          <div className="border-border border-t p-6">
            <h3 className="mb-4 font-medium">Personal Info</h3>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="flex flex-col">
                <label className="text-xs text-neutral-600">Full Name</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-border focus:border-border focus:ring-border rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-neutral-600">Email</label>
                <input
                  value={user.email}
                  disabled
                  className="border-border cursor-not-allowed rounded-lg border bg-neutral-100 px-3 py-2 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs text-neutral-600">Phone</label>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="border-border focus:border-border focus:ring-border rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="border-border border-t p-6">
            <h3 className="mb-4 font-medium">Change Password</h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <input
                type="password"
                placeholder="Current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="border-border focus:border-border focus:ring-border rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-border focus:border-border focus:ring-border rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-border focus:border-border focus:ring-border rounded-lg border px-3 py-2 text-sm focus:ring-1 focus:outline-none"
              />
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={handleSave}
                disabled={loading}
                className="rounded-lg bg-black px-6 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-50"
              >
                {loading ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  'Save changes'
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
