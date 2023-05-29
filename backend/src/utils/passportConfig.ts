import {
  Strategy as GoogleStrategy,
  StrategyOptionsWithRequest,
  VerifyCallback,
} from 'passport-google-oauth2';
import User from '../models/userModel';
import passport from 'passport';
import { Request } from 'express';

interface IName {
  familyName: string;
  givenName: string;
  middleName: string;
}

interface IEmails {
  value: string;
  type: string;
}

interface IUserProfile {
  provider: string;
  id: string;
  displayName: string;
  name: IName;
  emails: IEmails[];
  photos: string[];
}

const AUTH_OPTIONS: StrategyOptionsWithRequest = {
  clientID: process.env.OA_CLIENT_ID!,
  clientSecret: process.env.OA_CLIENT_SECRET!,
  // FIXME:  PROD
  callbackURL: 'http://localhost:8000/auth/google/callback',
  passReqToCallback: true,
};

const createNewUserInfo = (profile: IUserProfile) => {
  return {
    method: 'google',
    googleId: profile.id,
    name: profile.displayName,
    email: profile.emails[0].value,
  };
};

const getOrCreateUser = async (profile: IUserProfile, done: VerifyCallback) => {
  let existingUser = await User.findOne({ googleId: profile.id });

  if (existingUser) {
    return done(null, existingUser);
  }

  const newUserInfo = createNewUserInfo(profile);
  const newUser = await User.create(newUserInfo);
  // await newUser.save();
  return done(null, newUser);
};

const verifyCallback = async (
  request: Request,
  accessToken: string,
  refreshToken: string,
  profile: IUserProfile,
  done: VerifyCallback
): Promise<void> => {
  try {
    getOrCreateUser(profile, done);
  } catch (error) {
    return done(error, false);
  }
};

export const passportConfig = (passport: passport.PassportStatic) => {
  passport.use(new GoogleStrategy(AUTH_OPTIONS, verifyCallback));
};
