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
