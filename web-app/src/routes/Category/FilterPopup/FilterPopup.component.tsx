import { FC, useEffect } from 'react';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { filterAges, filterItems } from '../category.helpers';
import { Divider } from '../../Home/home.styles';
import { theme } from '../../../styles/themes';
import {
  selectQueryData,
  selectTempQueryData,
} from '../../../store/query/query.selectors';
import {
  QueryData,
  initialQueryData,
  setTempQueryData,
} from '../../../store/query/querySlice';
import Box from '../../../components/common/Box/Box';
import { CheckboxContainer } from '../../../components/common/CheckboxList/checkboxList.styles';
import CheckboxList from '../../../components/common/CheckboxList/CheckboxList.component';
import { ages, conditions } from '../../../utils/enums';
import { capitalize } from '../../../utils/helpers';

export enum CheckboxSizes {
  Small = 'small',
  Large = 'large',
}

interface FilterPopupProps {
  categoryName: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  getFilterResults: () => void;
}

const FilterPopup: FC<FilterPopupProps> = ({
  categoryName,
  onClick,
  getFilterResults,
}) => {
  const dispatch = useDispatch();
  const queryData = useSelector(selectQueryData);
  const tempQueryData = useSelector(selectTempQueryData);

  useEffect(() => {
    if (!queryData) return;

    dispatch(setTempQueryData(queryData));
  }, [queryData]);

  const getNewQueryData = (): QueryData => {
    return {
      Categories: [...tempQueryData.Categories],
      Sizes: [...tempQueryData.Sizes],
      Age: [...tempQueryData.Age],
      Condition: [...tempQueryData.Condition],
      Sort: [...tempQueryData.Sort],
    };
  };

  const handleOptions = (
    category: string,
    item: string,
    isChecked: boolean
  ) => {
    const newData = getNewQueryData();

    if (category === 'Sort') {
      newData.Sort = [];
    }

    if (isChecked) {
      newData[category].push(item);
    }
    if (!isChecked) {
      const i = newData[category].indexOf(item);
      if (i === -1) return;
      newData[category].splice(i, 1);
    }
    dispatch(setTempQueryData(newData));
  };

  const clearFilters = () => {
    dispatch(setTempQueryData(initialQueryData));
  };

  return (
    <Box
      padding="4rem 1.6rem "
      alignItems="center"
      gap="4.8rem"
      backgroundColor={theme.color.filterGray}
      width="100%"
      maxWidth="40rem"
      height="fit-content"
      position="absolute"
      top="0"
      left="0"
      zIndex={100}
      boxShadow={theme.shadow}
    >
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        padding="0 2.4rem 0 3.6rem"
      >
        <CheckboxContainer
          onClick={clearFilters}
          size={CheckboxSizes.Large}
          selected={false}
        >
          <p>Clear Filter</p>
        </CheckboxContainer>

        <Box
          width="5rem"
          height="5rem"
          onClick={onClick}
          alignItems="center"
          justifyContent="center"
        >
          <FaTimes size={24} />
        </Box>
      </Box>
      <h1>Filter</h1>

      <Box
        gap="4.8rem"
        padding="3.2rem 1.6rem"
        backgroundColor={theme.color.primaryPureWhite}
        borderRadius={theme.radius.image}
      >
        <CheckboxList
          label="Type of Item"
          name="Categories"
          items={filterItems[capitalize(categoryName)]}
          size={CheckboxSizes.Large}
          setOptions={handleOptions}
        />
        <Divider />
        {categoryName === 'clothes' ? (
          filterAges.map(group => (
            <CheckboxList
              key={group.name}
              name={group.name}
              items={group.sizes}
              setOptions={handleOptions}
              size={CheckboxSizes.Small}
            />
          ))
        ) : (
          <CheckboxList
            name="Age"
            items={ages}
            setOptions={handleOptions}
            size={CheckboxSizes.Small}
          />
        )}
        <Divider />
        <CheckboxList
          name="Condition"
          items={conditions}
          setOptions={handleOptions}
          size={CheckboxSizes.Small}
        />
        <Divider />
        <CheckboxList
          name="Sort"
          items={['Most Recent', 'Distance']}
          setOptions={handleOptions}
          size={CheckboxSizes.Large}
        />
      </Box>

      <Box justifyContent="center" alignItems="center">
        <Button onClick={getFilterResults} buttonType={ButtonType.Primary}>
          View Results
        </Button>
      </Box>
    </Box>
  );
};

export default FilterPopup;
