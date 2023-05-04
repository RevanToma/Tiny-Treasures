import React from "react";
import * as S from "./styled";

type BoxProps = {
  children?: any;
  className?: string;
  flexDirection?: "row";
  gap?: string;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "initial"
    | "inherit";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  alignItems?:
    | "stretch"
    | "center"
    | "flex-start"
    | "flex-end"
    | "baseline"
    | "initial"
    | "inherit";
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number;
  flex?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
};

const Box: React.FC<BoxProps> = ({ ...props }) => {
  return <S.Div {...props}>{props.children}</S.Div>;
};

export default Box;

<Box margin="23" flexDirection="row"></Box>;
