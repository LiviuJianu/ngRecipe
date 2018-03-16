import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted:', request);

    const copiedRequest = request.clone({
    // headers: request.headers.append('auth', 'asadasd')
    params: request.params.set('auth', this.authService.getToken())
    });

    return next.handle(copiedRequest);
  }

}
