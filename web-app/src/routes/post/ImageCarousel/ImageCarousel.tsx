import React from "react";
import Box from "../../../components/common/Box/Box";
import { useState } from "react";
import * as S from "./styled";

type ImageCarouselProps = {
  images: string[];
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [index, setIndex] = useState(0);

  const goToNext = () => {
    setIndex(index + 1);
  };

  const goToPrevious = () => {
    setIndex(index - 1);
  };

  const imageList = images.map((image, i) => {
    return <S.Image current={i === index} src={image} alt="" />;
  });

  return (
    <Box>
      <button onClick={goToNext} name="previous" disabled={index === 0}>
        previous
      </button>
      <Box flexDirection="row">{imageList}</Box>
      <button
        disabled={index === imageList.length - 1}
        onClick={goToPrevious}
        name="next"
      >
        next
      </button>
    </Box>
  );
};

export default ImageCarousel;
