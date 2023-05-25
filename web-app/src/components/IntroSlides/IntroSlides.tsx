import React from "react";
import { useState } from "react";
import * as S from "./styled";
import Box from "../common/Box/Box";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type IIntroSlidesArr = {
  title: string;
  description: string;
}[];

const introSlidesArr: IIntroSlidesArr = [
  {
    title: "Post item on Tiny Treasures",
    description:
      "1. Create an account and post an ad with a picture and description of the item you want to donate.",
  },
  {
    title: "Wait for pickup",
    description:
      "2. When someone is interested in picking up your item, they can send you a message through Tiny Treasures. You will agree on a time and place to carry out the exchange.",
  },
  {
    title: "Receive Your credit",
    description:
      "3. When someone is interested in picking up your item, they can send you a message through Tiny Treasures. You will agree on a time and place to carry out the exchange",
  },
  {
    title: "Use your credit",
    description:
      "4. Now you can use your credit to select and pick up new items that you find on Tiny Treasures.",
  },
];

type Props = Record<string, never>;

const IntroSlides: React.FC<Props> = () => {
  const [index, setIndex] = useState(0);
  const isFirst = index === 0;
  const isLast = index === introSlidesArr.length - 1;

  const goToNext = () => {
    if (isLast) return;
    setIndex(index + 1);
  };

  const goToPrevious = () => {
    if (isFirst) return;
    setIndex(index - 1);
  };

  const currentSlide = introSlidesArr.map((slide, i) => {
    const current = i === index;
    return (
      <S.Slide key={i} current={current}>
        <S.Header>{slide.title}</S.Header>
        <p>{slide.description}</p>
      </S.Slide>
    );
  });

  const chevronSize = 20;

  return (
    <S.SlideContainer>
      <Box flexDirection="row">
        <S.FirstNavBtn isFirst={isFirst} onClick={goToPrevious}>
          <FaChevronLeft
            size={chevronSize}
            color={isFirst ? "gray" : "black"}
            name="previous"
            disabled={index === 0}
          />
        </S.FirstNavBtn>
        <S.SecondNavBtn isLast={isLast} onClick={goToNext}>
          <FaChevronRight
            size={chevronSize}
            color={isLast ? "gray" : "black"}
            disabled={index === currentSlide.length - 1}
            name="next"
          />
        </S.SecondNavBtn>
      </Box>
      <Box justifyContent="center" width="100%" flexDirection="row">
        {currentSlide}
      </Box>
      <Box flexDirection="row" gap="5px">
        {Array(4)
          .fill(null)
          .map((_, i) => {
            return <S.Dot current={index === i} />;
          })}
      </Box>
    </S.SlideContainer>
  );
};

export default IntroSlides;
