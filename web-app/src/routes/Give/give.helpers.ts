import { ChangeEvent } from 'react';
import { MainCategories, clothes, other, toys } from '../../utils/enums';
import { IConvertedChangeData, IGivePreviewFormData } from './give.types';
import { EAges } from '../../utils/enums/enums';

export const getCategory = (group: string): string[] => {
  if (group === MainCategories.B) return clothes;
  if (group === MainCategories.C) return toys;
  if (group === MainCategories.A) return other;
  return [];
};

export const getImgBox = (name: string, i: number): Node => {
  const div = document.createElement('div');
  div.id = `img-box-${name}-${i}`;
  div.className = 'img-box';
  // div.style.minHeight = '10rem';
  // div.style.minWidth = '10rem';
  // div.style.width = '10rem';
  // div.style.borderRadius = '8px';
  // div.style.position = 'relative';

  return div;
};

export const getMainImgBox = (name: string, i: number): Node => {
  const div = document.createElement('div');
  div.id = `img-box-${name}-${i}`;
  // div.style.minWidth = '23rem';
  // div.style.width = '23rem';
  // div.style.borderRadius = '8px';
  // div.style.margin = '3rem 0';
  // div.style.position = 'relative';

  return div;
};

export const getRemoveIcon = (i: number): Node => {
  const div = document.createElement('div');
  div.id = `remove-icon-${i}`;
  div.className = `remove-icon`;
  div.textContent = 'x';

  return div;
};

export const checkIsFormValid = (data: IGivePreviewFormData) => {
  if (
    data.title === '' ||
    data.description === '' ||
    data.group === '' ||
    data.age === '' ||
    data.itemCount === '' ||
    data.condition === '' ||
    !data.typeOfItems.length ||
    (data.group === 'clothes' && !data.sizes.length) ||
    (!data.images?.length && !data.imgUrls.length)
  )
    return false;
  return true;
};

// GiveEdit HELPERS

export const handleInputChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
): IConvertedChangeData => {
  return {
    name: e.target.name,
    value: e.target.value,
  };
};

export const getSizes = (age: string) => {
  if (age === EAges.A) return ['44', '50/56', '62/68', '74/80', '86/92'];
  if (age === EAges.B) return ['98/104', '110/116', '122/128'];
  if (age === EAges.C) return ['134/140', '146/152'];
  return [];
};

export const getFormData = (formData: IGivePreviewFormData) => {
  const {
    images,
    title,
    description,
    group,
    typeOfItems,
    age,
    sizes,
    itemCount,
    condition,
    imgUrls,
    id,
    frontImageArray,
  } = formData;

  const form = new FormData();

  images.forEach(file => {
    form.append('photos', file);
  });
  imgUrls.forEach(url => {
    form.append('imgUrls', url);
  });
  form.append('title', title);
  form.append('description', description);
  form.append('group', group);
  typeOfItems.forEach(typeOfItem => {
    form.append('typeOfItems', typeOfItem);
  });
  form.append('age', age);
  sizes.forEach(size => {
    form.append('sizes', size);
  });
  form.append('itemCount', itemCount);
  form.append('condition', condition);

  if (id) {
    form.append('id', id);
  }
  if (frontImageArray) {
    form.append('frontImageArray', frontImageArray);
  }
  return form;
};

export const initialFormValues: IGivePreviewFormData = {
  title: '',
  description: '',
  group: '',
  typeOfItems: [],
  age: '',
  condition: '',
  itemCount: '',
  sizes: [],
  location: '',
  images: [],
  imgUrls: [],
};
