import { Request } from 'express';
import { UserDocument } from '../models/userModel';

export interface FilterObj {
  [key: string]: string | undefined;
}

export interface QueryString {
  [key: string]: string;
}

export interface CustomRequest extends Request {
  body: FilterObj;
  user: UserDocument;
  query: QueryString;
}
