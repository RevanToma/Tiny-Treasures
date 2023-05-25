import { FC, useState, useEffect, Dispatch } from 'react';
import Button from '../../../components/common/Button/Button.component';
import { IGivePreviewFormData } from '../give.types';
import { Post } from '../../../types';
import PostCardLarge from '../../../components/common/PostCardLarge/PostCardLarge.component';
import Box from '../../../components/common/Box/Box';
import { ButtonType } from '../../../components/common/Button/button.types';
import { useCreateNewPost } from '../../../hooks/useCreateNewPost';
import * as S from './givePreview.styles';

interface GivePreviewProps {
  formData: IGivePreviewFormData;
  setShowPreview: Dispatch<React.SetStateAction<boolean>>;
}

const GivePreview: FC<GivePreviewProps> = ({ formData, setShowPreview }) => {
  const [imgSrcArray, setImgSrcArray] = useState<string[]>([]);
  const [postData, setPostData] = useState<Post | null>(null);

  const mutation = useCreateNewPost();

  const createPostData = (): Post => {
    const post = {
      ...formData,
      id: '',
      createdAt: new Date(Date.now()).toString(),
      location: {
        city: 'Stockholm',
      },
      images: imgSrcArray,
      itemCount: parseInt(formData.itemCount),
    };
    return post;
  };

  useEffect(() => {
    if (!formData) return;

    const newPostData = createPostData();
    setPostData(newPostData);
  }, [imgSrcArray]);

  useEffect(() => {
    if (!formData.images) return;

    const promises: Promise<string>[] = [];

    formData.images.forEach(img => {
      const reader = new FileReader();

      if (!img || !img.type.startsWith('image/')) return;

      promises.push(
        new Promise(resolve => {
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result);
          };
          reader.readAsDataURL(img);
        })
      );

      Promise.all(promises).then(results => {
        setImgSrcArray(results);
      });
    });
  }, [formData.images]);

  // const createPost = (e: FormEvent<HTMLFormElement>): void => {
  //   e.preventDefault();
  //   console.log('SUBMIT');

  //   const form = new FormData();
  //   imgFilesRef.current.forEach(file => {
  //     form.append('photos', file);
  //   });
  //   form.append('title', title);
  //   form.append('description', description);
  //   form.append('mainCategory', group);
  //   categories.forEach(category => {
  //     form.append('subCategories', category);
  //   });
  //   form.append('age', age);
  //   sizes.forEach(size => {
  //     form.append('size', size);
  //   });
  //   form.append('itemCount', itemCount);
  //   form.append('condition', condition);
  //   // for (const [key, value] of form.entries()) {
  //   //   console.log(key, value);
  //   // }
  //   // mutation.mutate(form);
  // };

  return (
    <S.Wrapper gap="5rem">
      <h1>Review Item</h1>
      {postData && <PostCardLarge post={postData} />}
      <Box flexDirection="row" justifyContent="center" gap="3rem">
        <Button
          onClick={() => setShowPreview(false)}
          buttonType={ButtonType.SmallYellow}
        >
          Edit
        </Button>
        <Button buttonType={ButtonType.SmallGreen}>Publish</Button>
      </Box>
    </S.Wrapper>
  );
};

export default GivePreview;
