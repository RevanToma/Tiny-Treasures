import mongoose from 'mongoose';
import { IPostDocument } from '../models/postModel';

export interface IStringObject {
  [key: string]: string | undefined;
}
export interface INumberObject {
  [key: string]: number | undefined;
}

export interface IBasicUserData {
  id: string;
  name: string;
  email: string;
  location: ILocationData;
}

export interface IChatMessage {
  user: mongoose.Schema.Types.ObjectId;
  text: string;
  createdAt: Date;
  seen: boolean;
}

export interface IChatData {
  chatId: string;
  newMsgs: number;
  latestMsg: IChatMessage;
}

export interface IUserMsgData {
  newMessages: number;
  chatData: IChatData[];
}

export enum EPoint {
  Point = 'Point',
}

export interface ILocationData {
  type: EPoint;
  coordinates: [number, number];
  city?: string;
}

export interface IPostsWithData {
  posts: IPostDocument[];
  nextPage: number;
}

export interface IPostReqBody {
  frontImageArray: string;
  imgUrls: string[];
  itemCount: string;
  title: string;
  description: string;
  sizes: string[];
  group: string;
  typeOfItems: string[];
  condition: string;
  images: File[];
  id?: string;
}
export interface IUpdatePassReqBody {
  passwordNew: string;
  passwordConfirm: string;
}
export interface IUpdateEmailReqBody {
  newEmail: string;
  password: string;
  email?: string;
}
