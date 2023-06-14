import GoBackNav from '../../../components/common/GoBackNav/GoBackNav.component';
import ChangeNameSVG from '../../../assets/changeNameSVG.svg';
import Box from '../../../components/common/Box/Box';
import Input from '../../../components/common/Input/input.component';
import Button from '../../../components/common/Button/Button.component';
import { ButtonType } from '../../../components/common/Button/button.types';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useDispatch';
import { updateUserAsync } from '../../../store/user/userSlice';

const ChangeName: React.FC = () => {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSaveName = () => {
    dispatch(updateUserAsync({ newData: name, field: 'name' }));
    // navigate
  };

  return (
    <Box gap="2.4rem" width="100%">
      <GoBackNav title="Change Name" />
      <img src={ChangeNameSVG} />
      <Box height="400px" gap="3.2rem" justifyContent="center">
        <Input placeholder="Name" onChange={e => setName(e.target.value)} />
        <Button
          onClick={handleSaveName}
          buttonType={
            name.trim() === '' ? ButtonType.Disabled : ButtonType.Primary
          }
        >
          save
        </Button>
      </Box>
    </Box>
  );
};

export default ChangeName;
