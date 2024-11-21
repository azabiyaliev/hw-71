import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchDeleteDish, fetchDish, fetchDishes, fetchPostDish, fetchPutDish } from '../store/thunks/allThuks.ts';
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

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers:{
    edit: (state, action: PayloadAction<IDish[]>) => {
      state.object = action.payload;
    },
    addObject: (state, action: PayloadAction<IDish>) => {
      state.oneObject = action.payload;
    }
  },
  extraReducers:(builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchDishes.fulfilled, (state, action: PayloadAction<IDish[]>) => {
        state.isFetching = true;
        state.object = action.payload;
      })
      .addCase(fetchDishes.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(fetchDish.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchDish.fulfilled, (state, action: PayloadAction<IDish>) => {
        state.isFetching = true;
        state.oneObject = action.payload;
      })
      .addCase(fetchDish.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(fetchPostDish.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchPostDish.fulfilled, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPostDish.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(fetchPutDish.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchPutDish.fulfilled, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPutDish.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      })
      .addCase(fetchDeleteDish.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchDeleteDish.fulfilled, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchDeleteDish.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      });
  }
});

export const dishesReducer = dishesSlice.reducer;
export const {edit, addObject} = dishesSlice.actions;
