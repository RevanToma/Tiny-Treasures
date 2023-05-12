import { Request, Response, NextFunction, RequestHandler } from "express";
import AppError from "./appError";

// export const catchAsync = (fn: Function): RequestHandler => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     fn(req, res, next).catch(next);
//   };
// };
const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

export const catchAsync = (fn: Function): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: any) => {
      if (err.code === 11000) {
        err = handleDuplicateFieldsDB(err);
        return res.status(400).json({
          status: "error",
          message: err.message,
        });
      } else {
        // Other error
        return res.status(500).json({
          status: "error",
          message: "Something went wrong.",
        });
      }
    });
  };
};
