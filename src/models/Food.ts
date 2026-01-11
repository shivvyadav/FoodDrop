import mongoose from 'mongoose';

export interface IFood {
  _id?: mongoose.Types.ObjectId;
  name: string;
  image: string;
  price: number;
  category: string;
  type?: string;
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
      ],
      required: [true, 'Category is required'],
    },
    type: {
      type: String,
      enum: ['Veg', 'Non-Veg'],
      required: [true, 'Type is required'],
    },
  },
  {
    timestamps: true,
  },
);

const Food = mongoose.models.Food || mongoose.model<IFood>('Food', foodSchema);
export default Food;
