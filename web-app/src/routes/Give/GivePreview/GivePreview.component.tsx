import { FC, useState, useEffect, Dispatch, MouseEvent } from 'react';
import Button from '../../../components/common/Button/Button.component';
import { IGivePreviewFormData } from '../give.types';
import { IReviewPost } from '../../../types';
import PostCardLarge from '../../../components/common/PostCardLarge/PostCardLarge.component';
import Box from '../../../components/common/Box/Box';
import { ButtonType } from '../../../components/common/Button/button.types';
import { useCreateNewPost } from '../../../hooks/useCreateNewPost';
import * as S from './givePreview.styles';
import { moveToFrontOfArray } from '../../../utils/helpers';

interface GivePreviewProps {
  formData: IGivePreviewFormData;
  setShowPreview: Dispatch<React.SetStateAction<boolean>>;
}

const GivePreview: FC<GivePreviewProps> = ({ formData, setShowPreview }) => {
  const [imgSrcArray, setImgSrcArray] = useState<string[]>([]);
  const [postData, setPostData] = useState<IReviewPost | null>(null);

  const mutation = useCreateNewPost();

  const createPostData = (): IReviewPost => {
    const post = {
      ...formData,
      createdAt: new Date(Date.now()).toString(),
      location: {
        city: 'Stockholm',
      },
      images: imgSrcArray,
      itemCount: parseInt(formData.itemCount),
      distance: 0,
      id: '',
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

  const createPost = (): void => {
    const {
      images,
      title,
      description,
      group,
      typeOfItems,
      age,
      sizes,
      itemCount,
      condition,
    } = formData;

    const form = new FormData();

    images.forEach(file => {
      form.append('photos', file);
    });
    form.append('title', title);
    form.append('description', description);
    form.append('group', group);
    typeOfItems.forEach(typeOfItem => {
      form.append('typeOfItems', typeOfItem);
    });
    form.append('age', age);
    sizes.forEach(size => {
      form.append('sizes', size);
    });
    form.append('itemCount', itemCount);
    form.append('condition', condition);

    mutation.mutate(form);
  };

  const setPrimaryImage = (index: number) => {
    const newArray = moveToFrontOfArray(index, formData.images) as File[];
    formData.images = newArray;
  };

  return (
    <S.Wrapper gap="5rem">
      <h1>Review Item</h1>
      {postData && (
        <PostCardLarge
          setPrimaryImage={setPrimaryImage}
          isReview={true}
          post={postData}
        />
      )}
      <Box flexDirection="row" justifyContent="center" gap="3rem">
        <Button
          onClick={() => setShowPreview(false)}
          buttonType={ButtonType.SmallYellow}
        >
          Edit
        </Button>
        <Button onClick={createPost} buttonType={ButtonType.SmallGreen}>
          Publish
        </Button>
      </Box>
    </S.Wrapper>
  );
};

export default GivePreview;
