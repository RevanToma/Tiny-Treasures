import { queryClient } from '../main';
import { ResponseWithData } from '../api/requests';
import { IEnum } from '../types';

export const useEnums = () => {
  const enumsData: ResponseWithData<IEnum[]> | undefined =
    queryClient.getQueryData(['enums']);
  console.log(enumsData?.data.data);
  return enumsData?.data.data;
};
