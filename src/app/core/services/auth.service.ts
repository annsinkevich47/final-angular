import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly signUpUrl = '/api/signup';
  public errorMessage: string = '';

  constructor(private http: HttpClient) {}

  public signUp(email: string, password: string): Observable<unknown> {
    const body = { email, password };
    return this.http.post(this.signUpUrl, body);
  }
}
