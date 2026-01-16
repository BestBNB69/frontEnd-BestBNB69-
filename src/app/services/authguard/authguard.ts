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
    let payload;
    let expDate = new Date();
    const acc = localStorage.getItem('accessToken');
    if (acc != null) {
      payload = JSON.parse(atob(acc.split('.')[1]));
      expDate = new Date(payload.exp * 1000);
    }
    console.log(expDate)
    if (!this.auth.isAuthenticated()
      //  || expDate < new Date()
    ) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
