import mongoose from 'mongoose';
import User from './userModel';
import AppError from '../utils/appError';
import { EnumDocument } from './enumsModel';
import { LocationData } from '../utils/interfaces';

export enum Condition {
  Used = 'Used',
  Fair = 'Fair',
  Good = 'Good',
  New = 'New',
}

export enum Sizes {
  A = '44',
  B = '50/56',
  C = '62/68',
  D = '74/80',
  E = '86/92',
  F = '98/104',
  G = '110/116',
  H = '122/128',
  I = '134/140',
  J = '146/152',
}

enum Ages {
  A = '0-3',
  B = '4-7',
  C = '8-11',
}

export interface PostDocumentWithoutEnum extends mongoose.Document {
  title: string;
  description: string;
  itemCount: number;
  sizes?: Sizes[];
  age: Ages;
  group: string;
  typeOfItems: string[];
  condition: Condition;
  createdAt: Date;
  images: string[];
  user: mongoose.Schema.Types.ObjectId;
  userName: string;
  location: LocationData;
  enumsAreValid: (post: PostDocumentWithEnums) => boolean;
}

export interface PostDocument extends PostDocumentWithoutEnum {
  enums: mongoose.Schema.Types.ObjectId;
}

export interface PostDocumentWithEnums extends PostDocumentWithoutEnum {
  enums: EnumDocument;
}

const postSchema = new mongoose.Schema<PostDocument>(
  {
    title: String,
    description: {
      type: String,
      maxLength: [
        1000,
        'Descriptions can not be more than 1000 characters long',
      ],
    },
    itemCount: {
      type: Number,
      min: [1, 'ItemCount must be more that 1!'],
      max: [10, 'You can not have more than 10 articles in 1 post!'],
      required: [true, 'Please provide the number of articles.'],
    },
    enums: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Enum',
      default: '645369da6fea72cad0792cbd',
    },
    group: String,
    typeOfItems: [String],
    sizes: {
      type: [String],
      enum: Sizes,
    },
    age: {
      type: String,
      enum: Ages,
    },
    condition: {
      type: String,
      enum: Condition,
      required: [true, 'Please provide a condition.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    images: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'All posts must belong to a user'],
    },
    userName: {
      type: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.index({ typeOfItems: 1, age: 1 });

postSchema.index({ location: '2dsphere' });

postSchema.pre('save', async function (next) {
  const user = await User.findById(this.user);
  if (!user) {
    return next(new AppError('there was a problem saving your post.', 400));
  }
  this.location = user.location;

  next();
});

postSchema.pre('save', async function (next) {
  this.id = this._id;
  next();
});

//USE FOR IMPORTING POSTS
// postSchema.pre('save', function (next) {
//   if (!this.isModified('sizes') || !this.sizes) return next();

//   switch (this.sizes[0]) {
//     case Sizes.A:
//     case Sizes.B:
//     case Sizes.C:
//     case Sizes.D:
//     case Sizes.E:
//     case Sizes.F:
//       this.age = Ages.A;
//       break;
//     case Sizes.G:
//     case Sizes.H:
//       this.age = Ages.B;
//       break;
//     case Sizes.I:
//     case Sizes.J:
//       this.age = Ages.C;
//       break;
//     default:
//       break;
//   }

//   next();
// });

postSchema.methods.enumsAreValid = function (post: PostDocumentWithEnums) {
  const { group, typeOfItems } = post;
  const { main } = post.enums;

  return (
    main.includes(group) &&
    typeOfItems.reduce((acc, cur) => {
      return post.enums[group].includes(cur) ? acc : false;
    }, true)
  );
};

const Post = mongoose.model<PostDocument>('Post', postSchema);
export default Post;
