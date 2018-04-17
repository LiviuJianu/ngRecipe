import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.module';
import * as RecipeActionsExport from './recipe.actions';

export interface FeatureState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes : [
    new Recipe(
      'Schnitzel',
      'delicious schnitzel',
      'https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg',
      [
        new Ingredient('meat', 1),
        new Ingredient('fries', 20)
      ]),
    new Recipe(
      'Burger',
      'excelent burger',
      'https://www.325fss.com/wp-content/uploads/2017/10/image.jpg',
      [
        new Ingredient('bread', 2),
        new Ingredient('meat', 1)
      ])
  ]
};

export function recipeReducer(state = initialState, action: RecipeActionsExport.RecipeActions) {
  switch (action.type) {
    case (RecipeActionsExport.SET_RECIPE):
      return {
        ...state,
        recipes: [...action.payload]
      };
  }
}
