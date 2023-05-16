import { FC } from 'react';

import CategorySlider from './CategorySlider/CategorySlider.component';

import * as S from './home.styles';
import Divider from '../../components/common/Divider/Divider.component';
import Box from '../../components/common/Box/Box';
import { queryClient } from '../../main';
import { Enum } from '../../types';
import { imgUrls } from '../../utils/urls/imgUrls';

const Home: FC = () => {
  const enums: Enum | undefined = queryClient.getQueryData(['enums']);

  return (
    <Box gap="2.4rem">
      <Box width="100%" height="33rem" marginTop="5rem" position="relative">
        <S.HeroImg src={imgUrls.homeMain} alt="Kid on bike" />
        <S.HeroTextBox>
          <h1>Bring new life to old treasures</h1>
          <p>"Swap online! Sustainable exchange for a greater future!"</p>
        </S.HeroTextBox>
      </Box>
      <Box padding="0 3.2rem">
        {enums &&
          enums.main.map((category, i, arr) => (
            <Box key={category}>
              <CategorySlider
                key={category}
                category={category}
                enums={enums}
              />
              {i < arr.length - 1 && <Divider />}
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Home;
