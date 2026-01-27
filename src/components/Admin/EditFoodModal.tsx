'use client';

import { IFood } from '@/models/Food';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Upload, LoaderCircle, X } from 'lucide-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { deleteFoodData, updateFoodData } from '@/redux/slices/foodSlice';
import toast from 'react-hot-toast';

export default function EditFoodModal({
  food,
  onClose,
}: {
  food: IFood;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const [name, setName] = useState(food.name);
  const [category, setCategory] = useState(food.category);
  const [type, setType] = useState(food.type);
  const [price, setPrice] = useState(food.price);
  const [preview, setPreview] = useState<string | null>(food.image);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const disabledButton =
    name === food.name &&
    category === food.category &&
    type === food.type &&
    !imageFile &&
    price === food.price;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleEditFood = async () => {
    const formData = new FormData();

    if (name !== food.name) formData.append('name', name);
    if (category !== food.category) formData.append('category', category);
    if (type !== food.type) formData.append('type', type!);
    if (price !== food.price) formData.append('price', price.toString());
    if (imageFile) formData.append('image', imageFile);

    if ([...formData.keys()].length === 0) return;
    try {
      setEditLoading(true);
      const res = await axios.patch(
        `/api/admin/edit-food/${food._id}`,
        formData,
      );
      if (res.data.success) {
        toast.success('food updated');
        dispatch(updateFoodData(res.data.food));
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error('error updating food');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteFood = async () => {
    try {
      setDeleteLoading(true);
      const res = await axios.delete(`/api/admin/delete-food/${food._id}`);
      if (res.data.success) {
        toast.success('food deleted');
        dispatch(deleteFoodData(food._id!));
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error('error deleting food');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/30 backdrop-blur-sm"
    >
      <div className="relative z-10 my-8 min-h-screen w-full px-4 sm:my-0">
        <div className="flex min-h-screen items-start justify-center sm:items-center">
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-border relative w-full max-w-xl rounded-2xl border bg-white shadow"
          >
            <button
              type="button"
              onClick={onClose}
              className="border-border absolute top-3 right-3 rounded-lg border p-1"
            >
              <X className="size-5" />
            </button>

            <div className="p-6 sm:p-8">
              <div className="mb-6 text-center">
                <h4 className="text-xl font-semibold text-neutral-800">
                  Edit Food Item
                </h4>
                <p className="text-sm text-neutral-700">
                  Update the details below
                </p>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Food name <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-border focus:ring-border w-full rounded-xl border px-4 py-2.5 text-sm focus:ring-2 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="border-border focus:ring-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm focus:ring-2 focus:outline-none"
                    >
                      <option>Select Category</option>
                      {categories.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                      Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="border-border focus:ring-border w-full rounded-xl border bg-white px-4 py-2.5 text-sm focus:ring-2 focus:outline-none"
                    >
                      <option>Select Type</option>
                      {types.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) =>
                      setPrice(Math.floor(Number(e.target.value)))
                    }
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
                      <Upload className="size-4.5 text-neutral-700" />
                      Change image
                    </label>
                  </div>

                  {preview && (
                    <Image
                      src={preview}
                      width={100}
                      height={100}
                      alt="Preview"
                      className="border-border rounded-2xl border object-cover"
                    />
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleEditFood}
                    disabled={disabledButton}
                    className={`border-border mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 py-2.5 ${
                      disabledButton
                        ? 'bg-muted cursor-not-allowed text-neutral-400'
                        : 'bg-primary text-white hover:bg-orange-600'
                    }`}
                  >
                    {editLoading ? (
                      <LoaderCircle className="size-5 animate-spin" />
                    ) : (
                      'Save'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteFood}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-red-300 bg-red-100 py-2.5 hover:bg-red-200`}
                  >
                    {deleteLoading ? (
                      <LoaderCircle className="size-5 animate-spin" />
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
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
