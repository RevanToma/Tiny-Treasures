import { FC, useEffect, useState } from 'react';
import * as S from './lightBox.styles';
import { getIndex } from './lightBox.helpers';
import Box from '../Box/Box';
import Button from '../Button/Button.component';
import { ButtonType } from '../Button/button.types';
import { moveToFrontOfArray } from '../../../utils/helpers';

interface LightBoxProps {
  images: string[];
  isReview: boolean;
  setPrimaryImage?: (index: number) => void;
}

const LightBox: FC<LightBoxProps> = ({ images, isReview, setPrimaryImage }) => {
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [imageArray, setImageArray] = useState(images);

  useEffect(() => {
    setCurrentImg(0);
  }, [imageArray]);

  const getImgIndex = (direction: string): number => {
    const lastIndex = images.length - 1;
    return getIndex(direction, currentImg, lastIndex);
  };

  const setImageAsPrimary = () => {
    const newArray = moveToFrontOfArray(currentImg, imageArray) as string[];
    setImageArray(newArray);
    setPrimaryImage(currentImg);
  };

  return (
    <>
      <Box
        // maxWidth="40rem"
        height="30rem"
        margin="0 .4rem"
        alignItems="center"
        justifyContent="center"
        marginBottom="2.4rem"
      >
        <Box width="30rem" position="relative">
          <S.StyledArrowBack
            onClick={() => setCurrentImg(getImgIndex('back'))}
          />
          <S.StyledImg src={imageArray[currentImg]} alt="Items for sale" />
          {isReview && currentImg === 0 && (
            <S.PrimaryLabel>Front Image</S.PrimaryLabel>
          )}
          <S.StyledArrowForward
            onClick={() => setCurrentImg(getImgIndex('forward'))}
          />
        </Box>
      </Box>
      <Box flexDirection="row" gap=".6rem">
        {images.map((img, i) => (
          <S.Breadcrumbs active={currentImg === i} key={i}>
            &nbsp;
          </S.Breadcrumbs>
        ))}
      </Box>
      {isReview && (
        <Box marginTop="2.4rem" gap="2.4rem">
          <Box width="15rem" alignItems="center">
            <p style={{ textAlign: 'center' }}>
              Set above image as front image
            </p>
          </Box>
          <Button
            buttonType={
              currentImg === 0 ? ButtonType.Disabled : ButtonType.Secondary
            }
            onClick={setImageAsPrimary}
          >
            Set Image
          </Button>
        </Box>
      )}
    </>
  );
};

export default LightBox;
