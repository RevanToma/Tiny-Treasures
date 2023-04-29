export type IMessage = {
  senderId: string;
  text: string;
  chatRoomId: string;
  sentByMe?: boolean;
  _id: "";
  createdAt?: Date;
};

export type IChatRoom = {
  members: IChatMembers;
  messages: IMessage[];
  _id: string;
};

export type IChatMembers = {
  userId: string;
  recieverId: string;
};
