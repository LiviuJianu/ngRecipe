import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {

  firebase = 'https://ng-recipe-book-d547d.firebaseio.com/recipes.json';


  constructor(private http: Http, private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put(this.firebase, this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get(this.firebase)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
