import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly signUpUrl = '/api/signup';
  public errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public signUp(email: string, password: string): Observable<unknown> {
    const body = { email, password };
    return this.http.post(this.signUpUrl, body).pipe(
      tap(() => this.router.navigateByUrl('/signin')),
      catchError(this.handleError('Sign up user'))
    );
  }

  private handleError<T>(
    operation = 'operarion',
    result?: T
  ): (error: HttpErrorResponse) => Observable<T> {
    return (error): Observable<T> => {
      this.errorMessage = error.error.message;
      console.log(error.error.message);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
