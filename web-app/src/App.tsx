import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./routes/chat/chat.component"
import SignIn from "./routes/signIn/signIn.component";
import SignUp from "./routes/signUp/signUp.component";
import Home from "./routes/home/home.component";
import Post from "./routes/post/post.component";
import Profile from "./routes/profile/profile.component";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="profile" element={<Profile />} />
        <Route path="post/:id" element={<Post />} />
        <Route path="chat" element={<Chat />} />
        <Route path="*" element={<div>404 NOT FOUND</div>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
