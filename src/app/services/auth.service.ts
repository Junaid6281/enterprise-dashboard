import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string, remember: boolean): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}auth/login`, { email, password }).pipe(
      tap(res => {
        if (remember) {
          localStorage.setItem('jwt_token', res.token);
          console.log('jwt_token', res.token);
        } else {
          sessionStorage.setItem('jwt_token', res.token);
          console.log('jwt_token', res.token);
        }
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  logout() {
    localStorage.removeItem('jwt_token');
    sessionStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
  }

  getToken() {
    return localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
} 