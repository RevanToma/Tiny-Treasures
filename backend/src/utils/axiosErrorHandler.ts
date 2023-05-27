import { NextFunction } from 'express';
import AppError from './appError';
import { AxiosError } from 'axios';

export const handleAxiosError = (error: AxiosError, next: NextFunction) => {
  if (error.response) {
    return next(
      new AppError(
        'There was a problem finding your address. Please try a differnt address.',
        error.response.status
      )
    );
  } else if (error.request) {
    return next(
      new AppError(
        'There was a problem with the server. Please try again later.',
        error.request.status
      )
    );
  } else {
    return next(new AppError(error.message, 400));
  }
};
