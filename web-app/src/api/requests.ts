import { AxiosResponse } from 'axios';
import {
  Enum,
  IChatRoom,
  IUser,
  Post,
  PostQueryResult,
  SignInInfo,
  SignUpInfo,
} from '../types';
import api from './index';

export interface ResponseWithData<T> {
  status: string;
  results?: number;
  data: {
    [key: string]: T;
  };
}

export interface ResponseWithError {
  status: string;
  error?: Error;
  message: string;
  stack?: string;
}

export const checkForError = (
  data:
    | ResponseWithData<Post[] | PostQueryResult[] | Enum[]>
    | ResponseWithError
): void => {
  if (data.status === 'error' || data.status === 'fail') {
    throw new Error('Something went wrong!');
  }
};

export const fetchChats = async (id: any) => {
  const { data } = await api.get<IChatRoom[]>(`/chat/${id}`);
  return data;
};

export const fetchChatById = async (id: any) => {
  const { data } = await api.get<IChatRoom>(`/chat/room/${id}`);
  return data;
};

export const ApiPostSignInUser = async ({ email, password }: SignInInfo) => {
  const { data } = await api.post('/users/signin', {
    email,
    password,
  });
  return data;
};

export const ApiPostSignUpUser = async ({
  name,
  email,
  confirmEmail,
  password,
  passwordConfirm,
}: SignUpInfo) => {
  const { data } = await api.post('users/signup', {
    name,
    email,
    confirmEmail,
    password,
    passwordConfirm,
  });
  return data;
};

type getPostParams = {
  pageParam: number;
  query: string | undefined;
};

export const fetchPosts = async ({
  pageParam = 1,
  query = '',
}: getPostParams): Promise<PostQueryResult> => {
  const limit = 20;
  const data: AxiosResponse<ResponseWithData<PostQueryResult[]>> =
    await api.get(`posts/?page=${pageParam}&limit=${limit}&${query}`);
  checkForError(data.data);
  console.log(data);
  return data.data.data.data[0];
};

export const fetchPostById = async (id: string | undefined) => {
  console.log(1111);
  const { data } = await api.get(`/posts/${id}`);
  checkForError(data);
  const post: Post = data.data.post[0];
  return post;
};

export const signOutUser = async () => {
  await api.post('users/logout');
  return;
};

export const fetchEnums = async () => {
  const data: AxiosResponse<ResponseWithData<Enum[]>> = await api.get(`enums`);
  checkForError(data.data);
  return data.data.data.data[0];
};
