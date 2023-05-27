import { FC, useState, useEffect, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/common/Button/Button.component';
import PostCardLarge from '../../../components/common/PostCardLarge/PostCardLarge.component';
import Box from '../../../components/common/Box/Box';
import Spinner from '../../../components/common/spinner/spinner.component';

import { useCreateNewPost } from '../../../hooks/useCreateNewPost';
import { moveToFrontOfArray } from '../../../utils/helpers';
import { getFormData } from '../give.helpers';

import { IGivePreviewFormData } from '../give.types';
import { IReviewPost } from '../../../types';
import { ButtonType } from '../../../components/common/Button/button.types';

import * as S from './givePreview.styles';

interface GivePreviewProps {
  formData: IGivePreviewFormData;
  setShowPreview: Dispatch<React.SetStateAction<boolean>>;
}

const GivePreview: FC<GivePreviewProps> = ({ formData, setShowPreview }) => {
  const navigate = useNavigate();
  const [imgSrcArray, setImgSrcArray] = useState<string[]>([]);
  const [postData, setPostData] = useState<IReviewPost | null>(null);

  const { mutate, isLoading, isSuccess, isError } = useCreateNewPost();

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
      _id: '',
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
    const form = getFormData(formData);

    mutate(form);
  };

  const setPrimaryImage = (index: number) => {
    const newArray = moveToFrontOfArray(index, formData.images) as File[];
    formData.images = newArray;
  };

  const goToHome = () => {
    navigate('/');
  };

  const resetGive = () => {
    window.location.reload();
  };

  return (
    <>
      {(isLoading || isSuccess) && <S.Overlay></S.Overlay>}

      <S.Wrapper gap="5rem" position="relative">
        {isLoading && (
          <S.Uploading>
            <Spinner size="large" />
            <p>Uploading</p>
          </S.Uploading>
        )}

        {isSuccess && (
          <S.Success>
            <Box>
              <p>Success</p>
              <p>Your item has been published</p>
            </Box>
            <Button onClick={resetGive} buttonType={ButtonType.Secondary}>
              Upload another item
            </Button>
            <Button onClick={goToHome} buttonType={ButtonType.Google}>
              Home
            </Button>
          </S.Success>
        )}

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
    </>
  );
};

export default GivePreview;
