import { createSlice } from '@reduxjs/toolkit';
import { RecipesState } from '../types';

const recipes = createSlice({
  name: 'recipes',
  initialState: {} as RecipesState,
  reducers: {
    saveRecipe: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    removeRecipe: (state, action) => {
      delete state[action.payload];
    },
  },
});

export default recipes;
