import { ReactNode, FC } from "react";
import * as S from "./button.styles";
import { ButtonType } from "./button.types";

export interface ButtonProps {
  buttonType: ButtonType;
  children: ReactNode;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  buttonType = ButtonType.Primary,
  onClick,
  children,
  isLoading,
  disabled,
}) => {
  return (
    <S.StyledButton
      onClick={onClick}
      buttonType={buttonType}
      disabled={disabled}
    >
      {isLoading ? (
        <S.StyledButtonSpinner>
          <S.ButtonSpinner />
        </S.StyledButtonSpinner>
      ) : (
        children
      )}
    </S.StyledButton>
  );
};

export default Button;
