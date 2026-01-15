import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from '../authservice/authservice';

@Injectable({
  providedIn: 'root',
})
export class Authguard {
  constructor(
    private auth: Authservice,
    private router: Router
  ) { }

  canActivate(): boolean {
    // const token = this.auth.isAuthenticated();
    // console.log('AuthGuard check, token =', token);
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
