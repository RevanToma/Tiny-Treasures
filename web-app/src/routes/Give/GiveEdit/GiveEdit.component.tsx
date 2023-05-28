import { FC, Dispatch } from 'react';

import UploadImageBox from '../UploadImageBox/UploadImageBox.component';
import Button from '../../../components/common/Button/Button.component';
import Box from '../../../components/common/Box/Box';
import Input from '../../../components/common/Input/input.component';
import SelectInput from '../../../components/common/SelectInput/SelectInput.component';
import CheckboxList from '../../../components/common/CheckboxList/CheckboxList.component';
import { CheckboxSizes } from '../../Group/FilterPopup/FilterPopup.component';

import {
  checkIsFormValid,
  getCategory,
  getSizes,
  handleInputChange,
} from '../give.helpers';

import { ButtonType } from '../../../components/common/Button/button.types';
import { IConvertedChangeData, IGivePreviewFormData } from '../give.types';
import { ages, conditions, mainCategories } from '../../../utils/enums';

interface GiveEditProps {
  setFormValues: Dispatch<React.SetStateAction<IGivePreviewFormData>>;
  setShowPreview: Dispatch<React.SetStateAction<boolean>>;
  formValues: IGivePreviewFormData;
}

const GiveEdit: FC<GiveEditProps> = ({
  setFormValues,
  setShowPreview,
  formValues,
}) => {
  // HANDLING CHANGE
  const handleSelectChange = (
    name: string,
    value: string,
    isChecked: boolean
  ): void => {
    const newChoices = [...formValues[name]];
    if (isChecked) {
      newChoices.push(value);
    } else {
      const index = newChoices.indexOf(value);
      newChoices.splice(index, 1);
    }
    const data = {
      name,
      value: newChoices as string[],
    };

    handleChange(data);
  };

  const handleChange = ({ name, value }: IConvertedChangeData) => {
    const newFormValues = { ...formValues };
    if (name === 'age') {
      newFormValues.sizes = [];
    }
    if (name === 'group') {
      newFormValues.typeOfItems = [];
      newFormValues.sizes = [];
    }
    newFormValues[name] = value;

    setFormValues(newFormValues);
  };

  const getIsChecked = (name: string, item: string) => {
    const choices = [...formValues[name]] as string[];
    return choices.includes(item);
  };

  //TODO:  ADD ERROR MESSAGE IF USER HAS NO LOCATION

  return (
    <>
      <UploadImageBox handleChange={handleChange} formValues={formValues} />

      <Box gap="2rem" width="100%" margin="0 auto">
        <Input
          onChange={e => handleChange(handleInputChange(e))}
          placeholder="Title"
          name="title"
          type="text"
          value={formValues.title}
          required
        />
        <Input
          onChange={e => handleChange(handleInputChange(e))}
          placeholder="Description"
          name="description"
          type="textarea"
          value={formValues.description}
          required
        />
        <SelectInput
          handleSelect={handleChange}
          name="group"
          previousValue={formValues.group}
          optionsArray={mainCategories}
          initialValue="Group"
          required
        />

        {formValues.group !== '' && (
          <CheckboxList
            label="Type of Item"
            name="typeOfItems"
            items={getCategory(formValues.group)}
            size={CheckboxSizes.Large}
            setOptions={handleSelectChange}
            getIsChecked={getIsChecked}
          />
        )}
        <SelectInput
          handleSelect={handleChange}
          name="age"
          previousValue={formValues.age}
          optionsArray={ages}
          initialValue="Age Group"
          required
        />
        {formValues.age !== '' && formValues.group === 'Clothes' && (
          <CheckboxList
            label="Sizes"
            name="sizes"
            items={getSizes(formValues.age)}
            size={CheckboxSizes.Large}
            setOptions={handleSelectChange}
            getIsChecked={getIsChecked}
          />
        )}
        <Input
          onChange={e => handleChange(handleInputChange(e))}
          name="itemCount"
          placeholder="Number of Items"
          type="number"
          value={formValues.itemCount}
          min={1}
          max={10}
          required
        />
        <SelectInput
          handleSelect={handleChange}
          name="condition"
          previousValue={formValues.condition}
          optionsArray={conditions}
          initialValue="Condition"
          required
        />
        <Button
          buttonType={
            checkIsFormValid(formValues)
              ? ButtonType.Primary
              : ButtonType.Disabled
          }
          onClick={() => setShowPreview(true)}
          type="button"
        >
          Review
        </Button>
      </Box>
    </>
  );
};

export default GiveEdit;
