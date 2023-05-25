"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController = __importStar(require("../controllers/authController"));
const userController = __importStar(require("../controllers/userController"));
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/refreshToken", authController.refreshToken);
exports.userRouter.post("/signup", authController.signUp);
exports.userRouter.post("/signin", authController.verifyPassword, authController.signIn);
exports.userRouter.patch("/updateLocation", authController.protect, userController.updateLocation);
exports.userRouter.get("/getLocation", authController.protect, userController.getLocation);
exports.userRouter.post("/signout", authController.signOut);
exports.userRouter.use(authController.protect);
exports.userRouter.patch("/updatePassword", authController.verifyPassword, authController.updatePassword);
exports.userRouter.patch("/updateEmail", authController.verifyPassword, authController.updateEmail);
exports.userRouter.patch("/updateName", authController.protect, authController.updateName);
exports.userRouter.get("/checkLoggedIn", authController.protect, userController.getBasicUserData);
exports.userRouter.get("/posts", userController.attatchUserToReq, authController.protect, userController.getAllUsersPosts);
exports.userRouter.get("/favoritePosts", userController.attatchUserToReq, authController.protect, userController.getFavoritePosts);
