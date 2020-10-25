import { Injectable } from '@angular/core';
import { User } from '../dto/User';

export class AuthToken {

  constructor(
    public accessToken: string,
    public expiresIn: string
  ) {
  }

  isExpired(): boolean {
    const current = new Date().getTime();
    const expiry = new Date(this.expiresIn).getTime();
    return expiry < current;
  }
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  token: AuthToken;
  user: User;

  constructor() {
  }

  setToken(accessToken: string, expiresIn: string): void {
    this.token = new AuthToken(accessToken, expiresIn);
    localStorage.setItem('auth', JSON.stringify(this.token));
  }

  getToken(): AuthToken {
    if (this.token) {
      return this.token;
    }

    try {
      const saved = JSON.parse(localStorage.getItem('auth')) as AuthToken;
      this.token = new AuthToken(saved.accessToken, saved.expiresIn);
    } catch (e) {
      console.log(e);
    }

    return this.token;
  }
}
