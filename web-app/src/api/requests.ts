import { IChatRoom } from "../types";
import api from "./index";
export const fetchChats = async (id: string) => {
  const { data } = await api.get<IChatRoom[]>(`/chat/${id}`);
  return data;
};

export const logInUser = async (email: string, password: string) => {
  const { data } = await api.post("/users/signin", {
    email,
    password,
  });
  return data;
};
