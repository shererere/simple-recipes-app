import { Recipe } from '.';

export interface RecipesState {
  [name: string]: Recipe
}

export interface RootState {
  recipes: RecipesState
}