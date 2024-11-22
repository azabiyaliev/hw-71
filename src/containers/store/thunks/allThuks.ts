import { createAsyncThunk,  } from '@reduxjs/toolkit';
import { IDish, IDishAPI, IDishForm, IOrderFromCustomer } from '../../../types';
import axiosAPI from '../../../axiosAPI.ts';

export const fetchPostDish = createAsyncThunk("postDish/fetchPostDish", async (form: IDishForm) => {
  await axiosAPI.post("dishes.json", {...form});
});

export const fetchDishes = createAsyncThunk<IDish[]>("dishes/fetchContacts", async () => {
  const response: {data: IDishAPI | null} = await axiosAPI.get<IDishAPI | null>("dishes.json");
  if (response.data) {
    const dishObjects = response.data;
    return Object.keys(dishObjects).map((dishKey) => {
      return {
        ...dishObjects[dishKey],
        id: dishKey
      };
    });
  }
  return [];
});

export const fetchDish = createAsyncThunk("dish/fetchDish", async (id: string) => {
  const {data: dish} = await axiosAPI.get<IDish>(`dishes/${id}.json`);
  return dish;
});

export const fetchPutDish = createAsyncThunk<void, IDish>("putDish/fetchPutDish", async (dish) => {
  await axiosAPI.put(`dishes/${dish.id}.json`, dish);
});

export const fetchDeleteDish = createAsyncThunk<void, string>("deleteDish/fetchDeleteDish", async (dishId) => {
  await axiosAPI.delete(`dishes/${dishId}.json`);
});

export const fetchPostOrder = createAsyncThunk("postOrder/fetchPostOrder", async (order:IOrderFromCustomer) => {
  await axiosAPI.post("orders.json", {...order});
});


