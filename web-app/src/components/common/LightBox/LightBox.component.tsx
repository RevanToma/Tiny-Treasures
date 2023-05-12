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
    <Box
      position="relative"
      width="90%"
      maxWidth="40rem"
      height="30rem"
      margin="0 .4rem"
      alignItems="center"
      justifyContent="center"
    >
      <S.StyledArrowBack onClick={() => setCurrentImg(getImgIndex('back'))} />
      <Box width="30rem">
        <S.StyledImg src={images[currentImg]} alt="Items for sale" />
      </Box>
      <S.StyledArrowForward
        onClick={() => setCurrentImg(getImgIndex('forward'))}
      />
    </Box>
  );
};

export default LightBox;
