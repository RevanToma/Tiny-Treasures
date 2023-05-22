import { NextFunction, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { CustomRequest } from "../utils/expressInterfaces";
import User, { UserDocument } from "../models/userModel";
import { decodeToken, getToken } from "./authController";
import AppError from "../utils/appError";
import Post from "../models/postModel";

// UTILITY MIDDLEWARE

export const attatchUserToReq = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = getToken(req);

    if (!token) return next();

    const decoded = await decodeToken(token);

    if (!decoded) return next();

    const user = await User.findById(decoded.id);

    if (!user) return next();

    req.user = user;

    next();
  }
);

export const getBasicUserData = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const basicUserData: UserDocument | null = await User.findById(
      req.user.id
    ).select("id name email location saved");

    if (!basicUserData) {
      return next(new AppError("No user found", 400));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: basicUserData,
      },
    });
  }
);

export const updateLocation = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const newLocation = req.body;
    console.log(newLocation);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,

      { location: newLocation },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(new AppError("Error updating user location", 400));
    }
    console.log(req.user.id);
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  }
);
export const getLocation = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user.id);

    if (!user) {
      return next(new AppError("No user found", 400));
    }

    res.status(200).json({
      status: "success",
      data: {
        location: user.location,
      },
    });
  }
);
export const getAllUsersPosts = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user.id;

    console.log(userId);

    const userPosts = await Post.find({ user: userId });

    res.status(200).json({
      status: "success",
      TotalPosts: userPosts.length,
      data: {
        userPosts,
      },
    });
  }
);

export const getFavoritePosts = catchAsync(
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const userId = req.user.id;

    const user = await User.findById(userId).populate("favorites");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const favorites = user.favorites;

    res.status(200).json({
      status: "success",
      data: {
        favorites,
      },
    });
  }
);
