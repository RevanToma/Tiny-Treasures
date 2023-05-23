import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./routes/signUp/signUp.component";
import Profile from "./routes/profile/profile.component";
import Layout from "./routes/layout/Layout";
import { lazy, Suspense, useEffect } from "react";
import Spinner from "./components/common/spinner/spinner.component";
import { useSelector } from "react-redux";
import { selectCurrentChatRoom, selectUser } from "./store/user/userSelectors";
import { Socket, socket } from "./Sockets/Message.socket";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useQueryClient } from "@tanstack/react-query";
import { fetchChats } from "./api/requests";
import { IMessage } from "./types";
import Home from "./routes/Home/Home.route";
import { useEnums } from "./hooks/useEnums";
import Category from "./routes/Category/Category.route";
import SaveUserAndRedirect from "./routes/SaveUserAndRedirect/SaveUserAndRedirect.component";
import { useAppDispatch } from "./hooks/useDispatch";
import { checkForLoggedInUser } from "./store/user/userSlice";

const SignIn = lazy(() => import("./routes/signIn/signIn.component"));
const DisplayedChat = lazy(
  () => import("./components/chat/DisplayedChat/DisplayedChat")
);
const Chat = lazy(() => import("./routes/chat/chat.component"));
const Post = lazy(() => import("./routes/post/Post.component"));
const AccountSettings = lazy(
  () => import("./routes/settings/AccountSettings.component")
);
const ChangeName = lazy(
  () => import("./routes/settings/ChangeName/ChangeName.component")
);
const ChangeEmail = lazy(
  () => import("./routes/settings/ChangeEmail/ChangeEmail.component")
);
const ChangePassword = lazy(
  () => import("./routes/settings/ChangePassword/ChangePassword.component")
);
const Location = lazy(
  () => import("./routes/settings/Location/Location.component")
);
const Notification = lazy(
  () => import("./routes/settings/Notification/Notification.component")
);
const MyItems = lazy(
  () => import("./routes/settings/MyItems/MyItems.component")
);
const MyFavourites = lazy(
  () => import("./routes/settings/MyFavourites/MyFavourites.component")
);
function App() {
  const user = useSelector(selectUser);
  const userId = user?._id;
  // const userId = user?._id;
  const currentChatRoom = useSelector(selectCurrentChatRoom);
  // console.log("FROM APPP", user?.data.user._id);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  useEnums();

  useEffect(() => {
    const refetchChats = () => {
      queryClient.invalidateQueries([fetchChats.name]);
    };
    if (userId) {
      Socket.init(userId);
      socket().on("chat-message", (data: IMessage) => {
        if (data.roomId !== currentChatRoom?._id || !currentChatRoom) {
          refetchChats();
        }
      });
      socket().on("create-chat", refetchChats);
    }
  }, [userId, currentChatRoom, queryClient]);

  useEffect(() => {
    console.log("RELOAD!!!!");

    if (!user) {
      dispatch(checkForLoggedInUser());
    }
  }, []);
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="profile" element={<Profile />} />
              <Route path="post/:id" element={<Post />} />
              <Route path="category/:category" element={<Category />} />
              <Route path="chat" element={<Chat />} />
              <Route path="chat/:roomId/:postId" element={<DisplayedChat />} />
              <Route path="getUser" element={<SaveUserAndRedirect />} />
              <Route path="*" element={<div>404 NOT FOUND</div>} />
            </Route>
            <Route path="account/*" element={<Layout />}>
              <Route index element={<AccountSettings />} />
              <Route path="changeName" element={<ChangeName />} />
              <Route path="changeEmail" element={<ChangeEmail />} />
              <Route path="changePassword" element={<ChangePassword />} />
              <Route path="location" element={<Location />} />
              <Route path="notification" element={<Notification />} />
              <Route path="myItems" element={<MyItems />} />
              <Route path="myFavourites" element={<MyFavourites />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
