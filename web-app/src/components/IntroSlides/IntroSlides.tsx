import React from "react";
import { useState } from "react";
import * as S from "./styled";
import Box from "../common/Box/Box";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type IIntroSlidesArr = {
  img: string;
  title: string;
  description: string;
}[];

const introSlidesArr: IIntroSlidesArr = [
  {
    img: "/FirstIntroSlide.png",
    title: "1. Post item on Tiny Treasures",
    description:
      "Create an account and post an ad with a picture and description of the item you want to donate.",
  },
  {
    img: "/SecondIntroSlide.png",
    title: "2. Wait for pickup",
    description:
      "When someone is interested in picking up your item, they can send you a message through Tiny Treasures. You will agree on a time and place to carry out the exchange.",
  },
  {
    img: "/ThirdIntroSlide.png",
    title: "3. Receive Your credit",
    description:
      "When someone is interested in picking up your item, they can send you a message through Tiny Treasures. You will agree on a time and place to carry out the exchange",
  },
  {
    img: "/FourthIntroSlide.png",
    title: "4. Use your credit",
    description:
      "Now you can use your credit to select and pick up new items that you find on Tiny Treasures.",
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

  const chevronSize = 20;

  const currentSlide = introSlidesArr.map(({ img, title, description }, i) => {
    const current = i === index;
    return (
      <S.Slide key={i} current={current}>
        <Box flexDirection="row" justifyContent="space-between" width="100%">
          <S.FirstNavBtn isFirst={isFirst} onClick={goToPrevious}>
            <FaChevronLeft
              size={chevronSize}
              color={isFirst ? "gray" : "black"}
              name="previous"
              disabled={index === 0}
            />
          </S.FirstNavBtn>
          <S.Image src={img} />
          <S.SecondNavBtn isLast={isLast} onClick={goToNext}>
            <FaChevronRight
              size={chevronSize}
              color={isLast ? "gray" : "black"}
              disabled={index === introSlidesArr.length - 1}
              name="next"
            />
          </S.SecondNavBtn>
        </Box>

        <S.SubHeader>{title}</S.SubHeader>
        <S.Description>{description}</S.Description>
      </S.Slide>
    );
  });

  return (
    <S.SlideContainer>
      <S.Header>How does it work?</S.Header>
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
