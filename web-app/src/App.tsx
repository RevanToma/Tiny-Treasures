import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./routes/signUp/signUp.component";
import Home from "./routes/home/home.component";
import Post from "./routes/post/post.component";
import Profile from "./routes/profile/profile.component";
import Layout from "./routes/layout/Layout";
import { lazy, Suspense, useEffect } from "react";
import Spinner from "./components/common/spinner/spinner.component";
import { useSelector } from "react-redux";
import { selectCurrentChatRoom, selectUser } from "./store/user/userSelectors";
import { Socket, socket } from "./Sockets/Message.socket";
import Posts from "./routes/posts/posts.component";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useQueryClient } from "@tanstack/react-query";
import { fetchChats } from "./api/requests";
import { IMessage } from "./types";

const SignIn = lazy(() => import("./routes/signUp/signUp.component"));
const Chat = lazy(() => import("./routes/chat/chat.component"));
const AccountSettings = lazy(
  () => import("./routes/settings/AccountSettings.component")
);
function App() {
  const userId = useSelector(selectUser);
  const currentChatRoom = useSelector(selectCurrentChatRoom);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (userId._id) {
      Socket.init(userId._id);
      socket().on("chat-message", (data: IMessage) => {
        if (data.roomId !== currentChatRoom?._id || !currentChatRoom) {
          queryClient.invalidateQueries([fetchChats.name]);
        }
      });
    }
  }, [userId._id, currentChatRoom, queryClient]);

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="account" element={<AccountSettings />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="profile" element={<Profile />} />
              <Route path="post/:id" element={<Post />} />
              <Route path="posts/:startQuery" element={<Posts />} />
              <Route path="chat" element={<Chat />} />
              <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
