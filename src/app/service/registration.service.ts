import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationForm } from '../dto/RegistrationForm';
import { AuthResponse } from '../dto/AuthResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private http: HttpClient
  ) {
  }

  async save(form: RegistrationForm): Promise<AuthResponse> {
    const headers = {Accept: 'application/json', 'Content-Type': 'application/json'};
    return this.http.post<any>(environment.api.registration, form, {headers})
      .toPromise<AuthResponse>();
  }
}
