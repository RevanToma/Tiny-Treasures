// import * as fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { posts } from './postData';
import Post from '../models/postModel';

dotenv.config({ path: './config.env' });

const DB = process.env.DB!.replace('<password>', process.env.DB_PASSWORD!);
mongoose.connect(DB).then(() => console.log('DB connection succesful'));

function sortById(arr: { title: number }[]): { title: number }[] {
  return arr.sort((a, b) => a.title - b.title);
}

const importData = async () => {
  sortById(posts);
  try {
    await Post.create(posts);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log('💥💥');
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Post.deleteMany();
    console.log('Data successfully deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

//  node build\dev\import-dev-data.js --import
