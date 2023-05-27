import { useEffect, useState } from 'react';
import { fetchtFavoritePosts } from '../../../api/requests';
import Box from '../../../components/common/Box/Box';
import GoBackNav from '../../../components/common/GoBackNav/GoBackNav.component';
import PostList from '../../../components/common/PostList/PostList.component';

const MyFavourites: React.FC = () => {
  const [favPosts, setFavPosts] = useState([]);

  useEffect(() => {
    const fetchFav = async () => {
      const fav = await fetchtFavoritePosts();
      setFavPosts(fav);
    };

    fetchFav();
  }, []);

  return (
    <Box width="100%">
      <GoBackNav title="My Favourites" />
      <Box>
        {favPosts.length > 0 ? (
          <PostList posts={favPosts} />
        ) : (
          <h3>No favourites posts.</h3>
        )}
      </Box>
    </Box>
  );
};

export default MyFavourites;
