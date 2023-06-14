import { clothes, other, toys } from '../../utils/enums';

interface FilterItems {
  [key: string]: string[];
}

export const filterItems: FilterItems = {
  Clothes: [...clothes],
  Toys: [...toys],
  Other: [...other],
};

export const filterAges = [
  {
    name: 'Age 0-3',
    sizes: ['44', '50/56', '62/68', '74/80', '86/92', '98/104'],
  },
  {
    name: 'Age 4-7',
    sizes: ['110/116', '122/128'],
  },
  {
    name: 'Age 8-11',
    sizes: ['134/140', '146/152'],
  },
];
