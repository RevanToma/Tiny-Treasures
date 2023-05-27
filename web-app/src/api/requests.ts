import axios, { AxiosResponse } from 'axios';
import { Enum, IChatRoom, Post, PostQueryResult, SignUpInfo } from '../types';
import api from './index';
import { apiUrl, geocodeUrl, serverRoute } from '../utils/urls/serverUrls';

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

export const fetchChats = async (id: string) => {
  const { data } = await api.get<IChatRoom[]>(`/chat/${id}`);
  const sortedDataByMostRecent = data.sort((a, b) => {
    const mostRecentMessageA = a.messages[a.messages.length - 1];
    const mostRecentMessageB = b.messages[b.messages.length - 1];

    if (mostRecentMessageA.createdAt && mostRecentMessageB.createdAt) {
      if (mostRecentMessageA.createdAt < mostRecentMessageB.createdAt) {
        // Compare the 'createdAt' property of the most recent messages
        return 1;
      } else if (mostRecentMessageA.createdAt > mostRecentMessageB.createdAt) {
        return -1;
      }
    }

    return 0; // Default return statement when comparison cannot be performed
  });
  return sortedDataByMostRecent;
};

export const fetchChatById = async (id: any) => {
  const { data } = await api.get<IChatRoom>(`/chat/room/${id}`);
  return data;
};

export const ApiPostSignInUser = async (email: string, password: string) => {
  const { data } = await api.post('/users/signin', {
    email,
    password,
  });
  // console.log('LOGIN!!!!!!!!!!', data.data.data);
  return data.data.data;
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
  checkForError(data);
  return data;
};

type getPostParams = {
  pageParam: number;
  query: string | undefined;
  searchQuery: string | undefined;
};

export const fetchPosts = async ({
  pageParam = 1,
  query = '',
  searchQuery,
}: getPostParams): Promise<PostQueryResult> => {
  console.log('fetched', searchQuery);
  const limit = 20;
  let urlQuery = 'posts/?';
  if (pageParam) {
    urlQuery += `&page=${pageParam}&limit=${limit}&${query}`;
  }
  if (searchQuery) {
    urlQuery += `&search=${searchQuery}`;
  }

  const data: AxiosResponse<ResponseWithData<PostQueryResult[]>> =
    await api.get(urlQuery);
  checkForError(data.data);
  return data.data.data.data[0];
};

export const fetchPostById = async (id: string | undefined) => {
  const { data } = await api.get(`/posts/${id}`);
  checkForError(data);
  const post: Post = data.data.post[0];
  return post;
};

export const signOutUserAsync = async () => {
  await api.post('users/signout');
  return;
};

export const fetchEnums = async () => {
  const data: AxiosResponse<ResponseWithData<Enum[]>> = await api.get(`enums`);
  checkForError(data.data);
  return data.data.data.data[0];
};

export const getUserFromJwt = async () => {
  const { data } = await api.get('/users/checkLoggedIn');
  // console.log('DATA FROM CALL', data.data.data);
  return data.data.data;
};

export const patchName = async (newName: string) => {
  const { data } = await api.patch('/users/updateName', { newName });
  checkForError(data);
  return data;
};

export const patchEmail = async (newEmail: string, password: string) => {
  const { data } = await api.patch('/users/updateEmail', {
    newEmail,
    password,
  });
  checkForError(data);
  return data;
};

export const patchPassword = async (passwordData: {
  password: string;
  passwordNew: string;
  passwordConfirm: string;
}) => {
  const { data } = await api.patch('/users/updatePassword', passwordData);
  checkForError(data);
  return data;
};

export const getCityFromAddress = async (address: string) => {
  const url = `${geocodeUrl}/address/${address}`;
  const response = await api.get(url);
  const { data } = response.data.data;
  return data;
};

export const getCityFromCoords = async (lat: number, lng: number) => {
  const url = `${geocodeUrl}/coords/lat/${lat}/lng/${lng}`;
  const response = await axios.get(url);

  const city = response.data.data.data;
  return city;
};

export const getAccessToken = async () => {
  const { data } = await axios.get(serverRoute.refreshToken, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  }); //await api.get("/users/refresh-token");
  checkForError(data);

  return data.data;
};

export const fetchUsersPosts = async () => {
  const { data } = await api.get('/users/posts');
  checkForError(data);
  console.log('USER POST FROM REQUEST', data);
  return data.data.userPosts;
};

export const fetchtFavoritePosts = async () => {
  const { data } = await api.get('/users/favoritePosts');
  checkForError(data);

  return data.data.favorites;
};

export const addPostToUserFavourite = async (postId: string) => {
  const { data } = await api.post(`/posts/${postId}`);
  checkForError(data);

  return data.data.user.favorites;
};

export const postCreatePost = async (data: FormData) => {
  await axios.post(`${apiUrl}/posts`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });
};
