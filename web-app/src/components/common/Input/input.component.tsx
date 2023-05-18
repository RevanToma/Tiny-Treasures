import { FC } from "react";
import * as S from "./input.styles";

interface IInput {
  placeholder: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  padding?: string;
}

const Input: FC<IInput> = ({
  placeholder,
  type,
  onChange,
  value,
  name,
  padding,
}) => {
  return (
    <S.StyledInput
      padding={padding}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      name={name}
    />
  );
};

export default Input;
