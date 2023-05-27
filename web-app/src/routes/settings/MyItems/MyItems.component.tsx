import { fetchUsersPosts } from '../../../api/requests';
import Box from '../../../components/common/Box/Box';
import GoBackNav from '../../../components/common/GoBackNav/GoBackNav.component';
import { useEffect } from 'react';
import { useState } from 'react';
import { IPost } from './../../../types';
import PostList from '../../../components/common/PostList/PostList.component';

const MyItems: React.FC = () => {
  const [userPosts, setUserPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const getUsersPosts = async () => {
      try {
        const posts = await fetchUsersPosts();
        console.log('FROM MYITEMS', posts);
        setUserPosts(posts);
      } catch (error) {
        console.error('Error fetching user posts:', error);
      }
    };

    console.log(userPosts);
    getUsersPosts();
  }, []);

  return (
    <Box width="100%">
      <GoBackNav title="My Items" />
      <Box>
        {userPosts ? (
          <PostList posts={userPosts} />
        ) : (
          <h3>You have no posts.</h3>
        )}
      </Box>
    </Box>
  );
};

export default MyItems;
