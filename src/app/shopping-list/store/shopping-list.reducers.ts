import { Ingredient } from '../../shared/ingredient.module';
import * as ShoppingListActionsExports from './shopping-list.actions';


const initialState = {
  ingredients: [
    new Ingredient('apples', 5),
    new Ingredient('tomatos', 10)
  ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActionsExports.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActionsExports.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActionsExports.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    default:
      return state;
  }
}
