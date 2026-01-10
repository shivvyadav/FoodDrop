import mongoose from 'mongoose';

interface IFood {
  name: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const foodSchema = new mongoose.Schema<IFood>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    category: {
      type: String,
      enum: [
        'Pizza',
        'Burgers',
        'Momos',
        'Chowmein',
        'Chatpate',
        'Pani Puri',
        'Biryani',
        'Beverages',
        'Desserts',
        'Bakery',
        'Ice Cream',
        'Drinks',
      ],
      required: [true, 'Category is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
  },
  {
    timestamps: true,
  },
);

const Food = mongoose.models.Food || mongoose.model<IFood>('Food', foodSchema);
export default Food;
