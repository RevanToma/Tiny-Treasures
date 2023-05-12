import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from 'passport-google-oauth2';
import User from '../models/userModel';
import passport from 'passport';
import { Request } from 'express';

export const passportConfig = (passport: passport.PassportStatic) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.OA_CLIENT_ID!,
        clientSecret: process.env.OA_CLIENT_SECRET!,
        // FIXME:  PROD
        callbackURL: 'http://localhost:8000/auth/google/callback',
        passReqToCallback: true,
      },
      async (
        request: Request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
      ): Promise<void> => {
        try {
          let existingUser = await User.findOne({ googleId: profile.id });
          if (existingUser) {
            return done(null, existingUser);
          }
          const newUser = new User({
            method: 'google',
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          await newUser.save();
          return done(null, newUser);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
