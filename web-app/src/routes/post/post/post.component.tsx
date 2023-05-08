import { useParams } from "react-router-dom";
import { usePost } from "../../../hooks/usePost";
import Spinner from "../../../components/common/spinner/spinner.component";
import Box from "../../../components/common/Box/Box";
import * as S from "./styled";
import ImageCarousel from "../ImageCarousel/ImageCarousel";

const Post = () => {
  const { id } = useParams();
  const postId = id ?? "";

  const { data: post, isLoading, error } = usePost(postId);
  if (isLoading && postId) return <Spinner />;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!post) return null;

  const { images, title, description, condition, createdAt } = post;

  return (
    <Box gap="20px" padding="20px">
      <ImageCarousel images={images} />
      <h1>{title}</h1>
      <p>{description}</p>
    </Box>
  );
};

export default Post;
