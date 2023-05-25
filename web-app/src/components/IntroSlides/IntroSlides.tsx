import React from "react";

import { useState } from "react";
import * as S from "./styled";
import Box from "../common/Box/Box";

type IIntroSlidesArr = {
  title: string;
  description: string;
}[];

const introSlidesArr: IIntroSlidesArr = [
  {
    title: "1. Post item on Tiny Treasures",
    description:
      "Create an account and post an ad with a picture and description of the item you want to donate.",
  },
  {
    title: "2. Wait for pickup",
    description:
      "When someone is interested in picking up your item, they can send you a message through Tiny Treasures. You will agree on a time and place to carry out the exchange.",
  },
  {
    title: "2. Wait for pickup",
    description:
      "When someone is interested in picking up your item, they can send you a message through Tiny Treasures. You will agree on a time and place to carry out the exchange",
  },
  {
    title: "4. Use your credit",
    description:
      "Now you can use your credit to select and pick up new items that you find on Tiny Treasures.",
  },
];

type Props = Record<string, never>;

const ImageCarousel: React.FC<Props> = () => {
  const [index, setIndex] = useState(0);

  const goToNext = () => {
    setIndex(index + 1);
  };

  const goToPrevious = () => {
    setIndex(index - 1);
  };

  const imageList = images.map((image, i) => {
    const current = i === index;
    return <S.Image key={image} current={current} src={image} />;
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
