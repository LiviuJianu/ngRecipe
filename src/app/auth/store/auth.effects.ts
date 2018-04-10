import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActionsExport from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions
    .ofType(AuthActionsExport.TRY_SIGNUP);

    constructor(private actions: Actions) {}
}
