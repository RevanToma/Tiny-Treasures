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
exports.postsRouter = void 0;
const express_1 = __importDefault(require("express"));
const authController = __importStar(require("../controllers/authController"));
const postController = __importStar(require("../controllers/postController"));
const userController = __importStar(require("../controllers/userController"));
exports.postsRouter = express_1.default.Router();
exports.postsRouter
    .route("/")
    .get(userController.attatchUserToReq, postController.getAllPosts)
    .post(authController.protect, postController.uploadPhotos, postController.resizePhoto, postController.createPost);
exports.postsRouter.get("/:postId", userController.attatchUserToReq, postController.getPost);
// postsRouter.get(
//   "/favoritePosts",
//   userController.attatchUserToReq,
//   authController.protect,
//   userController.getFavoritePosts
// );
