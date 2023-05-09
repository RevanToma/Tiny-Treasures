import axios, { AxiosResponse } from "axios";
import {
  IChatRoom,
  Post,
  PostQueryResult,
  SignInInfo,
  SignUpInfo,
} from "../types";
import api from "./index";
import { useMutation } from "@tanstack/react-query";

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

const baseUrl = "http://localhost:8000/api/v1";

export const checkForError = (
  data: ResponseWithData<Post[] | PostQueryResult[]> | ResponseWithError
): void => {
  if (data.status === "error" || data.status === "fail") {
    throw new Error("Something went wrong!");
  }
};

export const fetchChats = async (id: any) => {
  const { data } = await api.get<IChatRoom[]>(`/chat/${id}`);
  return data;
};

export const ApiPostSignInUser = async ({ email, password }: SignInInfo) => {
  const { data } = await api.post("/users/signin", {
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
  const { data } = await api.post("users/signup", {
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
  query = "",
}: getPostParams): Promise<PostQueryResult> => {
  const limit = 10;
  const data: AxiosResponse<ResponseWithData<PostQueryResult[]>> =
    await api.get(`posts/?page=${pageParam}&limit=${limit}&${query}`);
  checkForError(data.data);
  return data.data.data.data[0];
};

export const fetchPostById = async (id: string) => {
  const { data } = await api.get(`/posts/${id}`);
  checkForError(data);
  const post: Post = data.data.post[0];
  return post;
};

export interface CreatePostData {
  title: string;
  description: string;
  category: string;
  image?: File | null;
  itemCount: number;
  size: string;
  mainCategory: string;
  subCategory: string;
  condition: string;
}

export const createPost = async (postData: CreatePostData) => {
  const formData = new FormData();
  formData.append("title", postData.title);
  formData.append("description", postData.description);
  formData.append("itemCount", postData.itemCount.toString());
  formData.append("size", postData.size);
  formData.append("mainCategory", postData.mainCategory);
  formData.append("subCategory", postData.subCategory);
  formData.append("condition", postData.condition);

  if (postData.image !== undefined && postData.image !== null) {
    formData.append("image", postData.image);
  }

  const { data } = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useCreateNewPost = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      await api.post("/posts", data);
    },
  });
};
