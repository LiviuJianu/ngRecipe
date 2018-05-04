import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

import * as AuthActionsExport from './auth.actions';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions
    .ofType(AuthActionsExport.TRY_SIGNUP)
    .pipe(map((action: AuthActionsExport.TrySignup) => {
      return action.payload;
    }), switchMap((authData: {username: string, password: string}) => {
      return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    }), switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    }), mergeMap((token: string) => {
      return [
        {
          type: AuthActionsExport.SIGNUP
        },
        {
          type: AuthActionsExport.SET_TOKEN,
          payload: token
        }
        ];
    }));

  @Effect()
  authSignin = this.actions
    .ofType(AuthActionsExport.TRY_SIGNIN)
    .pipe(map((action: AuthActionsExport.TrySignin) => {
      return action.payload;
    })
    , switchMap((authData: {username: string, password: string}) => {
      return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    })
      , switchMap(() => {
      return from(firebase.auth().currentUser.getIdToken());
    })
    , mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActionsExport.SIGNIN
        },
        {
          type: AuthActionsExport.SET_TOKEN,
          payload: token
        }
      ];
    }));

  @Effect({ dispatch: false })
  authLogout = this.actions
    .ofType(AuthActionsExport.LOGOUT)
    .pipe(
    tap(() => {
      this.router.navigate(['/']);
    }));

    constructor(private actions: Actions, private router: Router) {}
}
