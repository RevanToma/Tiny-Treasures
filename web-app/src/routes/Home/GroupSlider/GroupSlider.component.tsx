import { FC } from 'react';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import CategoryCard from './GroupCard/GroupCard.component';
import * as S from './groupSlider.styles';
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

interface GroupSliderProps {
  group: string;
  enums: Enum;
}

const ages = ['0-3', '4-7', '8-11'];

const GroupSlider: FC<GroupSliderProps> = ({ group }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoToGroup = () => {
    const newQuery = `group=${group}`;
    dispatch(setQuery(newQuery));
    dispatch(setQueryData({ ...initialQueryData, Group: [group] }));

    navigate(`/group/${group}`);
  };

  const handleGoToGroupAndAge = (age: string): void => {
    const newQuery = `group=${group}&age=${age}`;
    dispatch(setQuery(newQuery));
    dispatch(
      setQueryData({
        ...initialQueryData,
        Age: [age],
      })
    );

    navigate(`/group/${group}`);
  };

  return (
    <S.Wrapper>
      <Box gap="2.4rem" alignItems="center">
        <S.CategoryTitle>{capitalize(group)}</S.CategoryTitle>
        <p>Choose an age group</p>
        <Box gap="1rem" flexDirection="row">
          {ages.map((age, i) => (
            <CategoryCard
              key={age}
              image={imgUrls.categories[group][i]}
              age={age}
              onClick={handleGoToGroupAndAge}
            />
          ))}
        </Box>
        <p>or</p>
        <Button onClick={handleGoToGroup} buttonType={ButtonType.Primary}>
          Show All {capitalize(group)}
        </Button>
      </Box>
    </S.Wrapper>
  );
};

export default GroupSlider;
