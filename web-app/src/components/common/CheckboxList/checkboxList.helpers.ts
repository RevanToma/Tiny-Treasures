export const getQueryDataName = (name: string) => {
  return name.startsWith('Age') ? 'Age' : name;
};
