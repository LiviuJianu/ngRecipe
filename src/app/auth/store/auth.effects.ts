import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { fromPromise} from 'rxjs/observable/fromPromise';

import * as AuthActionsExport from './auth.actions';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions
    .ofType(AuthActionsExport.TRY_SIGNUP)
    .map((action: AuthActionsExport.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      return [
        {
          type: AuthActionsExport.SIGNUP
        },
        {
          type: AuthActionsExport.SET_TOKEN,
          payload: token
        }
        ];
    });

  @Effect()
  authSignin = this.actions
    .ofType(AuthActionsExport.TRY_SIGNIN)
    .map((action: AuthActionsExport.TrySignin) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
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
    });

    constructor(private actions: Actions, private router: Router) {}
}
