import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import 'rxjs/add/operator/map';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataStorageService {

  firebase = 'https://ng-recipe-book-d547d.firebaseio.com/recipes.json';


  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.httpClient.put(this.firebase + '?auth=' + token, this.recipeService.getRecipes(), {
      observe: 'body'
    });
  }

  getRecipes() {
    const token = this.authService.getToken();

    // return this.httpClient.get<Recipe[]>(this.firebase + '?auth=' + token)
    return this.httpClient.get<Recipe[]>(this.firebase + '?auth=' + token, {
      observe: 'response',
      responseType: 'json'
    })
      .map(
        (recipes) => {
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
