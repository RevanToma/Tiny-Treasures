import { Request } from 'express';
import { UserDocument } from '../models/userModel';
import { IPostReqBody } from './interfaces';

export interface FilterObj {
  [key: string]: string | undefined;
}

export interface QueryString {
  [key: string]: string;
}

export interface CustomRequest<T> extends Request {
  body: T;
  user: UserDocument;
  query: QueryString;
  userId?: string;
  file?: any;
  files?: Express.Multer.File[];
  filenames: string[];
}
