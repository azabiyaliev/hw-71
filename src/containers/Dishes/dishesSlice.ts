import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchDeleteDish, fetchDish, fetchDishes, fetchPostDish, fetchPutDish } from '../store/thunks/allThuks.ts';
import { IDish, IDishAmount } from '../../types';

interface dishState {
  object: IDish[];
  cart: IDishAmount[];
  oneObject: IDish | null;
  isFetching: boolean;
  error: boolean;
}

const initialState: dishState = {
  object: [],
  cart: [],
  oneObject: null,
  isFetching: false,
  error: false,
};
export const dishList = (state: RootState) => state.dishes.object;
export const oneDishes = (state: RootState) => state.dishes.oneObject;
export const totalPrice = (state: RootState) => state.dishes.cart;


export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers:{
    addObject: (state, action: PayloadAction<IDish>) => {
      state.oneObject = action.payload;
    },
    sum: (state, {payload: dish}: PayloadAction<IDish>) => {
      const indexDish = state.cart.findIndex(dishCart => dishCart.dish.id === dish.id);

      if (indexDish === -1) {
        state.cart = [...state.cart, {dish, counts: 1}];
      } else {
        const cartCopy = [...state.cart];
        const copyDishCart = {...cartCopy[indexDish]};
        copyDishCart.counts++;
        cartCopy[indexDish] = copyDishCart;
        state.cart = [...cartCopy];
      }
    },
    minus: (state, action: PayloadAction<IDishAmount>) => {
      const pickedOrder = state.cart.find(dish => dish.dish.id === action.payload.dish.id);
          if (pickedOrder) {
              pickedOrder.counts -= action.payload.counts;
              if (pickedOrder.counts <= 0) {
                  state.cart = state.cart.filter(dish => dish.dish.id !== action.payload.dish.id);
              }
          }
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
export const {sum, addObject, minus} = dishesSlice.actions;
