import { queryClient } from '../main';
import { ResponseWithData } from '../api/requests';
import { Enum } from '../types';

export const useEnums = () => {
  const enumsData: ResponseWithData<Enum[]> | undefined =
    queryClient.getQueryData(['enums']);
  console.log(enumsData?.data.data);
  return enumsData?.data.data;
};
