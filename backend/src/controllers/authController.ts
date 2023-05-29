import { Request, Response, NextFunction, RequestHandler } from 'express';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/appError';
import User, { UserDocument } from '../models/userModel';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { CustomRequest, FilterObj } from '../utils/expressInterfaces';
import { IUpdateEmailReqBody, IUpdatePassReqBody } from '../utils/interfaces';

interface DecodedJwt extends JwtPayload {
  id: string;
}

const signRefreshToken = (id: string): string | void => {
  if (!process.env.JWT_SECRET) return;
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signAccessToken = (id: string): string | void => {
  if (!process.env.JWT_SECRET) return;
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

const createAndSendRefreshToken = (
  user: UserDocument,
  statusCode: number,
  req: Request,
  res: Response,
  next: NextFunction,
  redirect: boolean = false
): void => {
  // create new token
  const token = signRefreshToken(user.id);
  if (!token) {
    return next(
      new AppError('There was a problem signing you in. Try again later', 400)
    );
  }

  // create cookie
  const jwtExpires = process.env.JWT_COOKIE_EXPIRES_IN
    ? parseInt(process.env.JWT_COOKIE_EXPIRES_IN)
    : 90;
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + jwtExpires * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // sameSite: "none",
    secure: false, // req.secure || req.headers["x-forwarded-proto"] === "https",
  });

  // remove password from response
  user.password = undefined;

  // redirect if logged in from google
  if (redirect) {
    res.redirect('http://localhost:5173/'); //TODO: This shouldn't be hardcoded
  } else {
    res.status(statusCode).json({
      status: 'success',
      token,
      data: {
        data: user,
      },
    });
  }
};

export const signUp = catchAsync(
  async (
    req: CustomRequest<FilterObj>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // Removes the method property if user tries to add it
    if (req.body?.method) delete req.body.method;

    const newUser: UserDocument = await User.create(req.body);

    createAndSendRefreshToken(newUser, 200, req, res, next);
  }
);

export const signIn = catchAsync(
  async (
    req: CustomRequest<null>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    createAndSendRefreshToken(req.user, 200, req, res, next);
  }
);

// FIXME: Don't really need catchAsync but getting errors without
export const googleAuthCallback = catchAsync(
  async (
    req: CustomRequest<null>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log(req.user);
    createAndSendRefreshToken(req.user, 200, req, res, next, true);
  }
);

export const sendUser = catchAsync(
  async (
    req: CustomRequest<null>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    createAndSendRefreshToken(req.user, 200, req, res, next, true);
  }
);

export const signOut: RequestHandler = (req, res, next): void => {
  // renames cookie to invalidate and sets to expire in 10s
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: false,
  });

  res.status(200).json({ status: 'success' });
};

export const updatePassword = catchAsync(
  async (
    req: CustomRequest<IUpdatePassReqBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { passwordNew, passwordConfirm } = req.body;

    if (!passwordNew || !passwordConfirm) {
      return next(
        new AppError('Please provide and confirm your new password.', 401)
      );
    }

    req.user.password = passwordNew;
    req.user.passwordConfirm = passwordConfirm;

    await req.user.save();

    createAndSendRefreshToken(req.user, 200, req, res, next);
  }
);

export const updateEmail = catchAsync(
  async (
    req: CustomRequest<IUpdateEmailReqBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { newEmail, password } = req.body;

    if (!newEmail || !password) {
      return next(
        new AppError(
          'Please provide a new email address and your current password.',
          401
        )
      );
    }
    const query = User.findById(req.user.id).select('+password');
    const user: UserDocument | null = await query;

    if (!user) {
      return next(new AppError('User not found!', 401));
    }
    if (!(await user.correctPassword(password, user.password!))) {
      return next(new AppError('Your current password is wrong.', 401));
    }

    req.user.email = newEmail;

    await req.user.save();

    createAndSendRefreshToken(req.user, 200, req, res, next);
  }
);

export const verifyPassword = catchAsync(
  async (
    req: CustomRequest<IUpdateEmailReqBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { password, email } = req.body;

    if (!password) {
      return next(new AppError('Please provide your password!', 401));
    }

    // builds query for change email or change password
    const query = email ? User.findOne({ email }) : User.findById(req.user.id);

    const user: UserDocument | null = await query.select('+password');

    if (!user) {
      return next(new AppError('User not found!', 401));
    }

    // verifies old password
    if (!(await user.correctPassword(password, user.password!))) {
      return next(new AppError('Your current password is wrong.', 401));
    }

    // TODO: Why do we need this??
    if (!req.user) req.user = user;

    next();
  }
);

export const getRefreshToken = (req: CustomRequest<null>) => {
  let token: string = '';
  console.log(req.cookies.jwt);
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (token.length < 5) {
    console.log('didnt find refresh token');
  }

  return token;
};

export const getAccessToken = (req: CustomRequest<null>) => {
  let token: string = '';

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (token.length < 5) {
    console.log('didnt find access token');
  }

  return token;
};

export const decodeToken = async (token: string): Promise<DecodedJwt> => {
  const secret = process.env.JWT_SECRET as Secret;

  const verifyJwt = (
    token: string,
    secret: Secret
  ): Promise<string | JwtPayload> => {
    return new Promise(resolve => {
      const decoded = jwt.verify(token, secret);
      resolve(decoded);
    });
  };

  const decoded = (await verifyJwt(token, secret)) as DecodedJwt;
  return decoded;
};

export const protect = catchAsync(
  async (
    req: CustomRequest<null>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = getAccessToken(req);

    if (!token) {
      return next(
        new AppError(
          'You are not logged in!  Please log in to get access!',
          401
        )
      );
    }

    const decoded = await decodeToken(token);

    if (!decoded) {
      return next(
        new AppError(
          'There was a problem verifying that you are logged in.',
          403
        )
      );
    }

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError('The owner of the token no longer exists!', 401)
      );
    }

    req.user = currentUser;
    next();
  }
);

export const refreshToken = catchAsync(
  async (
    req: CustomRequest<null>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = getRefreshToken(req);

    if (!token) {
      return next(new AppError('Refresh token invalid', 401));
    }

    const decoded = await decodeToken(token);

    if (!decoded) {
      return next(
        new AppError(
          'There was a problem verifying that you are logged in.',
          403
        )
      );
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(
        new AppError('The owner of the token no longer exists!', 401)
      );
    }

    const accessToken = signAccessToken(user._id);

    res.status(200).json({
      status: 'success',
      data: {
        accessToken,
        user,
      },
    });
  }
);
