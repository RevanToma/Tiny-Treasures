import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE!);
    console.log('connected to mongoDB');
  } catch (error: any) {
    console.log(error);
  }
};
