"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passportConfig = void 0;
const passport_google_oauth2_1 = require("passport-google-oauth2");
const userModel_1 = __importDefault(require("../models/userModel"));
const passportConfig = (passport) => {
    passport.use(new passport_google_oauth2_1.Strategy({
        clientID: process.env.OA_CLIENT_ID,
        clientSecret: process.env.OA_CLIENT_SECRET,
        // FIXME:  PROD
        callbackURL: "http://localhost:8000/auth/google/callback",
        passReqToCallback: true,
    }, (request, accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let existingUser = yield userModel_1.default.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }
            const newUser = new userModel_1.default({
                method: "google",
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
            });
            yield newUser.save();
            return done(null, newUser);
        }
        catch (error) {
            return done(error, false);
        }
    })));
};
exports.passportConfig = passportConfig;
