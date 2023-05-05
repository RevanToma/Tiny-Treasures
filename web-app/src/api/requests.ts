import axios, { AxiosResponse } from 'axios';
import { IChatRoom, SignInInfo, SignUpInfo } from '../types';
import { Post, PostQueryResult } from '../utils/interfaces';
import api from './index';

interface ResponseWithData<T> {
  status: string;
  results?: number;
  data: {
    [key: string]: T;
  };
}

interface ResponseWithError {
  status: string;
  error?: Error;
  message: string;
  stack?: string;
}

const baseUrl = 'http://localhost:8000/api/v1';

export const checkForError = (
  data: ResponseWithData<Post[] | PostQueryResult[]> | ResponseWithError
): void => {
  if (data.status === 'error' || data.status === 'fail') {
    throw new Error('Something went wrong!');
  }
};

export const fetchChats = async (id: any) => {
  const { data } = await api.get<IChatRoom[]>(`/chat/${id}`);
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
  password,
  passwordConfirm,
}: SignUpInfo) => {
  const { data } = await api.post('users/signup', {
    name,
    email,
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
    await axios.get(
      `${baseUrl}/posts/?page=${pageParam}&limit=${limit}&${query}`
    );
  checkForError(data.data);
  return data.data.data.data[0];
};
