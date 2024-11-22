import { configureStore } from "@reduxjs/toolkit";
import { dishesReducer } from '../containers/Dishes/dishesSlice.ts';
import { ordersReducer } from '../containers/CustomerSide/customerSideSlice.ts';

export const store = configureStore({
  reducer:{
    dishes: dishesReducer,
    orders: ordersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;