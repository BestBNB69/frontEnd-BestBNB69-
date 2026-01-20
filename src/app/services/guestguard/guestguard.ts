import { Injectable } from '@angular/core';
import { Authservice } from '../authservice/authservice';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Guestguard implements CanActivate {
  constructor(
    private auth: Authservice,
    private router: Router
  ) { }

  canActivate(): boolean {
    // console.log(localStorage.getItem('accessToken'))
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/listings']);
      return false;
    }
    return true;
  }
}
