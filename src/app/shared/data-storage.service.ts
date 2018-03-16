import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import 'rxjs/add/operator/map';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {

  firebase = 'https://ng-recipe-book-d547d.firebaseio.com/recipes.json';


  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();

    // return this.httpClient.put(this.firebase, this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   // headers: new HttpHeaders().set('Authorization', 'angular authorization')
    //   params: new HttpParams().set('auth', token)
    // });

    const req = new HttpRequest('PUT', this.firebase, this.recipeService.getRecipes(), {
      reportProgress: true,
      params: new HttpParams().set('auth', token)
    });

    return this.httpClient.request(req);
  }

  getRecipes() {
    const token = this.authService.getToken();

    // return this.httpClient.get<Recipe[]>(this.firebase + '?auth=' + token)
    return this.httpClient.get<Recipe[]>(this.firebase, {
      observe: 'response',
      responseType: 'json',
      headers: new HttpHeaders().set('auth', token)
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
