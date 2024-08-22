import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import StationType from '../models/stations';

@Injectable({
  providedIn: 'root',
})
export class GetStationsService {
  private apiUrl = '/api/station';

  constructor(private http: HttpClient) {}

  public getStations(): Observable<{ items: StationType[] }> {
    return this.http
      .get<StationType[]>(this.apiUrl)
      .pipe(map((stations: StationType[]) => ({ items: stations })));
  }
}
