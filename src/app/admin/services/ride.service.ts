import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Segment } from '../models/ride';
import { RideState } from '../redux/reducers/ride.reducer';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  private baseUrl = '/api/route';

  constructor(private http: HttpClient) {}

  public getRides(routeId: number): Observable<RideState> {
    return this.http.get<RideState>(`${this.baseUrl}/${routeId}`);
  }
  public updateRides(
    routeId: number,
    rideId: number,
    segments: Segment[],
  ): Observable<object> {
    return this.http.put(`${this.baseUrl}/${routeId}/ride/${rideId}`, {
      segments,
    });
  }
  public deleteRide(routeId: number, rideId: number): Observable<object> {
    return this.http.delete(`${this.baseUrl}/${routeId}/ride/${rideId}`);
  }
}
