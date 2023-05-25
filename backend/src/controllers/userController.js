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
exports.getFavoritePosts = exports.getAllUsersPosts = exports.getLocation = exports.updateLocation = exports.getBasicUserData = exports.attatchUserToReq = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const userModel_1 = __importDefault(require("../models/userModel"));
const authController_1 = require("./authController");
const appError_1 = __importDefault(require("../utils/appError"));
const postModel_1 = __importDefault(require("../models/postModel"));
// UTILITY MIDDLEWARE
exports.attatchUserToReq = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, authController_1.getAccessToken)(req);
    if (!token)
        return next();
    const decoded = yield (0, authController_1.decodeToken)(token);
    if (!decoded)
        return next();
    const user = yield userModel_1.default.findById(decoded.id);
    if (!user)
        return next();
    req.user = user;
    next();
}));
exports.getBasicUserData = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const basicUserData = yield userModel_1.default.findById(req.user.id).select("id name email location saved");
    if (!basicUserData) {
        return next(new appError_1.default("No user found", 400));
    }
    res.status(200).json({
        status: "success",
        data: {
            data: basicUserData,
        },
    });
}));
exports.updateLocation = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newLocation = req.body;
    console.log(newLocation);
    const updatedUser = yield userModel_1.default.findByIdAndUpdate(req.user.id, { location: newLocation }, { new: true, runValidators: true });
    if (!updatedUser) {
        return next(new appError_1.default("Error updating user location", 400));
    }
    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser,
        },
    });
}));
exports.getLocation = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.user.id);
    if (!user) {
        return next(new appError_1.default("No user found", 400));
    }
    res.status(200).json({
        status: "success",
        data: {
            location: user.location,
        },
    });
}));
exports.getAllUsersPosts = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    console.log(userId);
    const userPosts = yield postModel_1.default.find({ user: userId });
    res.status(200).json({
        status: "success",
        TotalPosts: userPosts.length,
        data: {
            userPosts,
        },
    });
}));
exports.getFavoritePosts = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const user = yield userModel_1.default.findById(userId).populate("favorites");
    if (!user) {
        return next(new appError_1.default("User not found", 404));
    }
    const favorites = user.favorites;
    res.status(200).json({
        status: "success",
        data: {
            favorites,
        },
    });
}));
