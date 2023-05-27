import { FaHeart, FaRegHeart } from 'react-icons/fa';

import { useAppDispatch } from '../../../../hooks/useDispatch';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../store/user/userSelectors';
import { addPostToFavourite } from '../../../../store/user/userSlice';
import { FC, useState } from 'react';
import { theme } from '../../../../styles/themes';
import Box from '../../../../components/common/Box/Box';

interface IHeartProps {
  postId: string;
  disabled?: boolean;
}

const HeartIcon: FC<IHeartProps> = ({ postId, disabled = false }) => {
  const user = useSelector(selectUser);
  const isFavorite = user?.favorites?.includes(postId) || false;
  const dispatch = useAppDispatch();
  const [isFavouriteLocal, setIsFavouriteLocal] = useState(isFavorite);

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
    <Box onClick={handleHeartClick} cursor="pointer">
      {isFavorite ? (
        <FaHeart color={theme.color.primaryBlue} size={35} />
      ) : (
        <FaHeart color={theme.color.primaryOffWhite} size={35} />
        // <FaRegHeart color={theme.color.primaryBlue} size={35} />
      )}
    </Box>
  );
};

export default HeartIcon;
