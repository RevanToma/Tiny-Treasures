import { NextFunction, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { CustomRequest } from "../utils/expressInterfaces";
import axios from "axios";
import AppError from "../utils/appError";
import { handleAxiosError } from "../utils/axiosErrorHandler";

export const getCityFromCoords = catchAsync(
  async (
    req: CustomRequest<null>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const lat = req.params.lat;
    const lng = req.params.lng;

    const key = process.env.GEOCODE_API_KEY;
    const url = `https://geocode.xyz/${lat},${lng}?geoit=JSON&region=SE&auth=${key}`;

    const response = await axios
      .get(url)
      .catch((error) => handleAxiosError(error, next));
    if (!response) {
      return next(new AppError("An error occured", 400));
    }

    const { city } = response.data;

    res.status(200).json({
      status: "success",
      data: {
        data: city,
      },
    });
  }
);

export const getCityFromAddress = catchAsync(
  async (
    req: CustomRequest<null>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const address = req.params.address;

    const key = process.env.GEOCODE_API_KEY;
    const url = `https://geocode.xyz/${address}?json=1&auth=${key}`;

    const response = await axios
      .get(url)
      .catch((error) => handleAxiosError(error, next));

    if (!response) {
      return next(new AppError("An error occured", 400));
    }
    const city = response.data.standard.city;
    const lat = response.data.latt;
    const lng = response.data.longt;

    const location = {
      city,
      lat,
      lng,
    };

    res.status(200).json({
      status: "success",
      data: {
        data: location,
      },
    });
  }
);
