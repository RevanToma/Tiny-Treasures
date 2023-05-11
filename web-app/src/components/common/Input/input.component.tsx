import { FC } from "react";
import * as S from "./input.styles";
import { InputType } from "./input.types";

interface IInput {
  placeholder?: string;
  type: InputType.text;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
  max?: number;
}

const Input: FC<IInput> = ({
  placeholder,
  type,
  onChange,
  name,
  required,
  min,
  max,
}) => {
  return (
    <S.StyledInput
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      name={name}
      required={required}
      min={min}
      max={max}
    />
  );
};

export default Input;
