// import * as fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { posts } from './postData';
import Post from '../models/postModel';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE!;

mongoose.connect(DB).then(() => console.log('DB connection succesful'));

function sortById(arr: { title: number }[]): { title: number }[] {
  return arr.sort((a, b) => a.title - b.title);
}

const importData = async () => {
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

//  node src\dev\import-dev-data.js --import
//  node src\dev\import-dev-data.js --delete
//  node src\dev\import-dev-data.js --deleteJS

// const src = path.join(__dirname, '../', '../', 'src');
// const controllers = path.join(__dirname, '../', '../', 'src', 'controllers');
// const db = path.join(__dirname, '../', '../', 'src/db');
// const dev = path.join(__dirname, '../', '../', 'src/dev');
// const models = path.join(__dirname, '../', '../', 'src/models');
// const routes = path.join(__dirname, '../', '../', 'src/routes');
// const utils = path.join(__dirname, '../', '../', 'src/utils');

// const dirs = [src, controllers, db, dev, models, routes, utils];

// const deleteJS = dirs.forEach(dir => {
//   fs.readdir(dir, (err, files) => {
//     if (err) throw err;

//     for (const file of files) {
//       if (file.endsWith('.js')) {
//         fs.unlink(path.join(dir, file), err => {
//           if (err) throw err;
//           console.log(`${file} was deleted`);
//         });
//       }
//     }
//   });
// });
