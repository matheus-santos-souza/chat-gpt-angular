import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = request;
    authReq = request.clone({
      headers: request.headers.set(
        'Authorization',
        this.authService.getToken()
          ? `Bearer ${this.authService.getToken()}`
          : ''
      ),
    });

    return next.handle(authReq).pipe(
      catchError(e => {
        if (e.status === 401) {
          this.snackBar.open(
            'Seu login expirou! Faça o login novamente!',
            'OK',
            { duration: 4000 }
          );
          this.authService.logout();
          this.router.navigateByUrl('login')
        }
        return throwError(e);
      })
    );
  }
}
