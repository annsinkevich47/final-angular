import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IProfile } from '../../shared/models/profile-response.module';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly getInfoUrl = '/api/profile';

  constructor(private http: HttpClient) {}

  public getUserInfo(): Observable<IProfile> {
    return this.http.get<IProfile>(this.getInfoUrl);
  }
}
