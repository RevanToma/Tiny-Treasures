import axios, { AxiosResponse } from "axios";
import {
  Enum,
  IChatRoom,
  LocationData,
  Post,
  PostQueryResult,
  SignInInfo,
  SignUpInfo,
} from "../types";
import api from "./index";
import { serverRoute } from "../utils/urls/serverUrls";

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
  if (data.status === "error" || data.status === "fail") {
    throw new Error("Something went wrong!");
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
  confirmEmail,
  password,
  passwordConfirm,
}: SignUpInfo) => {
  const { data } = await api.post("users/signup", {
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
  query = "",
}: getPostParams): Promise<PostQueryResult> => {
  const limit = 20;
  const data: AxiosResponse<ResponseWithData<PostQueryResult[]>> =
    await api.get(`posts/?page=${pageParam}&limit=${limit}&${query}`);
  checkForError(data.data);
  return data.data.data.data[0];
};

export const fetchPostById = async (id: string | undefined) => {
  const { data } = await api.get(`/posts/${id}`);
  checkForError(data);
  const post: Post = data.data.post[0];
  return post;
};

export const signOutUser = async () => {
  await api.post("users/logout");
  return;
};

export const fetchEnums = async () => {
  const data: AxiosResponse<ResponseWithData<Enum[]>> = await api.get(`enums`);
  checkForError(data.data);
  return data.data.data.data[0];
};

export const getUserFromJwt = async () => {
  const { data } = await api.get(serverRoute.checkSignedIn);
  return data;
};

export const patchName = async (newName: string) => {
  const { data } = await api.patch("/users/updateName", { newName });
  checkForError(data);
  return data;
};

export const patchEmail = async (newEmail: string, password: string) => {
  const { data } = await api.patch("/users/updateEmail", {
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
  const { data } = await api.patch("/users/updatePassword", passwordData);
  checkForError(data);
  return data;
};
export const patchLocation = async (locationData: LocationData) => {
  const { data } = await api.patch("/users/updateLocation", locationData);
  checkForError(data);
  return data;
};
export const fetchLocation = async () => {
  const { data } = await api.get("/users/getLocation");
  checkForError(data);
  return data;
};

export const getCityFromCoordinates = async (
  latitude: number,
  longitude: number
) => {
  const res = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=50886d99f1c442bc9e7276e71131cf35`
  );

  const components = res.data.results[0].components;

  return components;
};
export const getCoordinatesFromCity = async (cityName: string) => {
  const res = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=50886d99f1c442bc9e7276e71131cf35`
  );
  const geometry = res.data.results[0].geometry;
  console.log("GEO", geometry);
  return geometry;
};
