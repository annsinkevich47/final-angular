import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Station } from '../../shared/models/stations-response.model';

@Injectable({
  providedIn: 'root',
})
export class StationService {
  readonly baseUrl = '/api/station';
  constructor(private http: HttpClient) {}

  getStations(): Observable<Station[]> {
    return this.http.get<Station[]>(this.baseUrl);
  }
}
