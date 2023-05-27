import Box from '../../../components/common/Box/Box';
import GoBackNav from '../../../components/common/GoBackNav/GoBackNav.component';
import ChangePasswordSVG from '../../../assets/changePasswordSVG.svg';
import Input from '../../../components/common/Input/input.component';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useDispatch';
import { updatePasswordAsync } from '../../../store/user/userSlice';
const ChangePassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSavePassword = () => {
    if (passwordNew !== passwordConfirm) {
      alert('New password and confirm password do not match');
      return;
    }

    dispatch(
      updatePasswordAsync({
        password,
        passwordNew,
        passwordConfirm,
      })
    );
  };

  return (
    <Box gap="2.4rem" width="100%">
      <GoBackNav title="Change Password" />
      <img src={ChangePasswordSVG} />
      <Box
        gap="3.2rem"
        width="100%"
        padding="0rem 4rem"
        marginBottom="3rem"
        marginTop="3.4rem"
      >
        <Input
          placeholder="Old Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          placeholder="New Password"
          type="password"
          onChange={e => setPasswordNew(e.target.value)}
        />
        <Input
          placeholder="Repeat New Password"
          type="password"
          onChange={e => setPasswordConfirm(e.target.value)}
        />
      </Box>
      <Button buttonType={ButtonType.Primary} onClick={handleSavePassword}>
        Save
      </Button>
    </Box>
  );
};

export default ChangePassword;
