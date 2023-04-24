import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE!);
    console.log("connected to mongoDB");
  } catch (error: any) {
    console.log(error);
  }
};
