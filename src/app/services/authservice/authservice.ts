import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../../models/authreponse';
import { LoginDto, LoginBackDto, RegisterDto, RegisterBackDto } from '../../models/sign';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private readonly API_URL = 'http://localhost:5235/api';

  private isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  private roles$ = new BehaviorSubject<string[]>(this.getStoredRoles());

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(data: LoginDto): Observable<AuthResponse> {
    const newRes: LoginBackDto = {
      EmailAddress: data.email,
      PasswordHash: data.password
    };
    return this.http.post<AuthResponse>(`${this.API_URL}/users/login`, newRes)
      .pipe(
        tap(res => {
          this.storeAuth(res);
          this.redirectAfterLogin();
        })
      );
  }

  register(data: RegisterDto): Observable<AuthResponse> {
    const newRes: RegisterBackDto = {
      Name: data.username,
      EmailAddress: data.email,
      PasswordHash: data.password
    };
    return this.http.post<AuthResponse>(`${this.API_URL}/users/register`, newRes)
      .pipe(
        tap(res => {
          this.storeAuth(res);
          this.redirectAfterLogin();
        })
      );
  }

  logout(): void {
    this.clearStorage();
    // this.isLoggedIn$.next(false);
    // this.roles$.next([]);
    this.router.navigate(['/auth/login']);
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post<AuthResponse>(
      `${this.API_URL}/refresh`,
      { refreshToken }
    ).pipe(
      tap(res => this.storeAuth(res))
    );
  }

  private storeAuth(res: AuthResponse): void {
    // console.log(res);
    if (!res.jwt) {
      console.error('NO TOKEN IN AUTH RESPONSE', res);
      return;
    }
    localStorage.setItem('accessToken', res.jwt);

    // if (res.refreshToken) {
    //   localStorage.setItem('refreshToken', res.refreshToken);
    // }

    // localStorage.setItem('roles', JSON.stringify(res.roles));
    // localStorage.setItem('userId', res.userId.toString());

    this.isLoggedIn$.next(true);
    // this.roles$.next(res.roles);
  }

  private clearStorage(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('roles');
    localStorage.removeItem('userId');
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(r => this.hasRole(r));
  }

  getUserRoles(): string[] {
    return this.roles$.value;
  }

  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? +id : null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  roles(): Observable<string[]> {
    return this.roles$.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  private getStoredRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  private redirectAfterLogin(): void {
    // if (roles.includes('HOST')) {
    // this.router.navigate(['/host/dashboard']);
    // } else {
    this.router.navigate(['/listings']);
    // }
  }
}
