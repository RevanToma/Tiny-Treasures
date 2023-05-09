import { AxiosError } from "axios";

export type IMessage = {
  senderId: string;
  text: string;
  receiverId: string;
  sentByMe?: boolean;
  createdAt?: Date;
  _id?: string;
  roomId?: string;
};

export type IChatRoom = {
  members: string[];
  messages: IMessage[];
  _id?: string;
};
export interface IUser {
  data: {
    user: User;
  };
  token: string;
  isSignedIn?: boolean;
  currentChatRoom?: IChatRoom;
}
export type SignInInfo = {
  email: string;
  password: string;
};
interface User {
  _id?: string;
  email: string;
  firstName: string;
  credits: number;
  name: string;
  location?: {
    coordinates: [];
  };
}
export interface SignUpInfo {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface Post {
  categories: string[];
  condition: string;
  createdAt: Date;
  description: string;
  id: string;
  images: string[];
  itemCount: number;
  location: {
    coordinates: [number, number];
    type: string;
  };
  sizes: number[];
  title: string;
  user: string;
  _id: string;
}

// REACT QUERY
export interface QueryClientResults<T> {
  data: {
    data: T;
  };
}

interface Metadata {
  nextPage: number;
  totalPages: number;
  totalResults: number;
  _id: null;
}

export interface PostQueryResult {
  metadata: Metadata;
  posts: Post[];
}

export interface GeoLocation {
  coordinates: [number, number];
  type: string;
  city?: string;
}

export enum MainCategories {
  A = "Other",
  B = "Clothes",
  C = "Toys",
}

export const mainCategories = ["Clothes", "Toys", "Other"];

export enum Clothes {
  A = "One Piece",
  B = "Knitted",
  C = "T-Shirts",
  D = "Sweaters",
  E = "Shirts",
  F = "Dresses",
  G = "Trousers",
  H = "Jeans",
  I = "Leggings",
  J = "Shorts",
}
export const clothes = [
  "One Piece",
  "Knitted",
  "T-Shirts",
  "Sweaters",
  "Shirts",
  "Dresses",
  "Trousers",
  "Jeans",
  "Leggings",
  "Shorts",
];

export enum Toys {
  A = "Soft Toys",
  B = "Baby Toys",
  C = "Indoor Toys",
  D = "Outdoor Toys",
  E = "Educational",
  F = "Creative",
  G = "Arts and Crafts",
  H = "Sports",
  I = "Games",
}

export const toys = [
  "Soft Toys",
  "Baby Toys",
  "Indoor Toys",
  "Outdoor Toys",
  "Educational",
  "Creative",
  "Arts and Crafts",
  "Sports",
  "Games",
];

export enum Other {
  A = "Bikes",
  B = "Strollers",
  C = "Car Seats",
}
export const other = ["Bikes", "Strollers", "Car Seats"];

export enum Sizes {
  A = "44",
  B = "50/56",
  C = "62/68",
  D = "74/80",
  E = "86/92",
  F = "98/104",
  G = "110/116",
  H = "122/128",
  I = "134/140",
  j = "146/152",
}
export const sizes = [
  "44",
  "50/56",
  "62/68",
  "74/80",
  "86/92",
  "98/104",
  "110/116",
  "122/128",
  "134/140",
  "146/152",
];

export const ages = ["0-3", "4-7", "8-11"];
