import { FC } from 'react';
import { useSelector } from 'react-redux';
import * as S from './checkboxList.styles';
import { CheckboxSizes } from '../../../routes/Group/FilterPopup/FilterPopup.component';
import { selectTempQueryData } from '../../../store/query/query.selectors';
import Box from '../Box/Box';
import { getQueryDataName } from './checkboxList.helpers';

interface CheckboxListProps {
  label?: string;
  name: string;
  items: string[];
  size: CheckboxSizes;
  getIsChecked: (name: string, item: string) => boolean;
  setOptions: (name: string, item: string, isChecked: boolean) => void;
}

const CheckboxList: FC<CheckboxListProps> = ({
  name,
  label = name,
  items,
  setOptions,
  size,
  getIsChecked,
}) => {
  return (
    <S.Wrapper
      alignItems="center"
      gap="3rem"
      // padding="2rem"
    >
      <h2>{label}</h2>
      <Box
        display="grid"
        gridTemplateColumns={
          size === CheckboxSizes.Small ? 'repeat(3, 1fr)' : '1fr 1fr'
        }
        columnGap="2rem"
        rowGap="2.4rem"
        width="fit-content"
      >
        {items &&
          items.map(item => (
            <S.CheckboxContainer
              size={size}
              key={item}
              selected={getIsChecked(name, item)}
            >
              <input
                onChange={e =>
                  setOptions(getQueryDataName(name), item, e.target.checked)
                }
                key={item}
                name={item}
                type="checkbox"
                checked={getIsChecked(name, item)}
                // checked={tempQueryData[getQueryDataName()].includes(item)}
              />

              <p>{item}</p>
            </S.CheckboxContainer>
          ))}
      </Box>
    </S.Wrapper>
  );
};

export default CheckboxList;
