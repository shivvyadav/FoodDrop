'use client';
import Image from 'next/image';
import { useState } from 'react';
import { LoaderCircle, Upload } from 'lucide-react';
import { motion } from 'motion/react';
import axios from 'axios';
export default function AddFoods() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const disabledButton = !name || !category || !type || !price || !image;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('type', type);
      formData.append('price', price.toString());
      formData.append('image', image);

      const res = await axios.post('/api/admin/add-food', formData);

      if (res.data.success) {
        setName('');
        setCategory('');
        setType('');
        setPrice(0);
        setImage(null);
        setPreview(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-24 flex items-center justify-center px-4 lg:my-0 lg:pt-30">
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full max-w-xl rounded-2xl border border-neutral-200 shadow"
      >
        <div className="p-6 sm:p-8">
          <div className="mb-6 text-center">
            <h4 className="text-xl font-semibold text-neutral-800">
              Add Food Item
            </h4>
            <p className="text-sm text-neutral-700">
              Fill out the details below to add a new food item
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmitForm}>
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Food name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="eg: Pizza"
                className="border-border focus:ring-border w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="category"
                  className="mb-1 block text-sm font-medium text-neutral-700"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border-border focus:ring-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-neutral-800 focus:ring-2 focus:outline-none"
                >
                  <option>Select Category</option>
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="mb-1 block text-sm font-medium text-neutral-700"
                >
                  Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="border-border focus:ring-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-neutral-800 focus:ring-2 focus:outline-none"
                >
                  <option>Select Type</option>
                  {types.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="price"
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Price <span className="text-red-500">*</span>
              </label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Math.floor(Number(e.target.value)))}
                placeholder="eg: 120"
                className="border-border focus:ring-border w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 md:flex-row">
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Image
                </label>
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed px-4 py-3 text-sm">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <span className="flex gap-2">
                    <Upload className="size-4.5 text-neutral-700" /> Upload
                    image
                  </span>
                </label>
              </div>

              {preview && (
                <Image
                  src={preview}
                  width={100}
                  height={100}
                  alt="Preview"
                  className="border-border mt-2 rounded-2xl border object-cover"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={disabledButton}
              className={`border-border ${disabledButton ? 'bg-muted cursor-not-allowed text-neutral-400' : 'bg-primary text-white hover:bg-orange-600'} mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 py-2.5`}
            >
              {loading ? (
                <LoaderCircle className="size-5 animate-spin" />
              ) : (
                'Add Food'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

const categories = [
  'Pizza',
  'Burgers',
  'Momo',
  'Chowmein',
  'Chatpate',
  'Pani Puri',
  'Biryani',
  'Beverages',
  'Desserts',
  'Bakery',
  'Ice Cream',
  'Drinks',
];

const types = ['Veg', 'Non-Veg'];
