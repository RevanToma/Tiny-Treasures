import { FaHeart } from 'react-icons/fa';
import { useAppDispatch } from '../../../../hooks/useDispatch';
import { useSelector } from 'react-redux';
import {
  selectUser,
  selectUserFavouritePosts,
} from '../../../../store/user/userSelectors';
import { addPostToFavourite } from '../../../../store/user/userSlice';
import { FC, useState } from 'react';
import { theme } from '../../../../styles/themes';

interface IHeartProps {
  postId: string;
  disabled?: boolean;
}

const HeartIcon: FC<IHeartProps> = ({ postId, disabled = false }) => {
  const user = useSelector(selectUser);
  const isFavourite = user?.favorites?.includes(postId) || false;
  const dispatch = useAppDispatch();
  const [isFavouriteLocal, setIsFavouriteLocal] = useState(isFavourite);

  const handleHeartClick = () => {
    if (disabled || !user) return;
    setIsFavouriteLocal(!isFavouriteLocal);
    if (isFavouriteLocal) {
      dispatch(addPostToFavourite(postId));
    } else {
      dispatch(addPostToFavourite(postId));
    }
  };

  return (
    <FaHeart
      onClick={handleHeartClick}
      color={isFavourite ? theme.color.primaryBlue : 'white'}
      size={29}
      style={{ cursor: 'pointer' }}
      stroke={theme.color.primaryBlue}
      strokeWidth={50}
    />
  );
};

export default HeartIcon;
