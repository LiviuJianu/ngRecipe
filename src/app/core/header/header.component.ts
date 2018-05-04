import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActionsExport from '../../auth/store/auth.actions';
import * as RecipeActionsExport from '../../recipes/store/recipe.actions';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(private store: Store<fromApp.AppState>) {}

  onSaveData() {
    this.store.dispatch(new RecipeActionsExport.StoreRecipes());
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onFetchData() {
    this.store.dispatch(new RecipeActionsExport.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActionsExport.Logout());
  }

}
