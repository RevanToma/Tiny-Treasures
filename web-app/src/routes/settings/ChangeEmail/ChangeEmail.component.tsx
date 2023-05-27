import { useState } from 'react';
import Box from '../../../components/common/Box/Box';
import GoBackNav from '../../../components/common/GoBackNav/GoBackNav.component';
import ChangeEmailSVG from '../../../assets/changeEmailSVG.svg';
import Input from '../../../components/common/Input/input.component';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { patchEmail } from '../../../api/requests';

const ChangeEmail: React.FC = () => {
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const mutation = useMutation(() => patchEmail(newEmail, password), {
    onSuccess: () => {
      alert(`Successfully changed email to: ${newEmail}`);
      navigate('/account');
    },
    onError: () => {
      console.log('error');
    },
  });

  const handleSaveEmail = () => {
    if (newEmail !== confirmEmail) {
      alert('The new email and confirm email fields do not match.');
      return;
    }

    if (password.trim() === '') {
      alert('Please enter your password.');
      return;
    }

    mutation.mutate();
  };

  return (
    <Box gap="2.4rem" width="100%">
      <GoBackNav title="Change Email" />
      <img src={ChangeEmailSVG} />
      <Box gap="3.2rem" width="100%" padding="0rem 4rem">
        <Input
          placeholder="New Email"
          onChange={e => setNewEmail(e.target.value)}
        />
        <Input
          placeholder="Repeat New Email"
          onChange={e => setConfirmEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </Box>
      <Box marginTop="3.2rem">
        <Button
          buttonType={ButtonType.Primary}
          onClick={handleSaveEmail}
          isLoading={mutation.isLoading}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ChangeEmail;
