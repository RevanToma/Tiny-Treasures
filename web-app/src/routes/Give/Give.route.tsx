import { useState, FC } from 'react';

import GivePreview from './GivePreview/GivePreview.component';
import GiveEdit from './GiveEdit/GiveEdit.component';

import { initialFormValues } from './give.helpers';
import * as S from './give.styles';

const Give: FC = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <S.Wrapper padding=" 4.8rem 2.4rem" gap="1.6rem">
      {showPreview ? (
        <GivePreview setShowPreview={setShowPreview} formData={formValues} />
      ) : (
        <GiveEdit
          formValues={formValues}
          setShowPreview={setShowPreview}
          setFormValues={setFormValues}
        />
      )}
    </S.Wrapper>
  );
};

export default Give;
