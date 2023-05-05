import { NextFunction, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { CustomRequest } from '../utils/expressInterfaces';
import User from '../models/userModel';
import { decodeToken, getToken } from './authController';

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
