import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

import { IProfile } from '../../shared/models/profile-response.module';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly infoUrl = '/api/profile';

  constructor(private http: HttpClient) {}

  public getUserInfo(): Observable<IProfile> {
    return this.http
      .get<IProfile>(this.infoUrl)
      .pipe(catchError(this.handleError));
  }

  public updateUserInfo(name: string, email: string): Observable<IProfile> {
    const body = { name, email };

    return this.http.put<IProfile>(this.infoUrl, body);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => {
      return error.error.message || 'Server error';
    });
  }
}
