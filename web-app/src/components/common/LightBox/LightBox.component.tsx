import { FC, useState } from 'react';
import * as S from './lightBox.styles';
import { getIndex } from './lightBox.helpers';
import Box from '../Box/Box';

interface LightBoxProps {
  images: string[];
}

const LightBox: FC<LightBoxProps> = ({ images }) => {
  const [currentImg, setCurrentImg] = useState<number>(0);

  const getImgIndex = (direction: string): number => {
    const lastIndex = images.length - 1;
    return getIndex(direction, currentImg, lastIndex);
  };

  return (
    <>
      <Box
        maxWidth="40rem"
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
          <S.StyledImg src={images[currentImg]} alt="Items for sale" />
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
    </>
  );
};

export default LightBox;
