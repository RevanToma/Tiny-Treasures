import { IChatRoom } from "../types";
import api from "./index";
export const fetchChats = async (id: string) => {
  const { data } = await api.get<IChatRoom[]>(`/chat/${id}`);
  return data;
};
