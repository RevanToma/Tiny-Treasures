import * as S from "./CheckBox.styles";
import { checkBox } from "../../../types";

const CheckBox: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  checked,
  onChange,
  label,
}: checkBox) => {
  return (
    <S.CheckboxContainer>
      <div />
      <input
        onChange={onChange}
        type="checkbox"
        checked={checked}
        aria-label={label}
      />
      <label htmlFor={label}>{label}</label>
    </S.CheckboxContainer>
  );
};

export default CheckBox;
