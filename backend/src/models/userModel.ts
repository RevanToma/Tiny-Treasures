import mongoose, { Document, Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import AppError from '../utils/appError';

export interface UserDocument extends Document {
  method: string;
  googleId: string;
  name: string;
  email: string;
  password: string | undefined;
  passwordConfirm: string | undefined;
  createdAt: Date;
  location: {
    type: string;
    coordinates: [number, number];
    city: string;
  };
  // posts: mongoose.Schema.Types.ObjectId[];
  credits: number;

  correctPassword(a: string, b: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    method: {
      type: String,
      enum: ['google', 'email'],
      default: 'email',
    },
    googleId: String,
    name: {
      type: String,
      required: [true, 'Please provide a name.'],
    },
    email: {
      type: String,
      required: [true, 'Please privide an email address.'],
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email address.'],
      lowercase: true,
    },
    password: {
      type: String,
      // required: [true, 'Please provide a password.'],
      minLength: [8, 'Passwords must have at least 8 characters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      // required: [true, 'Please confirm your password.'],
      minLength: [8, 'Passwords must have at least 8 characters'],
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      city: String,
    },
    credits: {
      type: Number,
      min: [0, 'A user can not have less than 0 credits!'],
      max: [10, 'A user can not have more than 10 credits at a time.'],
      default: 3,
    },
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'posts',
//     select: '-__v',
//   });
//   next();
// });

userSchema.pre('save', async function (next) {
  if (!this.isNew || this.method === 'google') return next();

  if (!this.password || !this.passwordConfirm) {
    return next(new AppError('Please provide and confirm your password', 400));
  }

  if (this.password !== this.passwordConfirm) {
    return next(new AppError('The provided passwords do not match!', 400));
  }
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

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

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
