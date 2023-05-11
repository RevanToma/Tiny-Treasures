import { FC } from "react";
import * as S from "./input.styles";
import { InputType } from "./input.types";

interface IInput {
  placeholder: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
}

const Input: FC<IInput> = ({ placeholder, type, onChange, value, name }) => {
  return (
    <S.StyledInput
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      name={name}
    />
  );
};

export default Input;
