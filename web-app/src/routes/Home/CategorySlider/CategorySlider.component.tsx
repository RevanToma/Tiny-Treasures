import { FC } from 'react';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import CategoryCard from './CategoryCard/CategoryCard.component';
import * as S from './categorySlider.styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { imgUrls } from '../../../utils/urls/imgUrls';
import Box from '../../../components/common/Box/Box';
import { capitalize } from '../../../utils/helpers';
import {
  initialQueryData,
  setQuery,
  setQueryData,
} from '../../../store/query/querySlice';
import { Enum } from '../../../types';

interface CategorySliderProps {
  category: string;
  enums: Enum;
}

const ages = ['0-3', '4-7', '8-11'];

const CategorySlider: FC<CategorySliderProps> = ({ category, enums }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const capitalCategory = capitalize(category);

  const handleGoToCategory = () => {
    const newQuery = `mainCategory=${capitalCategory}`;
    dispatch(setQuery(newQuery));
    dispatch(setQueryData({ ...initialQueryData, MainCategories: [category] }));

    navigate(`/category/${category}`);
  };

  const handleGoToCategoryAndAge = (age: string): void => {
    const newQuery = `mainCategory=${capitalCategory}&age=${age}`;
    dispatch(setQuery(newQuery));
    dispatch(
      setQueryData({
        ...initialQueryData,
        Age: [age],
      })
    );

    navigate(`/category/${category}`);
  };

  return (
    <S.Wrapper>
      <Box gap="2.4rem" alignItems="center">
        <S.CategoryTitle>{capitalize(category)}</S.CategoryTitle>
        <p>Choose an age group</p>
        <Box gap="1rem" flexDirection="row">
          {ages.map((age, i) => (
            <CategoryCard
              key={age}
              image={imgUrls.categories[category][i]}
              age={age}
              onClick={handleGoToCategoryAndAge}
            />
          ))}
        </Box>
        <p>or</p>
        <Button onClick={handleGoToCategory} buttonType={ButtonType.Primary}>
          Show All {capitalize(category)}
        </Button>
      </Box>
    </S.Wrapper>
  );
};

export default CategorySlider;
