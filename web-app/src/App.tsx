import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./routes/signUp/signUp.component";
import Home from "./routes/home/home.component";
import Post from "./routes/post/post.component";
import Profile from "./routes/profile/profile.component";
import Layout from "./routes/layout/Layout";
import { lazy, Suspense, useEffect } from "react";
import Spinner from "./components/common/spinner/spinner.component";
import { useSelector } from "react-redux";
import { selectUser } from "./store/user/userSelectors";
import { useAppDispatch } from "./hooks/useDispatch";
import { setSignedIn } from "./store/user/userSlice";
import { PersistGate } from "redux-persist/integration/react";

const SignIn = lazy(() => import("./routes/signUp/signUp.component"));
const Chat = lazy(() => import("./routes/chat/chat.component"));

function App() {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Object.keys(user.email).length > 0) {
      dispatch(setSignedIn(true));
    }
  }, [user, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="profile" element={<Profile />} />
              <Route path="post/:id" element={<Post />} />
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
