import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/usePost";
import Spinner from "../../components/common/spinner/spinner.component";

const Post = () => {
  const { id } = useParams();
  const postId = id ?? "";

  const { data: post, isLoading, error } = usePost(postId);
  if (isLoading && postId) return <Spinner />;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!post) return null;

  return (
    <div>
      <h1>Post</h1>
    </div>
  );
};

export default Post;
