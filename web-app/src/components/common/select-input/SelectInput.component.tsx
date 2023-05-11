import { useEffect, useState, FC, useRef } from "react";
import * as S from "./selectInput.styles";

interface SelectInputProps {
  optionsArray: string[];
  initialValue: string;
  label?: string;
  handleSelect: (option: string) => void;
  required?: boolean;
}

const SelectInput: FC<SelectInputProps> = ({
  handleSelect,
  optionsArray,
  initialValue,
  label,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>(initialValue);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleOptionSelect = (option: string): void => {
    setValue(option);
    handleSelect(option);
    setIsMenuOpen(false);
  };

  const handleToggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <S.BoxExtended open={isMenuOpen} position="relative" gap="0.5rem">
        <label htmlFor={label}>{label}</label>
        <input
          ref={inputRef}
          type="text"
          onClick={handleToggleMenu}
          id={label}
          name={label}
          value={value}
          readOnly
        />
        {isMenuOpen && (
          <ul>
            {optionsArray.map((option) => (
              <li key={option} onClick={() => handleOptionSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </S.BoxExtended>
      {isMenuOpen && <S.Modal onClick={() => setIsMenuOpen(false)}></S.Modal>}
    </>
  );
};

export default SelectInput;
