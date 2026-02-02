import { HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authservice } from '../authservice/authservice';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('accessToken');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);

}
