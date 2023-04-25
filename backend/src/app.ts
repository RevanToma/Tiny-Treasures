import express from 'express';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { routes } from './routes';
import webRouter from './routes/web.router';
import AppError from './utils/appError';
import { globalErrorHandler } from './utils/errorHandler';
import { passportConfig } from './utils/passportConfig';

dotenv.config({ path: `${__dirname}/../config.env` });
passportConfig(passport);

export const app = express();
app.use(passport.initialize());

// MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use('/api/v1', routes);
app.use('/', webRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl}!`, 404));
});

// ERROR HANDLING
app.use(globalErrorHandler);
