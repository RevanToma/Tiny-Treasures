interface User {
  socket_id: string;
  name: string;
  user_id: string;
  room_id: string;
}

const users: User[] = [];

const addUser = ({
  socket_id,
  name,
  user_id,
  room_id,
}: User): { error?: string; user?: User } => {
  const exist = users.find(
    (user) => user.room_id === room_id && user.user_id === user_id
  );
  if (exist) {
    return { error: "User already exist in this room" };
  }
  const user: User = { socket_id, name, user_id, room_id };
  users.push(user);
  console.log("users list", users);
  return { user };
};

const removeUser = (socket_id: string): User | undefined => {
  const index = users.findIndex((user) => user.socket_id === socket_id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUser = (socket_id: string): User | undefined =>
  users.find((user) => user.socket_id === socket_id);

export { addUser, removeUser, getUser };
