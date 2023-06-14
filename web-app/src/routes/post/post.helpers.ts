import { IPost } from '../../types';
import { capitalize } from '../../utils/helpers';
import { IGivePreviewFormData } from '../Give/give.types';

export const getFormValuesFromPost = (post: IPost): IGivePreviewFormData => {
  const {
    title,
    description,
    group,
    typeOfItems,
    age,
    condition,
    itemCount,
    sizes,
    images,
    _id,
  } = post;
  return {
    title,
    description,
    group: capitalize(group),
    typeOfItems,
    age,
    condition: capitalize(condition),
    itemCount: itemCount.toString(),
    sizes,
    imgUrls: images,
    id: _id,
    images: [],
  };
};
