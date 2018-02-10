import { Ingredient } from '../shared/ingredient.module';
import { Subject } from 'rxjs/Subject';

export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatos', 10)


  ];

  constructor() { }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredients(ingredients: Ingredient[]) {
    // ingredients.forEach((ingredient) => {
    //   this.addIngredient(ingredient);
    // });
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
