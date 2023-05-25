import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface QueryData {
  [key: string]: string[];
  TypeOfItems: string[];
  Sizes: string[];
  Age: string[];
  Condition: string[];
  Sort: string[];
}

export const initialQueryData: QueryData = {
  Group: [],
  TypeOfItems: [],
  Sizes: [],
  Age: [],
  Condition: [],
  Sort: [],
};

interface QueryState {
  query: string;
  tempQueryData: QueryData;
  queryData: QueryData;
}

const initialState: QueryState = {
  query: '',
  tempQueryData: initialQueryData,
  queryData: initialQueryData,
};

const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, { payload }: PayloadAction<string>) => {
      state.query = payload;
    },
    setQueryData: (state, { payload }: PayloadAction<QueryData>) => {
      state.queryData = payload;
    },
    setTempQueryData: (state, { payload }: PayloadAction<QueryData>) => {
      state.tempQueryData = payload;
    },
  },
});

export const { setQuery, setQueryData, setTempQueryData } = querySlice.actions;

export default querySlice.reducer;
