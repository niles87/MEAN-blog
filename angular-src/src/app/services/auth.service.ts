import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    let headers = new Headers();
    return this.http.post('http://localhost:3000/users/register', user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  authenticateUser(user: any) {
    let headers = new Headers();
    return this.http.post('http://localhost:3000/users/auth', user, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    console.log(typeof this.authToken);
    return this.http.get('http://localhost:3000/users/profile', {
      headers: {
        Authorization: this.authToken,
        'Content-type': 'application/json',
      },
    });
  }

  storeUserData(token: string, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
