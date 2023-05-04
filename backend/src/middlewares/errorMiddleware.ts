import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

const ErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    // handle known application errors
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Handle all other errors
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong.",
    });
  }
};

export default ErrorHandler;
