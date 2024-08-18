import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ISignInResponse,
  ISignUpResponse,
} from '../../shared/models/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class SignService {
  private readonly signUpUrl = '/api/signup';
  private readonly signInUrl = '/api/signin';
  public errorMessage: string = '';

  constructor(private http: HttpClient) {}

  public signUp(email: string, password: string): Observable<ISignUpResponse> {
    const body = { email, password };
    return this.http.post<ISignUpResponse>(this.signUpUrl, body);
  }

  public signIn(email: string, password: string): Observable<ISignInResponse> {
    const body = { email, password };
    return this.http.post<ISignInResponse>(this.signInUrl, body);
  }
}
