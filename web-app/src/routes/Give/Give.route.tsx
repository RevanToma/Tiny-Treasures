import { useState, FC } from 'react';

import GivePreview from './GivePreview/GivePreview.component';
import GiveEdit from './GiveEdit/GiveEdit.component';

import * as S from './give.styles';
import { useSelector } from 'react-redux';
import { selectGiveFormValues } from '../../store/giveFormValues/giveFormValues.selectors';
import { initialFormValues } from './give.helpers';
import { useParams } from 'react-router-dom';

const Give: FC = () => {
  const postId = useParams().postId;
  const giveFormValues = useSelector(selectGiveFormValues);
  const [formValues, setFormValues] = useState(
    postId ? giveFormValues : initialFormValues
  );
  const [showPreview, setShowPreview] = useState(false);

  return (
    <S.Wrapper padding=" 4.8rem 2.4rem" gap="1.6rem">
      {formValues.id && <h1>Editing your post</h1>}
      {showPreview ? (
        <GivePreview
          setFormValues={setFormValues}
          setShowPreview={setShowPreview}
          formValues={formValues}
        />
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
