import { PostModel } from '../models/postModel';
import { Request, Response } from 'express';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    let query = PostModel.find();
    query = query.select('-__v');
    const posts = await query;

    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const newPost = await PostModel.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        post: newPost,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        post: post,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findByIdAndUpdate(id, req.body);
    if (!post) {
      return res
        .status(404)
        .json({ message: `could not find product with id: ${id}` });
    }
    const updatedPost = await PostModel.findById(id);
    res.status(200).json(updatedPost);
  } catch (error: any) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ message: `Could not delete post: ${id}` });
    }
    res.status(200);
  } catch (error: any) {
    res.status(404).json({ errorMessage: error.message });
  }
};
