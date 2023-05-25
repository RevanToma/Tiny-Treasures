export interface IGivePreviewFormData {
  [key: string]: string | string[] | File[];
  title: string;
  description: string;
  group: string;
  typeOfItems: string[];
  age: string;
  sizes: string[];
  itemCount: string;
  condition: string;
  location: string;
  images: File[];
}

export interface IConvertedChangeData {
  name: string;
  value: string | string[] | File[];
}
