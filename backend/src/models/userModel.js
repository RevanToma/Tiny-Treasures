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
exports.modifyBasicUserData = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name."],
    },
    email: {
        type: String,
        required: [true, "Please privide an email address."],
        unique: true,
        validate: [validator_1.default.isEmail, "Please provide a valid email address."],
        lowercase: true,
    },
    confirmEmail: {
        type: String,
        validate: [validator_1.default.isEmail, "Please provide a valid email address."],
        lowercase: true,
    },
    method: {
        type: String,
        default: "password",
    },
    googleId: String,
    password: {
        type: String,
        minLength: [8, "Passwords must have at least 8 characters"],
        select: false,
    },
    passwordConfirm: {
        type: String,
        minLength: [8, "Passwords must have at least 8 characters"],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    location: {
        type: {
            type: String,
            default: "Point",
            enum: ["Point"],
        },
        coordinates: [Number],
        city: String,
    },
    saved: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    favorites: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    credits: {
        type: Number,
        min: [0, "A user can not have less than 0 credits!"],
        max: [10, "A user can not have more than 10 credits at a time."],
        default: 3,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isNew)
            return next();
        /*
        if (this.password !== this.passwordConfirm) {
          return next(new AppError("The provided passwords do not match!", 400));
        }
        
        if (this.email !== this.confirmEmail) {
          return next(new AppError("The provided emails do not match!", 400));
        }*/
        next();
    });
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield bcryptjs_1.default.hash(this.password, 14);
        this.passwordConfirm = undefined;
        next();
    });
});
userSchema.methods.correctPassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(candidatePassword, userPassword);
    });
};
// DATA MANIPULATION
const modifyBasicUserData = (userDoc) => {
    return {
        id: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        location: userDoc.location,
    };
};
exports.modifyBasicUserData = modifyBasicUserData;
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
