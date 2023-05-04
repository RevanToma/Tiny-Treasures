import { IChatRoom, SignInInfo, SignUpInfo } from "../types";
import api from "./index";

export const fetchChats = async (id: string) => {
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
