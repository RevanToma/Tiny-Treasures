export interface IConvertedChangeData {
  name: string;
  value: string | string[] | File[];
}

export interface IGivePreviewFormData {
  title: string;
  description: string;
  group: string;
  typeOfItems: string[];
  age: string;
  condition: string;
  itemCount: string;
  sizes: string[];
  location?: string;
  images: File[];
  imgUrls: string[];
  id?: string;
  frontImageArray?: 'imgUrls' | 'images';
}
