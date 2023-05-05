import { FC } from "react";
import * as S from "./input.styles";
import { InputType } from "./input.types";

interface IInput {
    placeholder: string,
    type: InputType,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input : FC<IInput> = ({placeholder, type = InputType.text, onChange}) => {
    return (
        <S.StyledInput placeholder={placeholder} type={type} onChange={onChange}/>
    )
}

export default Input;