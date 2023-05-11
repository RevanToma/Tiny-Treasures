import { ReactNode, FC } from "react";
import * as S from "./button.styles";
import { ButtonType } from "./button.types";

export interface ButtonProps {
  buttonType: ButtonType;
  children: ReactNode;

  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: FC<ButtonProps> = ({
  buttonType = ButtonType.Primary,
  onClick,
  children,
}) => {
  return (
    <S.StyledButton onClick={onClick} buttonType={buttonType}>
      {children}
    </S.StyledButton>
  );
};

export default Button;
