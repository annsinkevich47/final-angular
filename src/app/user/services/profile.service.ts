import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import {
  ILogoutResponse,
  IProfileResponse,
} from '../../shared/models/profile-response.module';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly infoUrl = '/api/profile';
  private readonly logoutUrl = '/api/logout';
  private readonly updatePasswordUrl = '/api/profile/password';

  constructor(private http: HttpClient) {}

  public getUserInfo(): Observable<IProfileResponse> {
    return this.http
      .get<IProfileResponse>(this.infoUrl)
      .pipe(catchError(this.handleError));
  }

  public updateUserInfo(
    name: string,
    email: string,
  ): Observable<IProfileResponse> {
    const body = { name, email };

    return this.http.put<IProfileResponse>(this.infoUrl, body);
  }

  public changePassword(newPassword: string) {
    return this.http
      .put(this.updatePasswordUrl, { password: newPassword })
      .pipe(catchError(this.handleError));
  }

  public logout(): Observable<ILogoutResponse> {
    return this.http
      .delete<ILogoutResponse>(this.logoutUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => {
      return error.error.message || 'Server error';
    });
  }
}
