import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VerificationForm } from '../dto/VerificationForm';
import { AuthResponse } from '../dto/AuthResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(
    private http: HttpClient
  ) {
  }

  async verify(form: VerificationForm): Promise<AuthResponse> {
    const headers = {Accept: 'application/json', 'Content-Type': 'application/json'};
    return this.http.post<any>(environment.api.verifyCode, form, {headers})
      .toPromise<AuthResponse>();
  }
}
