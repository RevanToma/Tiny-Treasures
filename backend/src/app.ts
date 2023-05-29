import express from 'express';
import passport from 'passport';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import helmet from 'helmet';

import { postsRouter } from './routes/posts.router';
import { userRouter } from './routes/user.router';
import webRouter from './routes/web.router';
import enumRouter from './routes/enum.routes';
import geocodeRouter from './routes/geocodeRoutes';
import AppError from './utils/appError';
import { globalErrorHandler } from './utils/errorHandler';
import { passportConfig } from './utils/passportConfig';
import { chatRouter } from './routes/chat.router';

// CONFIG
dotenv.config({ path: `${__dirname}/../config.env` });
passportConfig(passport);

export const app = express();

app.use(helmet({ crossOriginResourcePolicy: false }));

// MIDDLEWARE
app.use(passport.initialize());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/enums', enumRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/geocode', geocodeRouter);
app.use('/', webRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl}!`, 404));
});

// ERROR HANDLING
app.use(globalErrorHandler);
