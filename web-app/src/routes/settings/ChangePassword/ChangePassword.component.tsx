import Box from '../../../components/common/Box/Box';
import GoBackNav from '../../../components/common/GoBackNav/GoBackNav.component';
import ChangePasswordSVG from '../../../assets/changePasswordSVG.svg';
import Input from '../../../components/common/Input/input.component';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { patchPassword } from '../../../api/requests';
import { useNavigate } from 'react-router-dom';
const ChangePassword: React.FC = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation(patchPassword, {
    onSuccess: () => {
      alert('Password changed successfully');
      navigate('/account');
    },
    onError: () => {
      alert('Failed to change password');
    },
  });
  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    mutation.mutate({
      password: oldPassword,
      passwordNew: newPassword,
      passwordConfirm: confirmPassword,
    });
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
          onChange={e => setOldPassword(e.target.value)}
        />
        <Input
          placeholder="New Password"
          type="password"
          onChange={e => setNewPassword(e.target.value)}
        />
        <Input
          placeholder="Repeat New Password"
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </Box>
      <Button
        buttonType={ButtonType.Primary}
        onClick={handleSavePassword}
        isLoading={mutation.isLoading}
      >
        Save
      </Button>
    </Box>
  );
};

export default ChangePassword;
