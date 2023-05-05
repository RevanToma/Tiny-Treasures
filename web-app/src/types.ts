import { AxiosError } from 'axios';

export type IMessage = {
  senderId: string;
  text: string;
  receiverId: string;
  sentByMe?: boolean;
  createdAt?: Date;
  _id?: string;
};

export type IChatRoom = {
  members: string[];
  messages: IMessage[];
  _id: string;
};
export interface IUser {
  data: {
    user: User;
  };
  token: string;
  isSignedIn?: boolean;
  chats: IChatRoom[];
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
