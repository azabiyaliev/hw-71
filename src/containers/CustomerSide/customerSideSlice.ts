import { createSlice } from '@reduxjs/toolkit';
import { IOrderFromCustomer } from '../../types';
import { RootState } from '../../app/store.ts';
import { fetchPostOrder } from '../store/thunks/allThuks.ts';

interface stateFromCustomer {
  object: IOrderFromCustomer;
  isFetching: boolean;
  error: boolean;
}

const initialState: stateFromCustomer = {
  object: [],
  isFetching: false,
  error: false,
};

export const ordersList = (state: RootState) => state.orders.object;

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers:{},
  extraReducers:(builder) => {
    builder
      .addCase(fetchPostOrder.pending, (state) => {
        state.isFetching = true;
        state.error = false;
      })
      .addCase(fetchPostOrder.fulfilled, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPostOrder.rejected, (state) => {
        state.isFetching = false;
        state.error = true;
      });
}
});

export const ordersReducer = ordersSlice.reducer;
export const {} = ordersSlice.actions;
