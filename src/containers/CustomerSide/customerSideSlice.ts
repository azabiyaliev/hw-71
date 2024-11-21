import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { IDish } from '../../types';

interface dishState {
  object: IDish[];
  oneObject: IDish | null;
  isFetching: boolean;
  error: boolean;
}

const initialState: dishState = {
  object: [],
  oneObject: null,
  isFetching: false,
  error: false,
};
export const dishList = (state: RootState) => state.dishes.object;
export const oneDishes = (state: RootState) => state.dishes.oneObject;

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers:{
  }
});

export const customerReducer = customerSlice.reducer;
export const {} = customerSlice.actions;
