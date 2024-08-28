import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteStationsService {
  private apiUrl = '/api/station';

  constructor(private http: HttpClient) {}

  deleteStation(stationId: number): Observable<number> {
    return this.http.delete<number>(`${this.apiUrl}/${stationId}`);
  }
}
