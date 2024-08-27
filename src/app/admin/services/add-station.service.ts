import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StationServer } from '../models/stations';

@Injectable({
  providedIn: 'root',
})
export class AddStationService {
  private apiUrl = '/api/station';

  constructor(private http: HttpClient) {}

  addStation(station: StationServer): Observable<StationServer> {
    return this.http.post<StationServer>(this.apiUrl, station);
  }
}
