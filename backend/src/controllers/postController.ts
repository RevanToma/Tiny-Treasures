import { NextFunction, Response } from 'express';
import Post, {
  IPostDocument,
  IPostDocumentWithEnums,
} from '../models/postModel';
import { catchAsync } from '../utils/catchAsync';
import { PostFeatures } from '../utils/apiFeatures';
import { CustomRequest } from '../utils/expressInterfaces';
import AppError from '../utils/appError';
import {
  ILocationData,
  INumberObject,
  IPostReqBody,
  IStringObject,
} from '../utils/interfaces';
import mongoose, { PipelineStage } from 'mongoose';
import multer from 'multer';
import sharp from 'sharp';
import '../models/enumsModel';
import User from '../models/userModel';

// multer adds a body to the request object with the values of the form field.  If not using default FF, must create new form and all values on client side.
// req.file will hold the file, req.body will hold the text fields

//fieldname
// originalname
// encoding
// mimetype
// size
// destination	The folder to which the file has been saved	DiskStorage
// filename	The name of the file within the destination	DiskStorage
// path	The full path to the uploaded file	DiskStorage
// buffer	A Buffer of the entire file	MemoryStorage

// where to store files.  Since we want to resize them, we save to buffer
const storage = multer.memoryStorage();
// determins which files to save
const fileFilter = (
  req: CustomRequest<IPostReqBody>,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// can use a limit option to limit the data
const limits: INumberObject = {
  fileSize: 4000000,
  files: 5,
  fields: 15,
  parts: 15,
  headerPairs: 100,
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

export const uploadPhotos = upload.array('photos', 4);

export const resizePhoto = catchAsync(
  async (
    req: CustomRequest<IPostReqBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!req.files) return next();

    // set filename for next middleware if only in buffer
    req.filenames = [];
    req.files.forEach(async (file, i) => {
      const filename = `user-${req.user.id}-${Date.now() + i}.jpeg`;
      req.filenames.push(filename);

      await sharp(file.buffer)
        .resize({ width: 1000 })
        .toFormat('jpeg')
        .jpeg({ quality: 80 })
        .toFile(`public/photos/posts/${filename}`);
    });

    next();
  }
);

export const getAllPosts = catchAsync(
  async (
    req: CustomRequest<null>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const query: IStringObject = req.query;

    const pipeline = new PostFeatures(query, req.user?.location)
      .distanceFrom()
      .filter()
      .search()
      .sort()
      .limitFields()
      .countAndPaginate();

    const posts: IPostDocument[] = await Post.aggregate(pipeline.stages);

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        data: posts,
      },
    });
  }
);

export const getPost = catchAsync(
  async (
    req: CustomRequest<null>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { postId } = req.params;

    const location: ILocationData | null = req.user.location;

    const query = { _id: postId };

    const pipeline = new PostFeatures(query, location).distanceFrom().filter();

    const post = await Post.aggregate(pipeline.stages);

    if (!post) {
      return next(new AppError('No post found!', 400));
    }

    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  }
);

const setImgUrls = (imgUrls: undefined | string | string[]): string[] => {
  if (!imgUrls) {
    return [];
  } else if (typeof imgUrls === 'string') {
    return [imgUrls];
  } else {
    return [...imgUrls];
  }
};

export const createPost = catchAsync(
  async (
    req: CustomRequest<IPostReqBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const newImages = req.filenames
      ? [...req.filenames].map(
          fileName => `${process.env.BASE_URL}/photos/posts/${fileName}`
        )
      : [];

    const imgUrls = setImgUrls(req.body.imgUrls);

    const images =
      req.body.frontImageArray === 'imgUrls'
        ? [...imgUrls, ...newImages]
        : [...newImages, ...imgUrls];

    const itemCount = req.body.itemCount && parseInt(req.body.itemCount);

    const { title, description, sizes, group, typeOfItems, condition, id } =
      req.body;

    const postData = {
      title,
      description,
      itemCount,
      sizes,
      group,
      typeOfItems,
      condition,
      images,
      user: req.user.id,
      userName: req.user.name,
    };

    let post;
    if (id) {
      console.log(333333333);
      post = await Post.findByIdAndUpdate(id, postData).populate('enums');
    } else {
      console.log(4444444444);
      post = await Post.create(postData);
    }
    console.log(5555555);

    if (!post) {
      return next(new AppError('Unable to save post!', 400));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: post,
      },
    });
  }
);

export const deletePost = catchAsync(
  async (req: CustomRequest<null>, res: Response, Next: NextFunction) => {
    const id = req.params.postId;

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return new AppError('There was a problem deleting your post!', 400);
    }

    res.status(204).json({
      status: 'success',
    });
  }
);
