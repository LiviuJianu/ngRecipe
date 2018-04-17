import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';

import * as RecipeActionsExport from '../store/recipe.actions';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {

  firebase = 'https://ng-recipe-book-d547d.firebaseio.com/recipes.json';

  @Effect()
  recipeFetch = this.actions
    .ofType(RecipeActionsExport.FETCH_RECIPES)
    .switchMap((action: RecipeActionsExport.FetchRecipes) => {
      return this.httpClient.get<Recipe[]>(this.firebase, {
        observe: 'body',
        responseType: 'json'
      });
    })
    .map(
      (recipes) => {
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActionsExport.SET_RECIPE,
          payload: recipes
        };
      }
    );

  constructor(private actions: Actions,
              private httpClient: HttpClient) {}

}
