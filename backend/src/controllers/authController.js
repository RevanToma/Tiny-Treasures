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
exports.refreshToken = exports.protect = exports.decodeToken = exports.getAccessToken = exports.getRefreshToken = exports.verifyPassword = exports.updateName = exports.updateEmail = exports.updatePassword = exports.signOut = exports.sendUser = exports.googleAuthCallback = exports.signIn = exports.signUp = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = __importDefault(require("../utils/appError"));
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signRefreshToken = (id) => {
    if (!process.env.JWT_SECRET)
        return;
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const signAccessToken = (id) => {
    if (!process.env.JWT_SECRET)
        return;
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
};
const createAndSendRefreshToken = (user, statusCode, req, res, next, redirect = false) => {
    // create new token
    const token = signRefreshToken(user.id);
    if (!token) {
        return next(new appError_1.default("There was a problem signing you in. Try again later", 400));
    }
    // create cookie
    const jwtExpires = process.env.JWT_COOKIE_EXPIRES_IN
        ? parseInt(process.env.JWT_COOKIE_EXPIRES_IN)
        : 90;
    res.cookie("jwt", token, {
        expires: new Date(Date.now() + jwtExpires * 24 * 60 * 60 * 1000),
        httpOnly: true,
        // sameSite: "none",
        secure: false, // req.secure || req.headers["x-forwarded-proto"] === "https",
    });
    // remove password from response
    user.password = undefined;
    // redirect if logged in from google
    if (redirect) {
        res.redirect("http://localhost:5173/"); //TODO: This shouldn't be hardcoded
    }
    else {
        res.status(statusCode).json({
            status: "success",
            token,
            data: {
                data: user,
            },
        });
    }
};
exports.signUp = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Removes the method property if user tries to add it
    if (req.body.method)
        delete req.body.method;
    const newUser = yield userModel_1.default.create(req.body);
    createAndSendRefreshToken(newUser, 200, req, res, next);
}));
exports.signIn = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("signin");
    console.log(req.user);
    createAndSendRefreshToken(req.user, 200, req, res, next);
}));
// FIXME: Don't really need catchAsync but getting errors without
exports.googleAuthCallback = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    createAndSendRefreshToken(req.user, 200, req, res, next, true);
}));
exports.sendUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    createAndSendRefreshToken(req.user, 200, req, res, next, true);
}));
const signOut = (req, res, next) => {
    // renames cookie to invalidate and sets to expire in 10s
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        secure: false,
    });
    res.status(200).json({ status: "success" });
};
exports.signOut = signOut;
exports.updatePassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { passwordNew, passwordConfirm } = req.body;
    if (!passwordNew || !passwordConfirm) {
        return next(new appError_1.default("Please provide and confirm your new password.", 401));
    }
    req.user.password = passwordNew;
    req.user.passwordConfirm = passwordConfirm;
    yield req.user.save();
    createAndSendRefreshToken(req.user, 200, req, res, next);
}));
exports.updateEmail = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { newEmail, password } = req.body;
    if (!newEmail || !password) {
        return next(new appError_1.default("Please provide a new email address and your current password.", 401));
    }
    const query = userModel_1.default.findById(req.user.id).select("+password");
    const user = yield query;
    if (!user) {
        return next(new appError_1.default("User not found!", 401));
    }
    if (!(yield user.correctPassword(password, user.password))) {
        return next(new appError_1.default("Your current password is wrong.", 401));
    }
    req.user.email = newEmail;
    yield req.user.save();
    createAndSendRefreshToken(req.user, 200, req, res, next);
}));
exports.updateName = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { newName } = req.body;
    if (!newName) {
        return next(new appError_1.default("Please provide a new name.", 401));
    }
    req.user.name = newName;
    yield req.user.save();
    createAndSendRefreshToken(req.user, 200, req, res, next);
}));
exports.verifyPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    if (!password) {
        return next(new appError_1.default("Please provide your password!", 401));
    }
    // builds query for change email or change password
    const query = email ? userModel_1.default.findOne({ email }) : userModel_1.default.findById(req.user.id);
    const user = yield query.select("+password");
    if (!user) {
        return next(new appError_1.default("User not found!", 401));
    }
    // verifies old password
    if (!(yield user.correctPassword(password, user.password))) {
        return next(new appError_1.default("Your current password is wrong.", 401));
    }
    // TODO: Why do we need this??
    if (!req.user)
        req.user = user;
    next();
}));
const getRefreshToken = (req) => {
    let token = "";
    console.log(req.cookies.jwt);
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (token.length < 5) {
        console.log("didnt find refresh token");
    }
    return token;
};
exports.getRefreshToken = getRefreshToken;
const getAccessToken = (req) => {
    var _a;
    let token = "";
    if ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (token.length < 5) {
        console.log("didnt find access token");
    }
    return token;
};
exports.getAccessToken = getAccessToken;
const decodeToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.JWT_SECRET;
    const verifyJwt = (token, secret) => {
        return new Promise((resolve) => {
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            resolve(decoded);
        });
    };
    const decoded = (yield verifyJwt(token, secret));
    return decoded;
});
exports.decodeToken = decodeToken;
exports.protect = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, exports.getAccessToken)(req);
    if (!token) {
        return next(new appError_1.default("You are not logged in!  Please log in to get access!", 401));
    }
    const decoded = yield (0, exports.decodeToken)(token);
    if (!decoded) {
        return next(new appError_1.default("There was a problem verifying that you are logged in.", 403));
    }
    const currentUser = yield userModel_1.default.findById(decoded.id);
    if (!currentUser) {
        return next(new appError_1.default("The owner of the token no longer exists!", 401));
    }
    req.user = currentUser;
    next();
}));
exports.refreshToken = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, exports.getRefreshToken)(req);
    if (!token) {
        return next(new appError_1.default("Refresh token invalid", 401));
    }
    const decoded = yield (0, exports.decodeToken)(token);
    if (!decoded) {
        return next(new appError_1.default("There was a problem verifying that you are logged in.", 403));
    }
    const user = yield userModel_1.default.findById(decoded.id);
    if (!user) {
        return next(new appError_1.default("The owner of the token no longer exists!", 401));
    }
    const accessToken = signAccessToken(user._id);
    res.status(200).json({
        status: "success",
        data: {
            accessToken,
            user,
        },
    });
}));
