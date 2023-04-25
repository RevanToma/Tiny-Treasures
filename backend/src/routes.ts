import express from 'express';
import { postsRouter } from './routes/posts.router';
import { userRouter } from './routes/user.router';

export const routes = express.Router();

routes.use('/posts', postsRouter);
routes.use('/users', userRouter);
