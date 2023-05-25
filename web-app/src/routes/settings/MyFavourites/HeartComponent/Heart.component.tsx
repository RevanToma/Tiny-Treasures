import { FaHeart } from "react-icons/fa";
import { useAppDispatch } from "../../../../hooks/useDispatch";
import { useSelector } from "react-redux";
import { selectUserFavouritePosts } from "../../../../store/user/userSelectors";
import { addPostToFavourite } from "../../../../store/user/userSlice";
import { useState } from "react";
const HeartIcon = ({ postId }) => {
  const userFavourites = useSelector(selectUserFavouritePosts);
  const isFavourite = userFavourites?.includes(postId) || false;
  const dispatch = useAppDispatch();
  const [isFavouriteLocal, setIsFavouriteLocal] = useState(isFavourite);

  const handleHeartClick = () => {
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
      color={isFavourite ? "red" : "white"}
      size={29}
      style={{ cursor: "pointer" }}
    />
  );
};

export default HeartIcon;
