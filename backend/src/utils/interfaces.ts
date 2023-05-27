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
