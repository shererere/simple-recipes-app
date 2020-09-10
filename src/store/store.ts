import { configureStore } from '@reduxjs/toolkit';
import recipes from './recipes';
import { RootState } from '../types';

const STORAGE_KEY = 'recipes_state';

const preloadedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

const store = configureStore({
  reducer: {
    recipes: recipes.reducer,
  },
  preloadedState: preloadedState as RootState,
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
});

export default store;