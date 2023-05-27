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
`;

export const ImagePreviewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2.4rem;
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
`;

export const FileInput = styled.input`
  display: none;
`;
