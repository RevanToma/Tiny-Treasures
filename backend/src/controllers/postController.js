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
exports.createPost = exports.getPost = exports.getAllPosts = exports.resizePhoto = exports.uploadPhotos = void 0;
const postModel_1 = __importDefault(require("../models/postModel"));
const catchAsync_1 = require("../utils/catchAsync");
const apiFeatures_1 = require("../utils/apiFeatures");
const appError_1 = __importDefault(require("../utils/appError"));
const mongoose_1 = __importDefault(require("mongoose"));
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
require("../models/enumsModel");
// multer adds a body to the request object with the values of the form field.  If not using default FF, must create new form and all values on client side.
// req.file will hold the file, req.body will hold the text fields
//fieldname
// originalname
// encoding
// mimetype
// size
// destination	The folder to which the file has been saved	DiskStorage
// filename	The name of the file within the destination	DiskStorage
// path	The full path to the uploaded file	DiskStorage
// buffer	A Buffer of the entire file	MemoryStorage
// where to store files.  Since we want to resize them, we save to buffer
const multerStorage = multer_1.default.memoryStorage();
// determins which files to save
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
// can use a limit option to limit the data
const multerLimits = {
    fileSize: 4000000,
    files: 5,
    fields: 10,
    parts: 15,
    headerPairs: 100,
};
const upload = (0, multer_1.default)({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: multerLimits,
});
exports.uploadPhotos = upload.array("photos", 5);
exports.resizePhoto = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files)
        return next();
    // set filename for next middleware if only in buffer
    req.filenames = [];
    req.files.forEach((file, i) => __awaiter(void 0, void 0, void 0, function* () {
        const filename = `user-${req.user.id}-${Date.now() + i}.jpeg`;
        req.filenames.push(filename);
        yield (0, sharp_1.default)(file.buffer)
            .resize({ width: 1000 })
            .toFormat("jpeg")
            .jpeg({ quality: 80 })
            .toFile(`public/photos/posts/${filename}`);
    }));
    next();
}));
exports.getAllPosts = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const query = req.query;
    console.log(req.query);
    const pipeline = new apiFeatures_1.PostFeatures(query, (_a = req.user) === null || _a === void 0 ? void 0 : _a.location)
        .distanceFrom()
        .filter()
        .search()
        .sort()
        .limitFields()
        .countAndPaginate();
    const posts = yield postModel_1.default.aggregate(pipeline.stages);
    res.status(200).json({
        status: "success",
        results: posts.length,
        data: {
            data: posts,
        },
    });
}));
exports.getPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    // const location: LocationData | null = req.user.location;
    console.log("POSTID", postId);
    const pipeline = [
        {
            $match: { _id: new mongoose_1.default.Types.ObjectId(postId) },
        },
    ];
    //if (location) pipeline.unshift(distanceFrom(location));
    const post = yield postModel_1.default.aggregate(pipeline);
    if (!post) {
        return next(new appError_1.default("No post found!", 400));
    }
    res.status(200).json({
        status: "success",
        data: {
            post,
        },
    });
}));
exports.createPost = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const images = req.filenames
        ? [...req.filenames].map((fileName) => `/photos/posts/${fileName}`)
        : [];
    const itemCount = req.body.itemCount && parseInt(req.body.itemCount);
    const postData = {
        title: req.body.title,
        description: req.body.description,
        itemCount,
        size: req.body.size,
        mainCategory: req.body.mainCategory,
        subCategory: req.body.subCategory,
        enums: req.body.enums,
        condition: req.body.condition,
        images,
        user: req.user.id,
        userName: req.body.name,
    };
    const x = yield new postModel_1.default(postData).populate("enums");
    const post = yield new postModel_1.default(postData).populate("enums");
    if (!post) {
        return next(new appError_1.default("Unable to create post!", 400));
    }
    if (post.enumsAreValid(post)) {
        return next(new appError_1.default("Invalid categories!", 400));
    }
    post.save();
    res.status(200).json({
        status: "success",
        data: {
            data: post,
        },
    });
}));
