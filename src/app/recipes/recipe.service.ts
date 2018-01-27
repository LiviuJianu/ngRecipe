import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.module';

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
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
      'http://peterburger.ro/wp-content/uploads/2017/11/peter-burger-bucuresti-livrare-02.png',
      [
        new Ingredient('bread', 2),
        new Ingredient('meat', 1)
      ])
  ];


  getRecipes() {
    return this.recipes.slice();
  }




}
