import { Ingredient } from '../shared/ingredient.module';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatos', 10)

  ];

  constructor() { }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(editedItemIndex: number) {
    this.ingredients.splice(editedItemIndex, 1);
    this.ingredientsChanged.next(this.ingredients.slice());

  }
}
