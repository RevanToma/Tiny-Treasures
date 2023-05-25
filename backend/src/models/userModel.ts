import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { BasicUserData, LocationData } from "../utils/interfaces";
import { PostDocument } from "./postModel";

export interface UserDocument extends Document {
  id: string;
  name: string;
  email: string;
  confirmEmail: string | undefined;
  password: string | undefined;
  passwordConfirm: string | undefined;
  createdAt: Date;
  location: LocationData;
  // posts: mongoose.Schema.Types.ObjectId[];
  credits: number;
  saved: PostDocument[];
  favorites: PostDocument[];
  newMessages: number;
  method: "password" | "google";
  googleId?: string;

  correctPassword(a: string, b: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name."],
    },
    email: {
      type: String,
      required: [true, "Please privide an email address."],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email address."],
      lowercase: true,
    },
    confirmEmail: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email address."],
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    credits: {
      type: Number,
      min: [0, "A user can not have less than 0 credits!"],
      max: [10, "A user can not have more than 10 credits at a time."],
      default: 3,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  /*
  if (this.password !== this.passwordConfirm) {
    return next(new AppError("The provided passwords do not match!", 400));
  }
  
  if (this.email !== this.confirmEmail) {
    return next(new AppError("The provided emails do not match!", 400));
  }*/
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password!, 14);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// DATA MANIPULATION
export const modifyBasicUserData = (userDoc: UserDocument): BasicUserData => {
  return {
    id: userDoc._id,
    name: userDoc.name,
    email: userDoc.email,
    location: userDoc.location,
  };
};

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
