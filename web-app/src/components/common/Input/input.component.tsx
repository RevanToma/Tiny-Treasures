import { FC } from "react";
import * as S from "./input.styles";

interface IInput {
  placeholder: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  padding?: string;
  readOnly?: boolean;
}

const Input: FC<IInput> = ({
  placeholder,
  type,
  onChange,
  value,
  name,
  padding,
  readOnly,
}) => {
  return (
    <S.StyledInput
      padding={padding}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      name={name}
      readOnly={readOnly}
    />
  );
};

export default Input;
