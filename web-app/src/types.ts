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
  error: string | null;
  errorCode: number | null;
}
export type SignInInfo = {
  email: string;
  password: string;
};
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}
export interface SignUpInfo {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
