import { Injectable } from '@angular/core';
import { LoginForm } from '../dto/LoginForm';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../dto/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) {
  }

  async login(form: LoginForm): Promise<AuthResponse> {
    const headers = {Accept: 'application/json', 'Content-Type': 'application/json'};
    return this.http.post<AuthResponse>(environment.api.login, form, {headers}).toPromise();
  }
}
