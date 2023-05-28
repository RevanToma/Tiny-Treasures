import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react';
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
import { useDispatch } from 'react-redux';
import { clearGiveFormValues } from '../../../store/giveFormValues/giveFormValuesSlice';
import { queryClient } from '../../../main';

interface GivePreviewProps {
  formValues: IGivePreviewFormData;
  setFormValues: Dispatch<SetStateAction<IGivePreviewFormData>>;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
}

const GivePreview: FC<GivePreviewProps> = ({
  formValues,
  setFormValues,
  setShowPreview,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgSrcArray, setImgSrcArray] = useState<string[]>([]);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [postData, setPostData] = useState<IReviewPost | null>(null);

  const { mutate, isLoading, isSuccess, isError } = useCreateNewPost();

  const createPostData = (): IReviewPost => {
    const post = {
      ...formValues,
      createdAt: new Date(Date.now()).toString(),
      location: {
        city: 'Stockholm',
      },
      images: imgSrcArray,
      itemCount: parseInt(formValues.itemCount),
      distance: 0,
      _id: '',
    };
    return post;
  };

  useEffect(() => {
    if (!formValues) return;

    const newPostData = createPostData();
    setPostData(newPostData);
  }, [imgSrcArray]);

  useEffect(() => {
    if (!formValues || imgSrcArray.length) return;
    if (!formValues.images.length) {
      setImgSrcArray(formValues.imgUrls);
      return;
    }

    const promises: Promise<string>[] = [];

    formValues.images.forEach(img => {
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
        setFileUrls(results);
        setImgSrcArray([...results, ...formValues.imgUrls]);
      });
    });
  }, [formValues]);

  const createPost = (): void => {
    const form = getFormData(formValues);

    mutate(form);
  };

  const setPrimaryImage = (imageUrl: string) => {
    if (formValues.imgUrls.includes(imageUrl)) {
      const index = formValues.imgUrls.indexOf(imageUrl);
      const newArray = moveToFrontOfArray(
        index,
        formValues.imgUrls
      ) as string[];
      setFormValues({
        ...formValues,
        imgUrls: newArray,
        frontImageArray: 'imgUrls',
      });
    } else if (fileUrls.includes(imageUrl)) {
      console.log('images');

      const index = fileUrls.indexOf(imageUrl);
      const newArray = moveToFrontOfArray(index, formValues.images) as File[];
      setFormValues({
        ...formValues,
        images: newArray,
        frontImageArray: 'images',
      });
    }
  };
  const reset = () => {
    dispatch(clearGiveFormValues);
    queryClient.refetchQueries(['fetchPostById']);
  };

  const goToHome = () => {
    reset();
    navigate('/');
  };

  const resetGive = () => {
    reset();
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
