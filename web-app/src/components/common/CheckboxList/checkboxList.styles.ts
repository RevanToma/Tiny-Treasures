import styled from 'styled-components';
import { CheckboxSizes } from '../../../routes/Category/FilterPopup/FilterPopup.component';
import Box from '../Box/Box';
import {
  filterCheckboxLarge,
  filterCheckboxSmall,
  selectedStyle,
  theme,
} from '../../../styles/themes';

interface CheckboxContainerProps {
  size: CheckboxSizes;
  selected: boolean | undefined;
}

export const Wrapper = styled(Box)`
  h2 {
    ${theme.type.h5}
  }
`;

export const CheckboxContainer = styled.div<CheckboxContainerProps>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ size }) =>
    size === CheckboxSizes.Small ? filterCheckboxSmall : filterCheckboxLarge}
  ${({ selected }) => selected && selectedStyle} 

  input {
    position: absolute;

    width: 100%;
    height: 100%;

    opacity: 0;
  }

  p {
  }
`;
