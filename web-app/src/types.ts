export type IMessage = {
  firstOfDay?: boolean;
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
  post: Post;
};
export interface IUser {
  data: {
    user: User | null;
  };

  // token: string;
  isSignedIn?: boolean;
  accessToken?: string;
  currentChatRoom?: IChatRoom;
}
export interface UserState {
  user: User | null;
  isSignedIn: boolean;
  currentChatRoom?: IChatRoom;
  accessToken: string;
}
export type SignInInfo = {
  email: string;
  password: string;
};
export interface User {
  // data?: any;
  _id?: string;
  email: string;
  firstName: string;
  credits: number;
  name: string;
  location?: {
    coordinates: [];
  };
  favorites?: string[];
}
export interface SignUpInfo {
  name: string;
  email: string;
  confirmEmail?: string;
  password: string;
  passwordConfirm: string;
}

export interface Post {
  typeOfItems: string[];
  group: string;
  condition: string;
  createdAt: string;
  description: string;
  _id: string;
  images: string[];
  itemCount: number;
  location: {
    coordinates: [number, number];
    type: string;
    city: string;
  };
  distance: number;
  sizes: string[];
  age: string;
  title: string;
  user: string;
}
export interface IReviewPost {
  typeOfItems: string[];
  group: string;
  condition: string;
  createdAt: string;
  description: string;
  images: string[];
  itemCount: number;
  location: {
    city: string;
  };
  distance: number;
  sizes: string[];
  age: string;
  title: string;
  id: string;
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

// ENUMS
export interface Enum {
  [key: string]: string[];
  sizes: string[];
  clothes: string[];
  main: string[];
  toys: string[];
  other: string[];
}
export interface LocationData {
  type: Point;
  coordinates: [number, number];
  city?: string;
}
export enum Point {
  Point = 'Point',
}

export interface checkBox {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}
