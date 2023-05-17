import Box from "../../components/common/Box/Box";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {  selectIsSignedIn, selectUserCredits } from "../../store/user/userSelectors";


import NavigationItem from "./NavigationItems";
import { useAppDispatch } from "../../hooks/useDispatch";
import { signOut } from "../../store/user/userSlice";
import { signOutUser } from "../../api/requests";
import { FaBox, FaCoins, FaEnvelope, FaHeart, FaLock, FaSignInAlt, FaSignOutAlt, FaUserEdit } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import {MdLocationPin} from "react-icons/md"
const AccountSettings = () => {
  const userCredits = useSelector(selectUserCredits);
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const userSignedIn = useSelector(selectIsSignedIn);




  const handleChangeName= () => {
    navigate("/change-name");
  };
  const handleCredits = () => {
    navigate("/credits");
  };

  const handleMyItems = () => {
    navigate("/myItems");
  };

  const handleFavourites = () => {
    navigate("/favourites");
  };
  const handleChangeEmail = () => {
    navigate("/favourites");
  };
  const handleChangePassword = () =>{
    navigate("/password")
   }
   const handleLogOut =   () => {
   
  signOutUser()
    dispatch(signOut())
    navigate("/")
  
   }

   
   
  return (
    <>
    
    
    {userSignedIn ? ( <Box backgroundColor="#F5F5F5" height="100vh" width="100%">
      <Box  justifyContent="center" padding="2.5rem" marginBottom="2.5rem">
        <h1>Account</h1>
      </Box>
      
      <Box gap="5rem" margin="2rem">
        <Box gap="2.4rem">

        <h3>Account Settings</h3>
        <NavigationItem
          text="Change Name"
          onClick={handleChangeName}
          icon={<FaUserEdit size={20}  color="black" />}
        />
        <NavigationItem
          text="Change Email"
          onClick={handleChangeEmail}
          icon={<FaEnvelope size={20}  color="black" />}
        />
        <NavigationItem
          text="Change Password"
          onClick={handleChangePassword}
          icon={<FaLock size={20}  color="black" />}
        />
                </Box>
                <Box gap="2.4rem">
                <h3>General Settings</h3>
                <NavigationItem
          text="Notification"
          onClick={handleChangePassword}
          icon={<IoMdNotifications size={25}  color="black" />}
        />
        <NavigationItem
          text="Location"
          onClick={handleChangePassword}
          icon={<MdLocationPin size={25} color="black" />}
        />
                </Box>
<Box gap="2.4rem">
  <h3>Your Space</h3>
<NavigationItem
          onClick={handleCredits}
          showArrow={false}
          text="Credits"
          icon={<FaCoins size={20}/>}
        >
        x{userCredits}
        </NavigationItem>
        <NavigationItem text="My items" icon={<FaBox size={20}/>} onClick={handleMyItems} />
        <NavigationItem text="Favourites" icon={<FaHeart size={20}/>} onClick={handleFavourites} />
        <NavigationItem text="Log out" icon={<FaSignOutAlt size={20}/>} onClick={handleLogOut} />

</Box>
       

      </Box>
    </Box>) : (
      <Box justifyContent="center" marginTop="5rem">
        <NavigationItem onClick={() => navigate("/signin")} text="Sign In" icon={<FaSignInAlt size={20}/>} />
      </Box>
           

    )}
    </>
  );
}

export default AccountSettings;
