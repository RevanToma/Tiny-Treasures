import { FC } from 'react';
import * as S from './groupNavBar.styles';
import { capitalize } from '../../../utils/helpers';

interface IGroupNavBarProps {
  items: string[];
  currentItem: string;
  handleChangeGroup: (item: string) => void;
}

const GroupNavBar: FC<IGroupNavBarProps> = ({
  items,
  currentItem,
  handleChangeGroup,
}) => {
  if (!items) return;
  return (
    <S.Wrapper width="100%" padding="0 2.4rem">
      <ul>
        {items.map(item => {
          const active = currentItem === item;
          return (
            <S.NavItem active={active} key={item}>
              <a onClick={() => handleChangeGroup(item)}>{capitalize(item)}</a>
            </S.NavItem>
          );
        })}
      </ul>
    </S.Wrapper>
  );
};

export default GroupNavBar;
