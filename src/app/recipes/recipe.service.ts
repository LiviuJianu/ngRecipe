import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'just a test desc', 'http://www.seriouseats.com/images' +
      '/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg'),
    new Recipe('Another Test Recipe', 'just a test desc', 'http://www.seriouseats.com/images' +
      '/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg')];


  getRecipes() {
    return this.recipes.slice();
  }




}
