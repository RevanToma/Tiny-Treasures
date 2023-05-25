import { FC } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Title } from './goBackNav.styles';
import Box from '../Box/Box';

interface GoBackNavProps {
  title: string;
  size?: number;
}

const GoBackNav: FC<GoBackNavProps> = ({ title, size }) => {
  return (
    <Box
      width="100vw"
      alignItems="center"
      justifyContent="center"
      position="relative"
      padding="2.4rem"
      gap="4.5rem"
    >
      <Box
        position="absolute"
        left="1.2rem"
        top="50%"
        transform="translateY(-50%)"
        justifyContent="center"
        width="6rem"
        height="6rem"
        onClick={() => window.history.back()}
      >
        <FaChevronLeft size={size ? size : 26} color="#646464" />
      </Box>
      <Title color="#646464">{title}</Title>
    </Box>
  );
};

export default GoBackNav;
