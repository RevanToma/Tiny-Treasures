import React, { ReactNode } from 'react';
import * as S from './styled';

type BoxProps = {
  display?: 'grid' | 'flex' | 'block' | 'inline-block' | 'none';
  gridTemplateColumns?: string;
  children?: ReactNode;
  className?: string;
  flexDirection?: 'row';
  gap?: string;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'initial'
    | 'inherit';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  alignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit';
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
  cursor?: string; // FIXME:
  objectFit?: string; // FIXME:
  overflow?: string; // FIXME:
  objectPosition?: string; // FIXME:
  position?: string; // FIXME:
  backgroundColor?: string;
  borderRadius?: string;
  boxShadow?: string;
  ref?: React.RefObject<HTMLDivElement>;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const Box: React.FC<BoxProps> = ({ ...props }) => {
  return <S.Div {...props}>{props.children}</S.Div>;
};

export default Box;
