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
    console.log("ge");
    setIndex(index + 1);
  };

  const goToPrevious = () => {
    setIndex(index - 1);
  };

  const imageList = images.map((image, i) => {
    const current = i === index;
    return <S.Image current={current} src={image} />;
  });

  return (
    <Box flexDirection="row" justifyContent="center" alignItems="center">
      <button onClick={goToPrevious} name="previous" disabled={index === 0}>
        previous
      </button>
      <Box flexDirection="row">{imageList}</Box>
      <button
        disabled={index === imageList.length - 1}
        onClick={goToNext}
        name="next"
      >
        next
      </button>
    </Box>
  );
};

export default ImageCarousel;
