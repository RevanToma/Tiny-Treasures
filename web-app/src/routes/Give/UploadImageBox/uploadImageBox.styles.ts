import styled from 'styled-components';
import Box from '../../../components/common/Box/Box';
import { theme } from '../../../styles/themes';

export const Wrapper = styled(Box)`
  p {
    ${theme.type.body}
    color: ${theme.color.black};
    text-align: center;
    width: 65%;
    margin-bottom: 2.4rem;
  }

  #upload-item {
    ${theme.type.h6}
    color: ${theme.color.placeholderText};
  }

  .remove-icon {
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    height: 2.4rem;
    width: 2.4rem;

    color: ${theme.color.black};
    background-color: rgba(255, 255, 255, 0.8);
    font-size: 2rem;
    font-weight: 700;

    border-radius: 0 8px 0 4px;
  }
`;

export const ImagePreviewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1.6rem;
  max-height: 16rem;
  overflow-x: scroll;
  margin-bottom: 2.4rem;

  &::-webkit-scrollbar {
    display: none;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: ${theme.radius.image};
  }

  .img-box {
    min-height: 10rem;
    width: 10rem;
    border-radius: ${theme.radius.image};
    position: relative;
  }
`;

export const ImagePreviewBoxMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: ${theme.radius.image};
  }

  div:not(.remove-icon) {
    width: 23rem;
    border-radius: ${theme.radius.image};
    position: relative;
    margin: 3rem 0;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

interface IImagePreviewBoxWrapper {
  isGap: boolean;
}

export const ImagePreviewBoxWrapper = styled.div<IImagePreviewBoxWrapper>`
  display: flex;
  justify-content: center;
  gap: ${({ isGap }) => (isGap ? '1.6rem' : '0')};
`;
