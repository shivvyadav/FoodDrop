import mongoose from 'mongoose';

const url = process.env.MONGODB_URL;
if (!url) {
  throw new Error('missing MONGODB_URL');
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

const connectDB = async () => {
  if (cached.conn) {
    console.log('Using existing database connection');
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(url).then((c) => c.connection);
  }
  try {
    cached.conn = await cached.promise;
    console.log('Creating new database connection');
  } catch (error) {
    throw error;
  }
  return cached.conn;
};

export default connectDB;
