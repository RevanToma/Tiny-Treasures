import { FC, useEffect } from 'react';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { filterAges, filterItems } from '../group.helpers';
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
import { getQueryDataName } from '../../../components/common/CheckboxList/checkboxList.helpers';

export enum CheckboxSizes {
  Small = 'small',
  Large = 'large',
}

interface FilterPopupProps {
  groupName: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  getFilterResults: () => void;
}

const FilterPopup: FC<FilterPopupProps> = ({
  groupName,
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
      TypeOfItems: [...tempQueryData.TypeOfItems],
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
    console.log(newData);
    dispatch(setTempQueryData(newData));
  };

  const clearFilters = () => {
    dispatch(setTempQueryData(initialQueryData));
  };

  const getIsChecked = (name: string, item: string) => {
    return tempQueryData[getQueryDataName(name)].includes(item);
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
          name="TypeOfItems"
          items={filterItems[capitalize(groupName)]}
          size={CheckboxSizes.Large}
          setOptions={handleOptions}
          getIsChecked={getIsChecked}
        />
        <Divider />
        {groupName === 'clothes' ? (
          filterAges.map(group => (
            <CheckboxList
              key={group.name}
              name={group.name}
              items={group.sizes}
              setOptions={handleOptions}
              size={CheckboxSizes.Small}
              getIsChecked={getIsChecked}
            />
          ))
        ) : (
          <CheckboxList
            name="Age"
            items={ages}
            setOptions={handleOptions}
            size={CheckboxSizes.Small}
            getIsChecked={getIsChecked}
          />
        )}
        <Divider />
        <CheckboxList
          name="Condition"
          items={conditions}
          setOptions={handleOptions}
          size={CheckboxSizes.Small}
          getIsChecked={getIsChecked}
        />
        <Divider />
        <CheckboxList
          name="Sort"
          items={['Most Recent', 'Distance']}
          setOptions={handleOptions}
          size={CheckboxSizes.Large}
          getIsChecked={getIsChecked}
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
