// import { Post } from "../models/Post";
import { Request, Response } from "express";
import Post from "../models/postModel";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    let query = Post.find();
    query = query.select("-__v");
    const posts = await query;

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        post: post,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body);
    if (!post) {
      return res
        .status(404)
        .json({ message: `could not find product with id: ${id}` });
    }
    const updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (error: any) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ message: `Could not delete post: ${id}` });
    }
    res.status(200);
  } catch (error: any) {
    res.status(404).json({ errorMessage: error.message });
  }
};
