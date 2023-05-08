import { useParams } from "react-router-dom";
import { usePost } from "../../../hooks/usePost";
import Spinner from "../../../components/common/spinner/spinner.component";
import Box from "../../../components/common/Box/Box";
import * as S from "./styled";
import { useState, useEffect } from "react";
import ImageCarousel from "../ImageCarousel/ImageCarousel";

const Post = () => {
  const { id } = useParams();
  const postId = id ?? "";

  const { data: post, isLoading, error } = usePost(postId);
  if (isLoading && postId) return <Spinner />;
  if (error instanceof Error) return <h1>{error.message}</h1>;
  if (!post) return null;

  return (
    <Box>
      <ImageCarousel images={post.images} />
      <h1>{post.title}</h1>
    </Box>
  );
};

export default Post;
