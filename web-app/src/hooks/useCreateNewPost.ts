import { useMutation } from '@tanstack/react-query';
import { postCreatePost } from '../api/requests';

export const useCreateNewPost = () => {
  return useMutation({
    mutationFn: postCreatePost,
  });
};
