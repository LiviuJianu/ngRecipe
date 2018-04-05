import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted:', request);


    return this.store.select('auth').switchMap(
      (authState: fromAuth.State) => {
        const copiedRequest = request.clone({
          // headers: request.headers.append('auth', 'asadasd')
          params: request.params.set('auth', authState.token)
        });
        return next.handle(copiedRequest);
      }
    );
  }

}
