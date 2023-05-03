export type IMessage = {
  senderId: string;
  text: string;
  receiverId: string;
  sentByMe?: boolean;
  createdAt?: Date;
  _id?: string;
};

export type IChatRoom = {
  members: string[];
  messages: IMessage[];
  _id: string;
};
export interface UserState {
  user: object;
  isLoading: boolean;
  error: null;
}
export type SignInInfo = {
  email: string;
  password: string;
};
