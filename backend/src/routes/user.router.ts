import express from 'express';
import * as authController from '../controllers/authController';
import * as userController from '../controllers/userController';

export const userRouter = express.Router();

userRouter.get('/refreshToken', authController.refreshToken);

userRouter.post('/signup', authController.signUp);
userRouter.post(
  '/signin',
  authController.verifyPassword,
  authController.signIn
);
userRouter.patch(
  '/updateLocation',
  authController.protect,
  userController.updateLocation
);

userRouter.post('/signout', authController.signOut);

userRouter.use(authController.protect);

userRouter.patch('/updateMe', userController.updateMe);

userRouter.patch(
  '/updatePassword',
  authController.verifyPassword,
  authController.updatePassword
);
userRouter.patch(
  '/updateEmail',
  authController.verifyPassword,
  authController.updateEmail
);
userRouter.patch('/updateName', authController.updateName);
userRouter.get('/checkLoggedIn', userController.getBasicUserData);

userRouter.get(
  '/posts',
  userController.attatchUserToReq,
  userController.getAllUsersPosts
);

userRouter.get(
  '/favoritePosts',
  userController.attatchUserToReq,
  userController.getFavoritePosts
);
