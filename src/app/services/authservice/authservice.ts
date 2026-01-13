import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface AuthResponse {
  accessToken: string;
  refreshToken?: string;
  roles: string[];
  userId: number;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private readonly API_URL = '/api/v1/auth';

  private isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  private roles$ = new BehaviorSubject<string[]>(this.getStoredRoles());

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(data: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, data)
      .pipe(
        tap(res => {
          this.storeAuth(res);
          this.redirectAfterLogin(res.roles);
        })
      );
  }

  register(data: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, data)
      .pipe(
        tap(res => {
          this.storeAuth(res);
          this.redirectAfterLogin(res.roles);
        })
      );
  }

  logout(): void {
    this.clearStorage();
    this.isLoggedIn$.next(false);
    this.roles$.next([]);
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
    localStorage.setItem('accessToken', res.accessToken);

    if (res.refreshToken) {
      localStorage.setItem('refreshToken', res.refreshToken);
    }

    localStorage.setItem('roles', JSON.stringify(res.roles));
    localStorage.setItem('userId', res.userId.toString());

    this.isLoggedIn$.next(true);
    this.roles$.next(res.roles);
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

  private redirectAfterLogin(roles: string[]): void {
    if (roles.includes('HOST')) {
      this.router.navigate(['/app/host/dashboard']);
    } else {
      this.router.navigate(['/app/listings']);
    }
  }
}
