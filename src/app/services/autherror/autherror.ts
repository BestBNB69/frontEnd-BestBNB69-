import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authservice } from '../authservice/authservice';
import { catchError, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Autherror implements HttpInterceptor {
  constructor(private auth: Authservice) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          return this.auth.refreshToken().pipe(
            switchMap(() => next.handle(req))
          );
        }
        return throwError(() => err);
      })
    );
  }
}
