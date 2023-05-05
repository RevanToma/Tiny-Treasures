import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './routes/signUp/signUp.component';
import Home from './routes/home/home.component';
import Post from './routes/post/post.component';
import Profile from './routes/profile/profile.component';
import Layout from './routes/layout/Layout';
import { lazy, Suspense, useEffect } from 'react';
import Spinner from './components/common/spinner/spinner.component';
import { useSelector } from 'react-redux';
import { selectUser } from './store/user/userSelectors';
import { Socket } from './Sockets/Message.socket';
import Posts from './routes/posts/posts.component';
import { GlobalStyles } from './styles/GlobalStyles';

const SignIn = lazy(() => import('./routes/signUp/signUp.component'));
const Chat = lazy(() => import('./routes/chat/chat.component'));

function App() {
  const userId = useSelector(selectUser);

  useEffect(() => {
    if (userId._id) {
      Socket.init(userId._id);
    }
  }, [userId]);
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
