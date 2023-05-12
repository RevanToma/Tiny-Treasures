import { FC } from 'react';
import Box from '../Box/Box';
import PostCardMedium from '../PostCardMedium/PostCardMedium.component';
import { Post } from '../../../types';

interface PostListProps {
  posts: Post[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr" padding="2rem" gap="2rem">
      {posts.map(post => (
        <PostCardMedium key={post._id} post={post} />
      ))}
    </Box>
  );
};

export default PostList;
