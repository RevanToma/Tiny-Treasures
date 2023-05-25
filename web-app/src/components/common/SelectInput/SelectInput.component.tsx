import { useEffect, useState, FC, useRef } from 'react';
import * as S from './selectInput.styles';
import { theme } from '../../../styles/themes';
import { IConvertedChangeData } from '../../../routes/Give/give.types';

interface SelectInputProps {
  optionsArray: string[];
  initialValue: string;
  required: boolean;
  disabled?: boolean;
  name: string;
  previousValue: string;
  handleSelect: (data: IConvertedChangeData) => void;
}

const SelectInput: FC<SelectInputProps> = ({
  handleSelect,
  optionsArray,
  initialValue,
  previousValue,
  name,
  ...otherProps
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!previousValue || previousValue === '' || !inputRef.current) return;

    setValue(previousValue);
  }, [previousValue, inputRef.current]);

  useEffect(() => {
    if (!inputRef.current || !hiddenInputRef.current || value === '') return;
    inputRef.current.value = value;
    hiddenInputRef.current.value = value;
  }, [value]);

  const handleOptionSelect = (option: string): void => {
    const data = {
      name,
      value: option,
    };
    setValue(option);
    handleSelect(data);
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
      <S.BoxExtended
        onClick={handleToggleMenu}
        open={isMenuOpen}
        position="relative"
        gap="0.5rem"
        width="100%"
      >
        <S.StyledSelect
          ref={inputRef}
          type="text"
          placeholder={initialValue}
          readOnly
          {...otherProps}
        />
        <S.StyledSelect
          ref={hiddenInputRef}
          type="text"
          className="hidden-input"
          placeholder={initialValue}
          {...otherProps}
        />

        <S.StyledCaretDown size={24} color={theme.color.black} />

        {isMenuOpen && (
          <ul>
            {optionsArray.map(option => (
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
