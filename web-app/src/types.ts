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
