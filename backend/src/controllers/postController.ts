import { PostModel } from "../models/postModel";
import Express from "express";

export const getAllPosts = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    let query = PostModel.find();
    query = query.select("-__v");
    const posts = await query;

    res.status(200).json({
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

export const createPost = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const newPost = await PostModel.create(req.body);
    res.status(201).json({
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

export const getPost = async (req: Express.Request, res: Express.Response) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id);
    res.status(200).json({
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

export const updatePost = async (
  req: Express.Request,
  res: Express.Response
) => {
  const { id } = req.params;
};

export const deletePost = async (
  req: Express.Request,
  res: Express.Response
) => {
  const { id } = req.params;
};
