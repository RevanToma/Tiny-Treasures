import { ReactNode, FC, ReactElement } from 'react';
import * as S from './button.styles';
import { ButtonType } from './button.types';
import Box from '../Box/Box';

export interface ButtonProps {
  buttonType: ButtonType;
  children: ReactNode;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  iconLeft?: ReactElement;
}

const Button: FC<ButtonProps> = ({
  buttonType = ButtonType.Primary,
  onClick,
  children,
  isLoading,
  disabled,
  iconLeft,
  ...otherProps
}) => {
  return (
    <S.StyledButton
      onClick={onClick}
      buttonType={buttonType}
      disabled={disabled || buttonType === ButtonType.Disabled}
      {...otherProps}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="1.2rem"
      >
        {iconLeft && !isLoading && iconLeft}
        {isLoading ? (
          <S.StyledButtonSpinner>
            <S.ButtonSpinner />
          </S.StyledButtonSpinner>
        ) : (
          children
        )}
      </Box>
    </S.StyledButton>
  );
};

export default Button;
