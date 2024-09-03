import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RideState } from '../redux/reducers/ride.reducer';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private baseUrl = '/api/route';

  constructor(private http: HttpClient) {}

  public getRides(routeId: number): Observable<RideState[]> {
    return this.http.get<RideState[]>(`${this.baseUrl}/${routeId}`);
  }
}
