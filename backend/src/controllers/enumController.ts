import { NextFunction, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { CustomRequest } from "../utils/expressInterfaces";
import Enum from "../models/enumsModel";
import AppError from "../utils/appError";

export const getEnums = catchAsync(
  async (req: CustomRequest<null>, res: Response, next: NextFunction) => {
    const enums = await Enum.find();

    if (!enums) {
      return next(new AppError("Could not get enums!", 400));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: enums,
      },
    });
  }
);
