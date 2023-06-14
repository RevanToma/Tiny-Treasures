import { FC } from 'react';
import { theme } from '../../../../styles/themes';
import * as S from './groupCard.styles';
import Box from '../../../../components/common/Box/Box';

interface GroupCardProps {
  image: string;
  age: string;
  onClick: (age: string) => void;
}

const GroupCard: FC<GroupCardProps> = ({ image, age, onClick }) => {
  return (
    <S.Wrapper
      width="100%"
      height="16rem"
      borderRadius={theme.radius.image}
      cursor="pointer"
      backgroundColor="#fff"
      margin="1rem 0"
      onClick={() => onClick(age)}
      boxShadow="2px 4px 14px rgba(0, 0, 0, 0.2)"
    >
      <S.ImageBox url={image}></S.ImageBox>
      <Box alignItems="center" justifyContent="center" height="30%">
        <p>{age} years</p>
      </Box>
    </S.Wrapper>
  );
};

export default GroupCard;
