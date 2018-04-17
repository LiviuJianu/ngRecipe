import { Actions, Effect } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import { Recipe } from '../recipe.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as RecipeActionsExport from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { Store } from '@ngrx/store';

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

    @Effect({dispatch: false})
    recipeStore = this.actions
      .ofType(RecipeActionsExport.STORE_RECIPES)
      .withLatestFrom(this.store.select('recipes'))
      .switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', this.firebase, state.recipes, {
          reportProgress: true
        });

        return this.httpClient.request(req);
      });



  constructor(private actions: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {}

}
